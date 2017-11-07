﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cofoundry.Domain.Data;
using Cofoundry.Domain.CQS;
using Microsoft.EntityFrameworkCore;
using Cofoundry.Core;

namespace Cofoundry.Domain
{
    public class GetUpdatePageCommandByIdQueryHandler 
        : IAsyncQueryHandler<GetByIdQuery<UpdatePageCommand>, UpdatePageCommand>
        , IPermissionRestrictedQueryHandler<GetByIdQuery<UpdatePageCommand>, UpdatePageCommand>
    {
        #region constructor

        private readonly CofoundryDbContext _dbContext;

        public GetUpdatePageCommandByIdQueryHandler(
            CofoundryDbContext dbContext
            )
        {
            _dbContext = dbContext;
        }

        #endregion

        #region execution

        public async Task<UpdatePageCommand> ExecuteAsync(GetByIdQuery<UpdatePageCommand> query, IExecutionContext executionContext)
        {
            var dbResult = await _dbContext
                .Pages
                .AsNoTracking()
                .Include(p => p.PageTags)
                .ThenInclude(t => t.Tag)
                .FilterActive()
                .FilterByPageId(query.Id)
                .SingleOrDefaultAsync();

            EntityNotFoundException.ThrowIfNull(dbResult, query.Id);

            var command = new UpdatePageCommand()
            {
                PageId = dbResult.PageId,
                Tags = dbResult
                    .PageTags
                    .Select(t => t.Tag.TagText)
                    .OrderBy(t => t)
                    .ToArray()
            };

            return command;
        }

        #endregion

        #region Permission

        public IEnumerable<IPermissionApplication> GetPermissions(GetByIdQuery<UpdatePageCommand> query)
        {
            yield return new PageReadPermission();
        }

        #endregion
    }
}
