﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cofoundry.Domain;
using Cofoundry.Domain.CQS;
using Cofoundry.Web.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Authorization;

namespace Cofoundry.Web.Admin
{
    [Area(RouteConstants.AdminAreaName)]
    [AdminAuthorize]
    public class AuthController : Controller
    {
        private static readonly string CONTROLLER_NAME = "Auth";

        #region Constructors

        private readonly IQueryExecutor _queryExecutor;
        private readonly IUserContextService _userContextService;
        private readonly AuthenticationControllerHelper _authenticationControllerHelper;
        private readonly AccountManagementControllerHelper _accountManagementControllerHelper;
        private readonly IAdminRouteLibrary _adminRouteLibrary;
        private readonly IUserAreaDefinition _adminUserArea;

        public AuthController(
            IQueryExecutor queryExecutor,
            IUserContextService userContextService,
            AuthenticationControllerHelper authenticationControllerHelper,
            AccountManagementControllerHelper accountManagementControllerHelper,
            IAdminRouteLibrary adminRouteLibrary,
            IEnumerable<IUserAreaDefinition> userAreaDefinitions
            )
        {
            _queryExecutor = queryExecutor;
            _authenticationControllerHelper = authenticationControllerHelper;
            _userContextService = userContextService;
            _accountManagementControllerHelper = accountManagementControllerHelper;
            _adminRouteLibrary = adminRouteLibrary;
            _adminUserArea = userAreaDefinitions.Single(d => d is CofoundryAdminUserArea);
        }

        #endregion

        #region OnActionExecuting

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var settings = await _queryExecutor.ExecuteAsync(new GetSettingsQuery<InternalSettings>());
            if (!settings.IsSetup)
            {
                context.Result = Redirect(_adminRouteLibrary.Setup.Setup());
            }
            else
            {
                await base.OnActionExecutionAsync(context, next);
            }
        }

        #endregion

        #region routes

        [AllowAnonymous]
        public ActionResult DefaultRedirect()
        {
            return RedirectPermanent(_adminRouteLibrary.Auth.Login());
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToActionPermanent(nameof(Login));
        }

        [AllowAnonymous]
        public async Task<ActionResult> Login()
        {
            var user = await _userContextService.GetCurrentContextAsync();
            if (user.IsCofoundryUser()) return await GetLoggedInDefaultRedirectActionAsync();

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(Login));
            var vm = new LoginViewModel ();

            return View(viewPath, vm);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login(string returnUrl, LoginViewModel command)
        {
            var loginResult = await _authenticationControllerHelper.LogUserInAsync(this, command, _adminUserArea);
            var redirectUrl = _authenticationControllerHelper.GetAndValidateReturnUrl(this);

            if (loginResult == LoginResult.PasswordChangeRequired)
            {
                return Redirect(_adminRouteLibrary.Auth.ChangePassword(returnUrl));
            }
            else if (loginResult == LoginResult.Success && redirectUrl != null)
            {
                return Redirect(redirectUrl);
            }
            else if (loginResult == LoginResult.Success)
            {
                return await GetLoggedInDefaultRedirectActionAsync();
            }

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(Login));
            return View(viewPath, command);
        }

        public async Task<ActionResult> Logout()
        {
            await _authenticationControllerHelper.LogoutAsync(_adminUserArea);
            return Redirect(_adminRouteLibrary.Auth.Login(Request.Query["ReturnUrl"].FirstOrDefault()));
        }

        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var user = await _userContextService.GetCurrentContextAsync();
            if (user.IsCofoundryUser()) return await GetLoggedInDefaultRedirectActionAsync();

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ForgotPassword));
            return View(viewPath, new ForgotPasswordViewModel { Username = email });
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ViewResult> ForgotPassword(ForgotPasswordViewModel command)
        {
            await _authenticationControllerHelper.SendPasswordResetNotificationAsync(this, command, _adminUserArea);

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ForgotPassword));
            return View(viewPath, command);
        }

        [AllowAnonymous]
        public async Task<ActionResult> ResetPassword(string i, string t)
        {
            var user = await _userContextService.GetCurrentContextAsync();
            if (user.IsCofoundryUser()) return await GetLoggedInDefaultRedirectActionAsync();

            var request = await _authenticationControllerHelper.IsPasswordRequestValidAsync(this, i, t, _adminUserArea);

            if (!request.IsValid)
            {
                var invalidViewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ResetPassword) + "RequestInvalid");
                return View(invalidViewPath, request);
            }

            var vm = new CompletePasswordResetViewModel();
            vm.UserPasswordResetRequestId = i;
            vm.Token = t;

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ResetPassword));
            return View(viewPath, vm);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> ResetPassword(CompletePasswordResetViewModel vm)
        {
            var user = await _userContextService.GetCurrentContextAsync();
            if (user.IsCofoundryUser()) return await GetLoggedInDefaultRedirectActionAsync();

            await _authenticationControllerHelper.CompletePasswordResetAsync(this, vm, _adminUserArea);

            if (ModelState.IsValid)
            {
                var completeViewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ResetPassword) + "Complete");
                return View(completeViewPath);
            }

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ResetPassword));
            return View(viewPath, vm);
        }
                
        [AllowAnonymous]
        public async Task<ActionResult> ChangePassword(string returnUrl)
        {
            var user = await _userContextService.GetCurrentContextAsync();
            if (user.UserId.HasValue)
            {
                if (!user.IsPasswordChangeRequired)
                {
                    return await GetLoggedInDefaultRedirectActionAsync();
                }

                // The user shouldn't be logged in, but if so, log them out
                await _authenticationControllerHelper.LogoutAsync(_adminUserArea);
            }

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ChangePassword));
            return View(viewPath, new ChangePasswordViewModel());
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> ChangePassword(string returnUrl, ChangePasswordViewModel vm)
        {
            var user = await _userContextService.GetCurrentContextAsync();
            if (user.UserId.HasValue)
            {
                if (!user.IsPasswordChangeRequired)
                {
                    return await GetLoggedInDefaultRedirectActionAsync();
                }

                // The user shouldn't be logged in, but if so, log them out
                await _authenticationControllerHelper.LogoutAsync(_adminUserArea);
            }

            await _accountManagementControllerHelper.ChangePasswordAsync(this, vm, _adminUserArea);

            ViewBag.ReturnUrl = returnUrl;

            var viewPath = ViewPathFormatter.View(CONTROLLER_NAME, nameof(ChangePassword));
            return View(viewPath, vm);
        }

        #endregion

        #region helpers

        private async Task<ActionResult> GetLoggedInDefaultRedirectActionAsync()
        {
            var modules = await _queryExecutor.ExecuteAsync(new GetPermittedAdminModulesQuery());
            var dashboardModule = modules.FirstOrDefault(m => m.AdminModuleCode == DashboardModuleRegistration.ModuleCode);

            if (dashboardModule == null)
            {
                dashboardModule = modules
                    .SetStandardOrdering()
                    .FirstOrDefault();
            }

            if (dashboardModule == null)
            {
                throw new InvalidOperationException("No modules available.");
            }

            return Redirect(dashboardModule.Url);
        }

        #endregion
    }
}