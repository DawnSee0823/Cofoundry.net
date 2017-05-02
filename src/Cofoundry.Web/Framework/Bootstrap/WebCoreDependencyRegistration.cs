﻿using System;
using System.Collections.Generic;
using System.Linq;
using Cofoundry.Core.DependencyInjection;
using Cofoundry.Web.WebApi;
using Cofoundry.Domain;
using Cofoundry.Core.Web;
using Cofoundry.Core;

namespace Cofoundry.Web
{
    public class WebCoreDependencyRegistration : IDependencyRegistration
    {
        public void Register(IContainerRegister container)
        {
            container
                .RegisterPerRequestScope<IControllerResponseHelper, ControllerResponseHelper>()

                .RegisterPerRequestScope<ISettingsViewHelper, SettingsViewHelper>()
                .RegisterPerRequestScope<ICurrentUserViewHelper, CurrentUserViewHelper>()
                .RegisterPerRequestScope<IPageTemplateViewFileLocator, PageTemplateViewFileLocator>()
                .RegisterPerRequestScope<IHtmlSanitizerHelper, HtmlSanitizerHelper>()
                .RegisterPerRequestScope<IJavascriptViewHelper, JavascriptViewHelper>()
                .RegisterPerRequestScope<ICofoundryHtmlHelper, CofoundryHtmlHelper>()
                .RegisterPerRequestScope<IUserSessionService, UserSessionService>()

                .RegisterPerRequestScope<IPageViewModelMapper, PageViewModelMapper>()
                .RegisterPerRequestScope<IPageViewModelFactory, PageViewModelFactory>()
                .RegisterPerRequestScope<IPageViewModelBuilder, PageViewModelBuilder>()
                
                .RegisterPerRequestScope<IApiResponseHelper, ApiResponseHelper>()

                .RegisterAll<IPageModuleViewLocationRegistration>()
                .RegisterInstance<IAntiCSRFService, AntiCSRFService>()

                .RegisterType<ICustomEntityTemplateSectionTagBuilderFactory, CustomEntityTemplateSectionTagBuilderFactory>()
                .RegisterType<IPageTemplateSectionTagBuilderFactory, PageTemplateSectionTagBuilderFactory>()
                .RegisterType<IPageModuleRenderer, PageModuleRenderer>()
                .RegisterType<IPathResolver, SitePathResolver>(RegistrationOptions.Override(RegistrationOverridePriority.Low))
                ; 
        }
    }
}
