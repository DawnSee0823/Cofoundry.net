﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cofoundry.Web.ModularMvc;
using Cofoundry.Domain;
using Cofoundry.Core;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;

namespace Cofoundry.Web.Admin
{
    public class CustomEntitiesRouteRegistration : IRouteRegistration
    {
        private readonly ICustomEntityDefinition[] _customEntityModuleDefinition;

        public CustomEntitiesRouteRegistration(
            ICustomEntityDefinition[] customEntityModuleDefinition
            )
        {
            _customEntityModuleDefinition = customEntityModuleDefinition;
        }

        public void RegisterRoutes(IRouteBuilder routeBuilder)
        {
            foreach (var definition in _customEntityModuleDefinition)
            {
                var routePrefix = SlugFormatter.ToSlug(definition.NamePlural);
                var routeLibrary = new ModuleRouteLibrary(routePrefix);
                var jsRouteLibrary = new ModuleJsRouteLibrary(routeLibrary);


                routeBuilder.MapRoute(
                    "Custom Entity Admin Module - " + definition.NamePlural,
                    RouteConstants.AdminAreaPrefix + "/" + routePrefix,
                    new { controller = "CustomEntityModule", action = "Index", definition = definition, Area = RouteConstants.AdminAreaName }
                    );
            }
        }
    }
}
