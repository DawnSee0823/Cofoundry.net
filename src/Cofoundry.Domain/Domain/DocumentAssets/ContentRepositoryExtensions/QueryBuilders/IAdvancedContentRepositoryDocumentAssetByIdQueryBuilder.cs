﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Queries for retieving document asset data by a unique database id.
    /// </summary>
    public interface IAdvancedContentRepositoryDocumentAssetByIdQueryBuilder 
        : IContentRepositoryDocumentAssetByIdQueryBuilder
    {
        /// <summary>
        /// The DocumentAssetFile projection represents the file associated 
        /// with a document asset, including stream access to the file itself.
        /// </summary>
        Task<DocumentAssetFile> AsFileAsync();

        /// <summary>
        /// The DocumentAssetDetails projection contains contains full 
        /// document information. This is specifically used in the 
        /// admin panel and so contains audit data and tagging information.
        /// </summary>
        Task<DocumentAssetDetails> AsDetailsAsync();
    }
}
