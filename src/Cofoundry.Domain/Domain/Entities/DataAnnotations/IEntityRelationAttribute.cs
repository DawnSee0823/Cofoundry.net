﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Cofoundry.Domain
{
    public interface IEntityRelationAttribute
    {
        IEnumerable<EntityDependency> GetRelations(object model, PropertyInfo propertyInfo);
    }
}
