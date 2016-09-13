﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using Cofoundry.Domain;

namespace Cofoundry.Web
{
    public class SingleLineTextDataModel : IPageModuleDataModel
    {
        [Required]
        [Display(Name = "Text", Description = "Normally just text but HTML is accepted, for example for inline quotes, line breaks etc.")]
        [AllowHtml]
        //[Searchable]
        public string Text { get; set; }

    }
}