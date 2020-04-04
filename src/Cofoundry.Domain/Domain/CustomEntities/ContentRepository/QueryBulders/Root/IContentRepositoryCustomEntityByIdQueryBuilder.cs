﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Queries for retrieving custom entity data using its unique database id.
    /// </summary>
    public interface IContentRepositoryCustomEntityByIdQueryBuilder
    {
        /// <summary>
        /// Gets a custom entity by it's database id, returning a 
        /// general-purpose CustomEntityRenderSummary projection which
        /// includes version specific data and a deserialized data model. 
        /// The result is version-sensitive and defaults to returning published 
        /// versions only, but this behavior can be controlled by the 
        /// publishStatusQuery parameter.
        /// </summary>
        /// <param name="publishStatusQuery">Used to determine which version of the custom entity to include data for.</param>
        Task<CustomEntityRenderSummary> AsRenderSummaryAsync(PublishStatusQuery? publishStatusQuery = null);

        /// <summary>
        /// Gets a custom entity by it's database id, projected as a
        /// CustomEntityRenderDetails, which contains all data for rendering a specific 
        /// version of a custom entity out to a page, including template data for all the 
        /// content-editable page regions. This projection is specific to a particular 
        /// version which may not always be the latest (depending on the query), and to a 
        /// specific page. Although often you may only have one custom entity page, it is 
        /// possible to have multiple.
        /// </summary>
        /// <param name="pageId">
        /// PageId used to determine which page to include data for. Although often you
        /// may only have one custom entity page, it is possible to have multiple. If a
        /// page with the specified id cannot be found then no page region data will be 
        /// included in the returned object.
        /// </param>
        /// <param name="publishStatusQuery">Used to determine which version of the custom entity to include data for.</param>
        Task<CustomEntityRenderDetails> AsRenderDetailsAsync(int pageId, PublishStatusQuery? publishStatusQuery = null);
    }
}
