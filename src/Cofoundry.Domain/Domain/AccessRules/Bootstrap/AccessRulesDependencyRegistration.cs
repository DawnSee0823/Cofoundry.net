﻿using Cofoundry.Core.DependencyInjection;
using Cofoundry.Domain.Internal;

namespace Cofoundry.Domain.Registration
{
    public class AccessRulesDependencyRegistration : IDependencyRegistration
    {
        public void Register(IContainerRegister container)
        {
            container
                .Register<IUpdateAccessRulesCommandHelper, UpdateAccessRulesCommandHelper>()
                .Register<IEntityAccessInfoMapper, EntityAccessInfoMapper>()
                .Register<IEntityAccessRuleSetMapper, EntityAccessRuleSetMapper>()
                ;
        }
    }
}
