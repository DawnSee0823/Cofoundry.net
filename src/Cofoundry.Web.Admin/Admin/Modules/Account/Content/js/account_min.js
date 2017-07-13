/*! UberCMS 2017-07-13 */
angular.module("cms.account",["ngRoute","cms.shared"]).constant("_",window._).constant("account.modulePath","/Admin/Modules/Account/Js/"),angular.module("cms.account").config(["$routeProvider","shared.routingUtilities","account.modulePath",function(a,b,c){a.when("/change-password",b.mapOptions(c,"ChangePassword")).otherwise(b.mapOptions(c,"AccountDetails"))}]),angular.module("cms.account").factory("account.accountService",["$http","shared.serviceBase",function(a,b){var c={},d=b+"account";return c.getAccountDetails=function(){return a.get(d)},c.update=function(b){return a.patch(d,b)},c.updatePassword=function(b){return a.put(d+"/password",b)},c}]),angular.module("cms.account").controller("AccountDetailsController",["shared.LoadState","shared.modalDialogService","shared.permissionValidationService","account.accountService","account.modulePath",function(a,b,c,d,e){function f(){o.edit=g,o.save=h,o.cancel=i,o.editMode=!1,o.globalLoadState=new a,o.saveLoadState=new a,o.formLoadState=new a(!0),o.canUpdate=c.canUpdate("COFCUR"),k().then(n.bind(null,o.formLoadState))}function g(){o.editMode=!0,o.mainForm.formStatus.clear()}function h(){m(o.saveLoadState),d.update(o.command).then(j.bind(null,"Changes were saved successfully"))["finally"](n.bind(null,o.saveLoadState))}function i(){o.editMode=!1,o.command=l(o.user),o.mainForm.formStatus.clear()}function j(a){return k().then(o.mainForm.formStatus.success.bind(null,a))}function k(){function a(a){o.user=a,o.command=l(a),o.editMode=!1}return d.getAccountDetails().then(a)}function l(a){return _.pick(a,"firstName","lastName","email")}function m(a){o.globalLoadState.on(),a&&_.isFunction(a.on)&&a.on()}function n(a){o.globalLoadState.off(),a&&_.isFunction(a.off)&&a.off()}var o=this;f()}]),angular.module("cms.account").controller("ChangePasswordController",["$location","shared.LoadState","shared.modalDialogService","account.accountService",function(a,b,c,d){function e(){k.save=f,k.cancel=g,k.doesPasswordMatch=h,k.globalLoadState=new b,k.formLoadState=new b(!0),i().then(k.formLoadState.off)}function f(){k.globalLoadState.on(),d.updatePassword(k.command).then(j)["finally"](k.globalLoadState.off)}function g(){j()}function h(a){return k.command?k.command.newPassword===a:!1}function i(){function a(a){k.user=a,k.command={}}return d.getAccountDetails().then(a)}function j(){a.path("/")}var k=this;e()}]);