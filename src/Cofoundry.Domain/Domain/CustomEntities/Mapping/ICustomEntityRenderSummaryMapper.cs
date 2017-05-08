﻿using Cofoundry.Domain.CQS;
using Cofoundry.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Mapper designed to be used internally to map CustomEntityRenderSummary instances
    /// </summary>
    public interface ICustomEntityRenderSummaryMapper
    {
        Task<CustomEntityRenderSummary> MapSummaryAsync(CustomEntityVersion dbResult, IExecutionContext executionContext);

        Task<IEnumerable<CustomEntityRenderSummary>> MapSummariesAsync(ICollection<CustomEntityVersion> dbResults, IExecutionContext executionContext);
    }
}
