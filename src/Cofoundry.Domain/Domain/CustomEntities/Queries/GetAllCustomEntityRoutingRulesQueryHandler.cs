﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cofoundry.Domain.CQS;

namespace Cofoundry.Domain
{
    public class GetAllCustomEntityRoutingRulesQueryHandler 
        : IAsyncQueryHandler<GetAllQuery<ICustomEntityRoutingRule>, IEnumerable<ICustomEntityRoutingRule>>
        , IIgnorePermissionCheckHandler
    {
        private readonly IEnumerable<ICustomEntityRoutingRule> _customEntityRoutingRules;

        public GetAllCustomEntityRoutingRulesQueryHandler(
            IEnumerable<ICustomEntityRoutingRule> customEntityRoutingRules
            )
        {
            _customEntityRoutingRules = customEntityRoutingRules;
        }

        public Task<IEnumerable<ICustomEntityRoutingRule>> ExecuteAsync(GetAllQuery<ICustomEntityRoutingRule> query, IExecutionContext executionContext)
        {
            var duplicateRule = _customEntityRoutingRules
                .GroupBy(r => r.RouteFormat)
                .FirstOrDefault(g => g.Count() > 1);

            if (duplicateRule != null)
            {
                throw new Exception("Multiple handlers cannot exist using the same RouteFormat. Duplicate: " + duplicateRule.Key);
            }

            return Task.FromResult(_customEntityRoutingRules);
        }
    }
}
