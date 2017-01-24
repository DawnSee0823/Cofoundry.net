﻿using Cofoundry.Core.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Cache for rewrite rules, which are frequently requested to 
    /// work out routing
    /// </summary>
    public class RewriteRuleCache : IRewriteRuleCache
    {
        #region constructor

        private const string REWRITERULESUMMARY_CACHEKEY = "RewriteRuleSummaries";
        private const string CACHEKEY = "COF_RewriteRules";

        private readonly IObjectCache _cache;
        public RewriteRuleCache(IObjectCacheFactory cacheFactory)
        {
            _cache = cacheFactory.Get(CACHEKEY);
        }

        #endregion

        #region public methods

        /// <summary>
        /// Gets a collection of rewrite rules, if the collection is already cached it 
        /// is returned, otherwise the getter is invoked and the result is cached and returned
        /// </summary>
        /// <param name="getter">Function to invoke if the rewrite rules are not in the cache</param>
        public RewriteRuleSummary[] GetOrAdd(Func<RewriteRuleSummary[]> getter)
        {
            return _cache.GetOrAdd(REWRITERULESUMMARY_CACHEKEY, getter);
        }

        /// <summary>
        /// Gets a collection of rewrite rules, if the collection is already cached it 
        /// is returned, otherwise the getter is invoked and the result is cached and returned
        /// </summary>
        /// <param name="getter">Function to invoke if the rewrite rules are not in the cache</param>
        public async Task<RewriteRuleSummary[]> GetOrAddAsync(Func<Task<RewriteRuleSummary[]>> getter)
        {
            return await _cache.GetOrAddAsync(REWRITERULESUMMARY_CACHEKEY, getter);
        }

        /// <summary>
        /// Clears all items in the rewrite rules cache
        /// </summary>
        public void Clear()
        {
            _cache.Clear();
        }

        #endregion
    }
}
