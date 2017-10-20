﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cofoundry.Core;
using Cofoundry.Domain.CQS;
using Cofoundry.Domain.Data;
using Microsoft.EntityFrameworkCore;

namespace Cofoundry.Domain
{
    public class SearchCustomEntityRenderSummariesQueryHandler
        : IAsyncQueryHandler<SearchCustomEntityRenderSummariesQuery, PagedQueryResult<CustomEntityRenderSummary>>
        , IPermissionRestrictedQueryHandler<SearchCustomEntityRenderSummariesQuery, PagedQueryResult<CustomEntityRenderSummary>>
    {
        #region constructor

        private readonly CofoundryDbContext _dbContext;
        private readonly IQueryExecutor _queryExecutor;
        private readonly ICustomEntityDefinitionRepository _customEntityDefinitionRepository;
        private readonly ICustomEntityRenderSummaryMapper _customEntityRenderSummaryMapper;

        public SearchCustomEntityRenderSummariesQueryHandler(
            CofoundryDbContext dbContext,
            IQueryExecutor queryExecutor,
            ICustomEntityRenderSummaryMapper customEntityRenderSummaryMapper,
            ICustomEntityDefinitionRepository customEntityDefinitionRepository
            )
        {
            _dbContext = dbContext;
            _queryExecutor = queryExecutor;
            _customEntityRenderSummaryMapper = customEntityRenderSummaryMapper;
            _customEntityDefinitionRepository = customEntityDefinitionRepository;
        }

        #endregion

        #region execution

        public async Task<PagedQueryResult<CustomEntityRenderSummary>> ExecuteAsync(SearchCustomEntityRenderSummariesQuery query, IExecutionContext executionContext)
        {
            var dbPagedResult = await GetQueryAsync(query);
            var results = await _customEntityRenderSummaryMapper.MapAsync(dbPagedResult.Items, executionContext);

            return dbPagedResult.ChangeType(results);
        }

        private async Task<PagedQueryResult<CustomEntityVersion>> GetQueryAsync(SearchCustomEntityRenderSummariesQuery query)
        {
            var definition = await _queryExecutor.GetByIdAsync<CustomEntityDefinitionSummary>(query.CustomEntityDefinitionCode);
            EntityNotFoundException.ThrowIfNull(definition, query.CustomEntityDefinitionCode);

            var dbQuery = (await _dbContext
                .CustomEntityVersions
                .AsNoTracking()
                .Include(e => e.CustomEntity)
                .Where(e => e.CustomEntity.CustomEntityDefinitionCode == query.CustomEntityDefinitionCode)
                .FilterByWorkFlowStatusQuery(query.WorkFlowStatus)
                // TODO: EF Core: To make this work we must execute the full query before sorting & paging
                .ToListAsync())
                .AsQueryable();

            // Filter by locale 
            if (query.LocaleId > 0)
            {
                dbQuery = dbQuery.Where(p => p.CustomEntity.LocaleId == query.LocaleId);
            }
            else
            {
                dbQuery = dbQuery.Where(p => !p.CustomEntity.LocaleId.HasValue);
            }

            switch (query.SortBy)
            {
                case CustomEntityQuerySortType.Default:
                case CustomEntityQuerySortType.Natural:
                    if (definition.Ordering != CustomEntityOrdering.None)
                    {
                        dbQuery = dbQuery
                            .OrderByWithSortDirection(e => !e.CustomEntity.Ordering.HasValue, query.SortDirection)
                            .ThenByWithSortDirection(e => e.CustomEntity.Ordering, query.SortDirection)
                            .ThenByDescendingWithSortDirection(e => e.CustomEntity.CreateDate, query.SortDirection);
                    }
                    else
                    {
                        dbQuery = dbQuery
                            .OrderByDescendingWithSortDirection(e => e.CustomEntity.CreateDate, query.SortDirection);
                    }
                    break;
                case CustomEntityQuerySortType.Title:
                    dbQuery = dbQuery
                        .OrderByWithSortDirection(e => e.Title, query.SortDirection);
                    break;
                case CustomEntityQuerySortType.CreateDate:
                    dbQuery = dbQuery
                        .OrderByDescendingWithSortDirection(e => e.CustomEntity.CreateDate, query.SortDirection);
                    break;
            }

            // TODO: could be async when EF core supports it
            var dbPagedResult = dbQuery.ToPagedResult(query);
            return dbPagedResult;
        }

        #endregion

        #region Permission

        public IEnumerable<IPermissionApplication> GetPermissions(SearchCustomEntityRenderSummariesQuery query)
        {
            var definition = _customEntityDefinitionRepository.GetByCode(query.CustomEntityDefinitionCode);
            yield return new CustomEntityReadPermission(definition);
        }

        #endregion
    }
}
