﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cofoundry.Core.Web
{
    /// <summary>
    /// A set of configuration rules for html sanitization used
    /// by the IHtmlSanitizer.
    /// </summary>
    public interface IHtmlSanitizationRuleSet
    {
        /// <summary>
        /// Collection html tags to permit e.g. "a" and "div".
        /// </summary>
        IEnumerable<string> PermittedTags { get; }

        /// <summary>
        /// Collection of html tag permit to allow e.g. "title" and "alt".
        /// </summary>
        IEnumerable<string> PermittedAttributes { get; }

        /// <summary>
        /// Collection of http schemas to permit e.g. "http", "https" and "mailto".
        /// </summary>
        IEnumerable<string> PermittedSchemes { get; }

        /// <summary>
        /// Collection html tags that are permitted to have uri properties e.g. "src", "href".
        /// </summary>
        IEnumerable<string> PermittedUriAttributes { get; }

        /// <summary>
        /// Collection of style properties to permit e.g. "font" and "margin".
        /// </summary>
        IEnumerable<string> PermittedCssProperties { get; }
    }
}
