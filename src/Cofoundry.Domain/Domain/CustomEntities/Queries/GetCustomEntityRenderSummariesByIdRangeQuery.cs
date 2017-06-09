﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cofoundry.Domain.CQS;

namespace Cofoundry.Domain
{
    public class GetCustomEntityRenderSummariesByIdRangeQuery : IQuery<IDictionary<int, CustomEntityRenderSummary>>
    {
        public GetCustomEntityRenderSummariesByIdRangeQuery()
        {
        }

        public GetCustomEntityRenderSummariesByIdRangeQuery(
            IEnumerable<int> customEntityIds,
            WorkFlowStatusQuery workflowStatus = WorkFlowStatusQuery.Latest
            )
        {
            if (customEntityIds == null) throw new ArgumentNullException(nameof(customEntityIds));

            CustomEntityIds = customEntityIds.ToArray();
            WorkFlowStatus = workflowStatus;
        }

        [Required]
        public int[] CustomEntityIds { get; set; }

        public WorkFlowStatusQuery WorkFlowStatus { get; set; }
    }
}
