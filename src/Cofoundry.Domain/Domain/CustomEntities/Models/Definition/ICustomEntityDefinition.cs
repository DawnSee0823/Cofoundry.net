﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Implement this interface to define a custom entity type. The definition
    /// will automatically get picked up and added to the system.
    /// </summary>
    public interface ICustomEntityDefinition
    {
        /// <summary>
        /// Unique 6 letter code representing the module (use uppercase)
        /// </summary>
        string CustomEntityDefinitionCode { get; }

        /// <summary>
        /// Plural name of the entity e.g. 'Products'
        /// </summary>
        string NamePlural { get; }

        /// <summary>
        /// Singlar name of the entity e.g. 'Product'
        /// </summary>
        string Name { get; }

        /// <summary>
        /// A short description that shows up as a tooltip for the admin 
        /// module. E.g  "Products and stock." or "News items for shareholders"
        /// </summary>
        string Description { get; }

        /// <summary>
        /// Indicates whether the UrlSlug property should be treated
        /// as a unique property and be validated as such. This will also affect
        /// the routing templates available for this entity because some routes require
        /// a unique slug.
        /// </summary>
        bool ForceUrlSlugUniqueness { get; }

        /// <summary>
        /// Indicates whether the entities are partitioned by locale
        /// </summary>
        bool HasLocale { get; }

        /// <summary>
        /// Indicates whether the url slug should be autogenerated. If this
        /// is selected then the user will not be shown the UrlSlug property. Useful
        /// if the entity will never be used in a page.
        /// </summary>
        bool AutoGenerateUrlSlug { get; }

        /// <summary>
        /// Indicates whether this custom entity should always be published when saved, provided the
        /// user has permissions to do so. 
        /// </summary>
        bool AutoPublish { get; }
    }

    /// <summary>
    /// Implement this interface to define a custom entity type. The definition
    /// will automatically get picked up and added to the system.
    /// </summary>
    public interface ICustomEntityDefinition<TDataModel> : ICustomEntityDefinition
    {

    }
}
