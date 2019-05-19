﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Queries for retieving page data nested immediately inside a specific directory.
    /// </summary>
    public interface IContentRepositoryPageByDirectoryIdQueryBuilder
    {
        /// <summary>
        /// Returns page routing data for pages that are nested immediately inside the specified 
        /// directory. The PageRoute projection is a small page object focused on providing 
        /// routing data only. Data returned from this query is cached by 
        /// default as it's core to routing and often incorporated in more detailed
        /// page projections.
        /// </summary>
        Task<ICollection<PageRoute>> AsPageRoutesAsync();
    }
}
