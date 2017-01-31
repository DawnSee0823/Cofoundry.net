﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cofoundry.Core.DependencyInjection;

namespace Cofoundry.Domain.Bootstrap
{
    public class SettingsDependencyRegistration : IDependencyRegistration
    {
        public void Register(IContainerRegister container)
        {
            container
                .RegisterType<ISettingCache, SettingCache>()
                .RegisterType<SettingQueryHelper>()
                .RegisterType<SettingCommandHelper>()
                .RegisterType<IInternalSettingsRepository, InternalSettingsRepository>()
                ;
        }
    }
}
