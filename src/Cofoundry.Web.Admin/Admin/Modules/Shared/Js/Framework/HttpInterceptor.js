﻿angular.module('cms.shared').factory('httpInterceptor', [
    '$q',
    '$rootScope',
    '_',
    'shared.validationErrorService',
    'authenticationService',
    'shared.errorService',
function (
    $q,
    $rootScope,
    _,
    validationErrorService,
    authenticationService,
    errorService) {

    var service = {};

    /* PUBLIC */

    service.response = function (response) {
        if (!_.isUndefined(response.data.data)) {
            response = response.data.data;
        }

        return response;
    };

    service.responseError = function (response) {
        var error;

        switch (response.status) {
            case 400:
                /* Bad Request */
                if (response.data.isValid === false) {
                    validationErrorService.raise(response.data.errors);
                }
                break;
            case 401:
                /* Unauthorized */
                authenticationService.redirectToLogin();
                break;
            case 403:
                /* Forbidden (authenticated but not permitted to view resource */
                errorService.raise({
                    title: 'Permission Denied',
                    message: 'This action is not authorized'
                });
                break;
            default:
                /* Allow get/404 responses through, otherwise raise an error. */
                if (response.status != 404 || response.config.method !== 'GET') {
                    error = {
                        title: response.statusText,
                        message: 'An unexpected server error has occured.',
                        response: response
                    };
                    
                    errorService.raise(error);
                }
                break;
        }

        return $q.reject(response);
    };

    return service;

}]);