﻿using Conditions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Use this to decorate an (nullable) integer and indicate that it should be the 
    /// database id for a Page. If the integer is nullable then this signals
    /// that the property is optional.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class PageAttribute : RegularExpressionAttribute, IMetadataAttribute, IEntityRelationAttribute
    {
        public PageAttribute()
            : base(@"^[1-9]\d*$")
        {
            ErrorMessage = "The {0} field is required";
        }

        public void Process(ModelMetadata modelMetaData)
        {
            modelMetaData.TemplateHint = "PageSelector";
        }

        public IEnumerable<EntityDependency> GetRelations(object model, PropertyInfo propertyInfo)
        {
            Condition.Requires(model).IsNotNull();
            Condition.Requires(propertyInfo).IsNotNull();

            var isRequired = !(model is int?);
            var id = (int?)propertyInfo.GetValue(model);

            if (id.HasValue)
            {
                yield return new EntityDependency(PageEntityDefinition.DefinitionCode, id.Value, isRequired);
            }
        }
    }
}
