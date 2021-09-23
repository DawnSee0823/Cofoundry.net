﻿using Cofoundry.Core;
using Cofoundry.Core.Validation;
using Cofoundry.Domain.Data;
using Cofoundry.Domain.Tests.Shared.Assertions;
using FluentAssertions;
using FluentAssertions.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Cofoundry.Domain.Tests.Integration.Pages.Commands
{
    [Collection(nameof(DbDependentFixture))]
    public class AddPageDraftVersionCommandHandlerTests
    {
        const string DATA_PREFIX = "AddPageCHT ";
        private readonly TestDataHelper _testDataHelper;

        private readonly DbDependentFixture _dbDependentFixture;

        public AddPageDraftVersionCommandHandlerTests(
            DbDependentFixture dbDependantFixture
            )
        {
            _dbDependentFixture = dbDependantFixture;
            _testDataHelper = new TestDataHelper(dbDependantFixture);
        }

        [Fact]
        public async Task WhenPageIsPublished_CopiesBasicData()
        {
            var uniqueData = DATA_PREFIX + nameof(WhenPageIsPublished_CopiesBasicData);
            var directoryId = await _testDataHelper.PageDirectories().AddAsync(uniqueData);
            var pageId = await _testDataHelper.Pages().AddAsync(uniqueData, directoryId, c =>
            {
                c.MetaDescription = "Test Meta";
                c.OpenGraphDescription = "OG Desc";
                c.OpenGraphImageId = _dbDependentFixture.SeededEntities.TestImageId;
                c.OpenGraphTitle = "OG Title";
                c.Publish = true;
            });

            using var scope = _dbDependentFixture.CreateServiceScope();
            var contentRepository = scope.GetContentRepositoryWithElevatedPermissions();

            var draftVersionId = await contentRepository
                .Pages()
                .Versions()
                .AddDraftAsync(new AddPageDraftVersionCommand()
                {
                    PageId = pageId
                });

            var dbContext = scope.GetRequiredService<CofoundryDbContext>();
            var versions = await dbContext
                .PageVersions
                .AsNoTracking()
                .Include(v => v.PageVersionBlocks)
                .FilterByPageId(pageId)
                .ToListAsync();

            var publishedVersion = versions.FirstOrDefault(v => v.WorkFlowStatusId == (int)WorkFlowStatus.Published);
            var draftVersion = versions.SingleOrDefault(v => v.PageVersionId == draftVersionId);

            using (new AssertionScope())
            {
                versions.Should().HaveCount(2);
                publishedVersion.Should().NotBeNull();
                draftVersion.Should().NotBeNull();
                draftVersion.CreateDate.Should().BeAfter(publishedVersion.CreateDate);
                draftVersion.DisplayVersion.Should().Be(2);
                draftVersion.ExcludeFromSitemap.Should().BeTrue();
                draftVersion.MetaDescription.Should().Be(publishedVersion.MetaDescription);
                draftVersion.OpenGraphDescription.Should().Be(publishedVersion.OpenGraphDescription);
                draftVersion.OpenGraphImageId.Should().Be(publishedVersion.OpenGraphImageId);
                draftVersion.OpenGraphTitle.Should().Be(publishedVersion.OpenGraphTitle);
                draftVersion.PageTemplateId.Should().Be(publishedVersion.PageTemplateId);
                draftVersion.PageVersionBlocks.Should().BeEmpty();
                draftVersion.Title.Should().Be(publishedVersion.Title);
                draftVersion.WorkFlowStatusId.Should().Be((int)WorkFlowStatus.Draft);
            }
        }

        [Fact]
        public async Task WhenPageIsPublished_CopiesRegions()
        {
            var uniqueData = DATA_PREFIX + nameof(WhenPageIsPublished_CopiesRegions);
            var directoryId = await _testDataHelper.PageDirectories().AddAsync(uniqueData);
            var pageId = await _testDataHelper.Pages().AddAsync(uniqueData, directoryId);

            using var scope = _dbDependentFixture.CreateServiceScope();
            var contentRepository = scope.GetContentRepositoryWithElevatedPermissions();
            var dbContext = scope.GetRequiredService<CofoundryDbContext>();

            var copyFromVersionId = await dbContext
                .PageVersions
                .FilterActive()
                .FilterByPageId(pageId)
                .Select(v => v.PageVersionId)
                .SingleAsync();

            // Add some blocks to the draft
            var textBlockId = await _testDataHelper.Pages().AddPlainTextBlockToTestTemplateAsync(copyFromVersionId);
            var imageBlockId = await _testDataHelper.Pages().AddImageTextBlockToTestTemplateAsync(copyFromVersionId);

            // Publish the page so we can create a new draft from it
            await contentRepository
                .Pages()
                .PublishAsync(new PublishPageCommand()
                {
                    PageId = pageId
                });

            // Create the new draft
            var draftVersionId = await contentRepository
                .Pages()
                .Versions()
                .AddDraftAsync(new AddPageDraftVersionCommand()
                {
                    PageId = pageId
                });
            
            // Get result data to assert
            var versions = await dbContext
                .PageVersions
                .AsNoTracking()
                .Include(v => v.PageVersionBlocks)
                .FilterByPageId(pageId)
                .ToListAsync();

            var publishedVersion = versions.FirstOrDefault(v => v.WorkFlowStatusId == (int)WorkFlowStatus.Published);
            var publishedVersionTextBlock = publishedVersion
                .PageVersionBlocks
                .SingleOrDefault(v => v.PageVersionBlockId == textBlockId);
            var publishedVersionImageBlock = publishedVersion
                .PageVersionBlocks
                .SingleOrDefault(v => v.PageVersionBlockId == imageBlockId);

            var draftVersion = versions.SingleOrDefault(v => v.PageVersionId == draftVersionId);
            var draftVersionTextBlock = publishedVersion
                .PageVersionBlocks
                .FirstOrDefault(v => v.PageBlockTypeId == publishedVersionTextBlock?.PageBlockTypeId);
            var draftVersionImageBlock = publishedVersion
                .PageVersionBlocks
                .FirstOrDefault(v => v.PageBlockTypeId == publishedVersionImageBlock?.PageBlockTypeId);

            var unstructuredDependencies = await dbContext
                .UnstructuredDataDependencies
                .AsNoTracking()
                .Where(v => v.RootEntityDefinitionCode == PageVersionBlockEntityDefinition.DefinitionCode && v.RootEntityId == draftVersionImageBlock.PageVersionBlockId)
                .ToListAsync();

            var copiedImageDependency = unstructuredDependencies.SingleOrDefault();

            // Assert

            using (new AssertionScope())
            {
                versions.Should().HaveCount(2);
                publishedVersion.Should().NotBeNull();
                draftVersion.Should().NotBeNull();
                publishedVersion.PageVersionBlocks.Should().HaveCount(2);
                draftVersion.PageVersionBlocks.Should().HaveCount(publishedVersion.PageVersionBlocks.Count);

                AssertBlockMatches(publishedVersionTextBlock, draftVersionTextBlock);
                AssertBlockMatches(publishedVersionImageBlock, draftVersionImageBlock);
                unstructuredDependencies.Should().HaveCount(1);
                copiedImageDependency.Should().NotBeNull();
                copiedImageDependency.RelatedEntityId.Should().Be(_dbDependentFixture.SeededEntities.TestImageId);
                copiedImageDependency.RelatedEntityDefinitionCode.Should().Be(ImageAssetEntityDefinition.DefinitionCode);
            }

            static void AssertBlockMatches(PageVersionBlock publishedBlock, PageVersionBlock draftBlock)
            {
                draftBlock.Should().NotBeNull();
                draftBlock.CreateDate.Should().Be(publishedBlock.CreateDate);
                draftBlock.Ordering.Should().Be(publishedBlock.Ordering);
                draftBlock.PageBlockTypeId.Should().Be(publishedBlock.PageBlockTypeId);
                draftBlock.PageBlockTypeTemplateId.Should().Be(publishedBlock.PageBlockTypeTemplateId);
                draftBlock.PageTemplateRegionId.Should().Be(publishedBlock.PageTemplateRegionId);
                draftBlock.SerializedData.Should().Be(publishedBlock.SerializedData);
                draftBlock.UpdateDate.Should().Be(draftBlock.CreateDate);
            }
        }

        [Fact]
        public async Task WhenPageHasDraft_Throws()
        {
            var uniqueData = DATA_PREFIX + nameof(WhenPageHasDraft_Throws);
            var directoryId = await _testDataHelper.PageDirectories().AddAsync(uniqueData);
            var pageId = await _testDataHelper.Pages().AddAsync(uniqueData, directoryId);

            using var scope = _dbDependentFixture.CreateServiceScope();
            var contentRepository = scope.GetContentRepositoryWithElevatedPermissions();

            var command = new AddPageDraftVersionCommand()
            {
                PageId = pageId
            };

            await contentRepository
                .Awaiting(r => r.Pages().Versions().AddDraftAsync(command))
                .Should()
                .ThrowAsync<ValidationException>()
                .WithMemberNames(nameof(command.PageId));
        }

        [Fact]
        public async Task WhenDraftAdded_SendsMessage()
        {
            var uniqueData = DATA_PREFIX + nameof(WhenDraftAdded_SendsMessage);
            var directoryId = await _testDataHelper.PageDirectories().AddAsync(uniqueData);
            var pageId = await _testDataHelper.Pages().AddAsync(uniqueData, directoryId, c => c.Publish = true);

            using var scope = _dbDependentFixture.CreateServiceScope();
            var contentRepository = scope.GetContentRepositoryWithElevatedPermissions();

            var draftVersionId = await contentRepository
                .Pages()
                .Versions()
                .AddDraftAsync(new AddPageDraftVersionCommand()
                {
                    PageId = pageId
                });

            scope
                .CountMessagesPublished<PageDraftVersionAddedMessage>(m => m.PageId == pageId && m.PageVersionId == draftVersionId)
                .Should().Be(1);
        }
    }
}
