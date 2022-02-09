﻿using Cofoundry.Core;
using Cofoundry.Domain;
using Cofoundry.Domain.CQS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Cofoundry.Web.Identity
{
    /// <inheritdoc/>
    public class AuthenticationControllerHelper<TUserArea> : IAuthenticationControllerHelper<TUserArea>
        where TUserArea : IUserAreaDefinition
    {
        private readonly IAdvancedContentRepository _contentRepository;
        private readonly IControllerResponseHelper _controllerResponseHelper;
        private readonly IAuthorizedTaskTokenUrlHelper _userAccountRecoveryUrlHelper;
        private readonly TUserArea _userAreaDefinition;

        public AuthenticationControllerHelper(
            IAdvancedContentRepository contentRepository,
            IControllerResponseHelper controllerResponseHelper,
            IAuthorizedTaskTokenUrlHelper userAccountRecoveryUrlHelper,
            TUserArea userAreaDefinition
            )
        {
            _contentRepository = contentRepository;
            _controllerResponseHelper = controllerResponseHelper;
            _userAccountRecoveryUrlHelper = userAccountRecoveryUrlHelper;
            _userAreaDefinition = userAreaDefinition;
        }

        public async Task<UserCredentialsAuthenticationResult> AuthenticateAsync(Controller controller, ISignInViewModel viewModel)
        {
            if (controller == null) throw new ArgumentNullException(nameof(controller));
            if (viewModel == null) throw new ArgumentNullException(nameof(viewModel));

            if (!controller.ModelState.IsValid)
            {
                return UserCredentialsAuthenticationResult.CreateFailedResult();
            }

            var result = await _contentRepository
                .Users()
                .Authentication()
                .AuthenticateCredentialsAsync(new AuthenticateUserCredentialsQuery()
                {
                    UserAreaCode = _userAreaDefinition.UserAreaCode,
                    Username = viewModel.Username,
                    Password = viewModel.Password
                })
                .ExecuteAsync();

            if (!result.IsSuccess)
            {
                controller.ModelState.AddModelError(string.Empty, result.Error.Message);
            }

            return result;
        }

        public async Task SignInUserAsync(
            Controller controller,
            UserSignInInfo user,
            bool rememberUser
            )
        {
            if (controller == null) throw new ArgumentNullException(nameof(controller));
            if (user == null) throw new ArgumentNullException(nameof(user));

            //if (user.RequirePasswordChange)
            //{
            //    throw new PasswordChangeRequiredException();
            //}

            // TODO: should catch errors and add to model state
            await _contentRepository
                .Users()
                .Authentication()
                .SignInAuthenticatedUserAsync(new SignInAuthenticatedUserCommand()
                {
                    UserId = user.UserId,
                    RememberUser = rememberUser
                });
        }

        public async Task<UserCredentialsAuthenticationResult> AuthenticateAndLogUserInAsync(Controller controller, ISignInViewModel viewModel, bool rememberMe)
        {
            // More of a demo on how you'd run a login action - I think we'll be able to do without the controller 
            // helper because it's not too difficult, especially if we can outpt errors easily into model state

            if (!controller.ModelState.IsValid)
            {
                return UserCredentialsAuthenticationResult.CreateFailedResult();
            }

            var result = await _contentRepository
                .Users()
                .Authentication()
                .AuthenticateCredentialsAsync(new AuthenticateUserCredentialsQuery()
                {
                    UserAreaCode = _userAreaDefinition.UserAreaCode,
                    Username = viewModel.Username,
                    Password = viewModel.Password
                })
                .ExecuteAsync();

            //if (result.User.RequirePasswordChange)
            //{
            //    // Take action! I guess if you don't and then proceed with login it will throw an exception
            //}

            if (!result.IsSuccess)
            {
                controller.ModelState.AddModelError(string.Empty, result.Error.Message);
            }
            else
            {
                // TODO: capture errors into model state
                await _contentRepository
                    .Users()
                    .Authentication()
                    .SignInAuthenticatedUserAsync(new SignInAuthenticatedUserCommand()
                    {
                        UserId = result.User.UserId,
                        RememberUser = rememberMe
                    });
            }

            return result;
        }

        /// <summary>
        /// Attempts to authenticate and log a user in using the data in the 
        /// specified view model, returning the result. ModelState is first 
        /// checked to be valid before checking the auth data against the database.
        /// </summary>
        /// <param name="controller">
        /// This method is intended to be called from an MVC controller and this
        /// should be the controller instance.
        /// </param>
        /// <param name="viewModel">The view-model data posted to the action.</param>
        /// <returns>The result of the authentication check.</returns>
        //public async Task<UserLoginInfoAuthenticationResult> AuthenticateAndLogUserInAsync(Controller controller, ILoginViewModel viewModel)
        //{
        //    if (controller == null) throw new ArgumentNullException(nameof(controller));
        //    if (viewModel == null) throw new ArgumentNullException(nameof(viewModel));

        //    if (!controller.ModelState.IsValid) return LoginResult.Failed;

        //    var command = new LogUserInWithCredentialsCommand()
        //    {
        //        UserAreaCode = _userAreaDefinition.UserAreaCode,
        //        Username = viewModel.Username,
        //        Password = viewModel.Password,
        //        RememberUser = viewModel.RememberMe
        //    };

        //    try
        //    {
        //        await _controllerResponseHelper.ExecuteIfValidAsync(controller, command);
        //    }
        //    catch (PasswordChangeRequiredException ex)
        //    {
        //        // Add modelstate error as a precaution, because
        //        // result.RequiresPasswordChange may not be handled by the caller
        //        controller.ModelState.AddModelError(string.Empty, "Password change required.");

        //        return LoginResult.PasswordChangeRequired;
        //    }

        //    if (controller.ModelState.IsValid) return LoginResult.Success;

        //    return LoginResult.Failed;
        //}

        public string GetAndValidateReturnUrl(Controller controller)
        {
            var returnUrl = controller.Request.Query["ReturnUrl"].FirstOrDefault();

            if (!string.IsNullOrEmpty(returnUrl)
                && controller.Url.IsLocalUrl(returnUrl)
                && !RelativePathHelper.IsWellFormattedAndEqual(controller.Request.Path, returnUrl)
                )
            {
                return returnUrl;
            }

            return null;
        }

        public async Task ChangePasswordAsync(
            Controller controller,
            IChangePasswordViewModel vm
            )
        {
            if (controller == null) throw new ArgumentNullException(nameof(controller));
            if (vm == null) throw new ArgumentNullException(nameof(vm));

            if (controller.ModelState.IsValid)
            {
                var command = new UpdateUserPasswordByCredentialsCommand()
                {
                    UserAreaCode = _userAreaDefinition.UserAreaCode,
                    Username = vm.Username,
                    NewPassword = vm.NewPassword,
                    OldPassword = vm.OldPassword
                };

                await _controllerResponseHelper.ExecuteIfValidAsync(controller, command);
            }
        }

        public Task SignOutAsync()
        {
            return _contentRepository
                //.WithContext<TUserArea>
                .Users()
                .Authentication()
                .SignOutAsync();
        }

        public Task SendAccountRecoveryNotificationAsync(
            Controller controller,
            IForgotPasswordViewModel vm
            )
        {
            if (!controller.ModelState.IsValid) return Task.CompletedTask;

            var command = new InitiateUserAccountRecoveryByEmailCommand()
            {
                Username = vm.Username,
                UserAreaCode = _userAreaDefinition.UserAreaCode
            };

            return _controllerResponseHelper.ExecuteIfValidAsync(controller, command);
        }

        public async Task<AccountRecoveryRequestValidationResult> ParseAndValidateAccountRecoveryRequestAsync(
            Controller controller
            )
        {
            if (controller == null) throw new ArgumentNullException(nameof(controller));

            var query = new ValidateUserAccountRecoveryByEmailQuery()
            {
                UserAreaCode = _userAreaDefinition.UserAreaCode
            };

            if (!controller.ModelState.IsValid)
            {
                return await ValidateAndMapAsync(query);
            }

            // Parse the auth tokens from the request
            query.Token = _userAccountRecoveryUrlHelper.ParseTokenFromQuery(controller.Request.Query);

            var result = await ValidateAndMapAsync(query);

            if (result.Error != null)
            {
                controller.ModelState.AddModelError(string.Empty, result.Error.Message);
            }

            return result;
        }

        private async Task<AccountRecoveryRequestValidationResult> ValidateAndMapAsync(ValidateUserAccountRecoveryByEmailQuery query)
        {
            var validationResult = await _contentRepository
                .Users()
                .AccountRecovery()
                .ValidateAsync(query)
                .ExecuteAsync();

            var result = new AccountRecoveryRequestValidationResult();
            result.Token = query.Token;
            result.IsSuccess = validationResult.IsSuccess;
            result.Error = validationResult.Error;

            return result;
        }

        public Task CompleteAccountRecoveryAsync(
            Controller controller,
            ICompleteAccountRecoveryViewModel vm
            )
        {
            if (!controller.ModelState.IsValid) return Task.CompletedTask;

            var command = new CompleteUserAccountRecoveryByEmailCommand()
            {
                NewPassword = vm.NewPassword,
                Token = vm.Token,
                UserAreaCode = _userAreaDefinition.UserAreaCode
            };

            return _controllerResponseHelper.ExecuteIfValidAsync(controller, command);
        }
    }
}