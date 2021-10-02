﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace Cofoundry.Web.Tests.Integration
{
    /// <summary>
    /// Implementation of <see cref="WebApplicationFactory"/> designed to run in
    /// the Cofoundry.Web.Tests.Integration project.
    /// </summary>
    public class TestWebApplicationFactory : TestWebApplicationFactory<Startup>
    {
    }

    /// <summary>
    /// Factory for bootstrapping an application in memory for functional end to end
    /// tests.
    /// </summary>
    /// <typeparam name="TEntryPoint">
    /// A type in the entry point assembly of the application. Typically the Startup
    /// or Program classes can be used.
    /// </typeparam>
    public class TestWebApplicationFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint>
        where TEntryPoint : class
    {
        protected override IHostBuilder CreateHostBuilder()
        {
            var builder = Host.CreateDefaultBuilder();

            return builder;
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            // https://github.com/dotnet/aspnetcore/issues/17707#issuecomment-609061917
            builder.UseContentRoot(Directory.GetCurrentDirectory());
            builder.UseStartup<TEntryPoint>();

            base.ConfigureWebHost(builder);
        }
    }
}
