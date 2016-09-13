﻿angular.module('cms.shared').controller('ConfirmDialogController', ['$scope', 'options', 'close', function ($scope, options, close) {
    angular.extend($scope, options);
    $scope.close = resolve;

    /* helpers */

    function resolve(result) {
        var resolver = result ? options.ok : options.cancel;

        if (resolver) {
            resolver().finally(closeIfRequired);
        }
    }

    function closeIfRequired() {
        if (options.autoClose) {
            close();
        }
    }

}]);