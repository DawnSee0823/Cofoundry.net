﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cofoundry.Domain.CQS;

namespace Cofoundry.Domain
{
    public class GetCustomEntityVersionPageModuleRenderDetailsByIdQuery : IQuery<CustomEntityVersionPageModuleRenderDetails>
    {
        public int CustomEntityVersionPageModuleId { get; set; }

        public WorkFlowStatusQuery WorkFlowStatus { get; set; }
    }
}
