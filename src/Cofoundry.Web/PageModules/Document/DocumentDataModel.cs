﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Cofoundry.Domain;

namespace Cofoundry.Web
{
    public class DocumentDataModel : IPageModuleDataModel
    {
        [Display(Name = "Document")]
        [Required]
        [Document]
        public int DocumentAssetId { get; set; }
    }
}