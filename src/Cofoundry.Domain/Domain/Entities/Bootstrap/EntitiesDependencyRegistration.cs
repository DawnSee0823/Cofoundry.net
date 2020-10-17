﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cofoundry.Core.DependencyInjection;
using Cofoundry.Domain.Internal;

namespace Cofoundry.Domain.Registration
{
    public class EntitiesDependencyRegistration : IDependencyRegistration
    {
        public void Register(IContainerRegister container)
        {
            container
                .RegisterAll<IEntityDefinition>(RegistrationOptions.SingletonScope())
                .RegisterSingleton<IEntityDefinitionRepository, EntityDefinitionRepository>();
        }
    }
}
