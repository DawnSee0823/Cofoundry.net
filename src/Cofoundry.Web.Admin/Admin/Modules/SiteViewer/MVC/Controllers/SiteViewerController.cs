﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Cofoundry.Domain;
using Cofoundry.Domain.CQS;
using Cofoundry.Web.Identity;
using Cofoundry.Domain.MailTemplates;

namespace Cofoundry.Web.Admin
{
    [RouteArea(RouteConstants.AdminAreaName, AreaPrefix = RouteConstants.AdminAreaPrefix)]
    [RoutePrefix(SiteViewerRouteLibrary.RoutePrefix)]
    [Route("{action=frame}")]
    public class SiteViewerController : Controller
    {
        #region Constructors

        private readonly IQueryExecutor _queryExecutor;
        private readonly IUserContextService _userContextService;
        private readonly AuthenticationControllerHelper _authenticationHelper;
        private readonly AccountManagementControllerHelper _accountManagementControllerHelper;

        public SiteViewerController(
            IQueryExecutor queryExecutor,
            IUserContextService userContextService,
            AuthenticationControllerHelper authenticationHelper,
            AccountManagementControllerHelper accountManagementControllerHelper
            )
        {
            _queryExecutor = queryExecutor;
            _authenticationHelper = authenticationHelper;
            _userContextService = userContextService;
            _accountManagementControllerHelper = accountManagementControllerHelper;
        }

        #endregion

        #region routes

        public ActionResult Frame()
        {
            return View();
        }

        #endregion

        #region helpers


        #endregion
    }
}