﻿using Cofoundry.Core.DependencyInjection;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cofoundry.Web
{
    public static class AddCofoundryStartupExtension
    {
        /// <summary>
        /// Configures the dependency resolver for Cofoundry and
        /// registers all the services, repositories and modules setup for auto-registration.
        /// </summary>
        public static IMvcBuilder AddCofoundry(
            this IMvcBuilder mvcBuilder,
            IConfigurationRoot configurationRoot
            )
        {
            DiscoverAdditionalApplicationParts(mvcBuilder);

            var typesProvider = new DiscoveredTypesProvider(mvcBuilder.PartManager);
            var builder = new DefaultContainerBuilder(mvcBuilder.Services, typesProvider, configurationRoot);
            builder.Build();

            RunAdditionalConfiguration(mvcBuilder);

            return mvcBuilder;
        }

        private static void AddAdditionalTypes(IMvcBuilder mvcBuilder)
        {
            // Ensure IHttpContextAccessor is added, because it isn't by default
            // see https://github.com/aspnet/Hosting/issues/793
            mvcBuilder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        private static void DiscoverAdditionalApplicationParts(IMvcBuilder mvcBuilder)
        {
            // We could configure AssemblyDiscoveryProvider through settings?

            var assemblyPartDiscoveryProvider = new AssemblyDiscoveryProvider();
            var rules = new IAssemblyDiscoveryRule[] { new CofoundryAssemblyDiscoveryRule() };

            var additionalAssemblies = assemblyPartDiscoveryProvider.DiscoverAssemblies(mvcBuilder, rules);

            foreach (var additionalAssembly in additionalAssemblies)
            {
                mvcBuilder.AddApplicationPart(additionalAssembly);
            }
        }

        /// <summary>
        /// MVC does not do a very good job of modular configurations, so here
        /// we have to prematurely build the container and use a child scope to 
        /// run additional configurations based on what has already been setup in the
        /// DI container. This allows for additional configuration to be made in
        /// plugins.
        /// </summary>
        private static void RunAdditionalConfiguration(IMvcBuilder mvcBuilder)
        {
            var serviceProvider = mvcBuilder.Services.BuildServiceProvider();
            using (var serviceScope = serviceProvider.CreateScope())
            {
                var mvcBuilderConfigurations = serviceScope.ServiceProvider.GetRequiredService<IEnumerable<IStartupServiceConfigurationTask>>();
                foreach (var mvcBuilderConfiguration in mvcBuilderConfigurations)
                {
                    mvcBuilderConfiguration.ConfigureServices(mvcBuilder);
                }
            }
        }
    }
}