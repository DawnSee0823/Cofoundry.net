angular.module("cms.users",["ngRoute","cms.shared"]).constant("_",window._).constant("users.modulePath","/Admin/Modules/Users/Js/");
angular.module("cms.users").config(["$routeProvider","shared.routingUtilities","users.modulePath",function(e,r,s){r.registerCrudRoutes(e,s,"User")}]);
angular.module("cms.users").factory("users.roleService",["$http","shared.serviceBase","users.options",function(e,r,s){var o={},u=r+"roles";return o.getSelectionList=function(){return e.get(u,{params:{userAreaCode:s.userAreaCode,excludeAnonymous:!0}})},o}]);
angular.module("cms.users").factory("users.userService",["$http","shared.serviceBase","users.options",function(r,e,t){var n={},u=e+"users";function s(e){return u+"/"+e}function o(e){return(e=e||{}).userAreaCode=t.userAreaCode,e}return n.getAll=function(e){return e=o(e),r.get(u,{params:e})},n.getById=function(e){return r.get(s(e))},n.add=function(e){return(e=o(e)).generatePassword=!0,r.post(u,e)},n.update=function(e){return r.patch(s(e.userId),e)},n.remove=function(e){return r.delete(s(e))},n}]);
angular.module("cms.users").controller("AddUserController",["$location","_","shared.stringUtilities","shared.LoadState","users.userService","users.roleService","users.options",function(e,o,t,n,a,s,l){var r=this;function i(){r.globalLoadState.on(),a.add(r.command).then(c).finally(r.globalLoadState.off)}function d(){c()}function c(){e.path("/")}s.getSelectionList().then(function(e){e&&(r.roles=e.items,1===e.items.length&&(r.command.roleId=e.items[0].roleId))}),r.command={},r.globalLoadState=new n,r.editMode=!1,r.userArea=l,r.save=i,r.cancel=d}]);
angular.module("cms.users").controller("UserDetailsController",["$routeParams","$location","$q","shared.LoadState","shared.modalDialogService","shared.permissionValidationService","users.userService","users.roleService","users.modulePath","users.options",function(t,e,n,o,a,r,s,i,u,l){var d=this;function c(){d.editMode=!0,d.mainForm.formStatus.clear()}function f(){F(d.saveLoadState),s.update(d.command).then(function(e){return h().then(v).then(d.mainForm.formStatus.success.bind(null,e))}.bind(null,"Changes were saved successfully")).finally(b.bind(null,d.saveLoadState))}function m(){d.editMode=!1,d.command=L(),d.mainForm.formStatus.clear()}function S(){var e={title:"Delete User",message:"Are you sure you want to delete this user?",okButtonTitle:"Yes, delete it",onOk:function(){return F(),s.remove(d.user.userId).then(g).catch(b)}};a.confirm(e)}function h(){var e=t.id;return s.getById(e).then(function(e){d.user=e})}function v(){d.command=L(),d.editMode=!1}function L(){var e=_.pick(d.user,"userId","firstName","lastName","username","email");return d.user.role&&(e.roleId=d.user.role.roleId),e}function g(){e.path("")}function F(e){d.globalLoadState.on(),e&&_.isFunction(e.on)&&e.on()}function b(e){d.globalLoadState.off(),e&&_.isFunction(e.off)&&e.off()}!function(){d.edit=c,d.save=f,d.cancel=m,d.deleteUser=S,d.editMode=!1,d.globalLoadState=new o,d.saveLoadState=new o,d.formLoadState=new o(!0);var e="COF"===(d.userArea=l).userAreaCode?"COFUSR":"COFUSN";d.canUpdate=r.canUpdate(e),d.canDelete=r.canDelete(e),n.all([i.getSelectionList().then(function(e){e&&(d.roles=e.items)}),h()]).then(v).then(b.bind(null,d.formLoadState))}()}]);
angular.module("cms.users").controller("UserListController",["_","shared.LoadState","shared.SearchQuery","shared.urlLibrary","shared.permissionValidationService","users.userService","users.options",function(r,a,t,i,n,e,s){var o=this;function u(e){o.isFilterVisible=r.isUndefined(e)?!o.isFilterVisible:e}function d(){u(!1),l()}function l(){return o.gridLoadState.on(),e.getAll(o.query.getParameters()).then(function(e){o.result=e,o.gridLoadState.off()})}!function(){o.userArea=s,o.urlLibrary=i,o.gridLoadState=new a,o.query=new t({onChanged:d}),o.filter=o.query.getFilters(),o.toggleFilter=u;var e="COF"===s.userAreaCode?"COFUSR":"COFUSN";o.canRead=n.canRead(e),o.canUpdate=n.canUpdate(e),o.canCreate=n.canCreate(e),u(!1),l()}()}]);