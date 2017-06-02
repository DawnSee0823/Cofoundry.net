/*! UberCMS 2017-06-02 */
angular.module("cms.users",["ngRoute","cms.shared"]).constant("_",window._).constant("users.modulePath","/Admin/Modules/Users/Js/"),angular.module("cms.users").config(["$routeProvider","shared.routingUtilities","users.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"User")}]),angular.module("cms.users").factory("users.roleService",["$http","shared.serviceBase","users.options",function(a,b,c){var d={},e=b+"roles";return d.getSelectionList=function(){return a.get(e,{params:{userAreaCode:c.userAreaCode,excludeAnonymous:!0}})},d}]),angular.module("cms.users").factory("users.userService",["$http","shared.serviceBase","users.options",function(a,b,c){function d(a){return g+"/"+a}function e(a){return a=a||{},a.userAreaCode=c.userAreaCode,a}var f={},g=b+"users";return f.getAll=function(b){return b=e(b),a.get(g,{params:b})},f.getById=function(b){return a.get(d(b))},f.add=function(b){return b=e(b),b.generatePassword=!0,a.post(g,b)},f.update=function(b){return a.patch(d(b.userId),b)},f.remove=function(b){return a["delete"](d(b))},f}]),angular.module("cms.users").controller("AddUserController",["$location","_","shared.stringUtilities","shared.LoadState","users.userService","users.roleService","users.options",function(a,b,c,d,e,f,g){function h(){l(),m(),n.globalLoadState=new d,n.editMode=!1,n.userArea=g,n.save=i,n.cancel=j}function i(){n.globalLoadState.on(),e.add(n.command).then(k)["finally"](n.globalLoadState.off)}function j(){k()}function k(){a.path("/")}function l(){function a(a){a&&(n.roles=a.items,1===a.items.length&&(n.command.roleId=a.items[0].roleId))}return f.getSelectionList().then(a)}function m(){n.command={}}var n=this;h()}]),angular.module("cms.users").controller("UserDetailsController",["$routeParams","$location","$q","shared.LoadState","shared.modalDialogService","users.userService","users.roleService","users.modulePath","users.options",function(a,b,c,d,e,f,g,h,i){function j(){w.edit=k,w.save=l,w.cancel=m,w.deleteUser=n,w.editMode=!1,w.globalLoadState=new d,w.saveLoadState=new d,w.formLoadState=new d(!0),w.userArea=i,c.all([p(),q()]).then(r).then(v.bind(null,w.formLoadState))}function k(){w.editMode=!0,w.mainForm.formStatus.clear()}function l(){u(w.saveLoadState),f.update(w.command).then(o.bind(null,"Changes were saved successfully"))["finally"](v.bind(null,w.saveLoadState))}function m(){w.editMode=!1,w.command=s(),w.mainForm.formStatus.clear()}function n(){function a(){return u(),f.remove(w.user.userId).then(t)["catch"](v)}var b={title:"Delete User",message:"Are you sure you want to delete this user?",okButtonTitle:"Yes, delete it",onOk:a};e.confirm(b)}function o(a){return q().then(r).then(w.mainForm.formStatus.success.bind(null,a))}function p(){function a(a){a&&(w.roles=a.items)}return g.getSelectionList().then(a)}function q(){function b(a){w.user=a}var c=a.id;return f.getById(c).then(b)}function r(){w.command=s(),w.editMode=!1}function s(){var a=_.pick(w.user,"userId","firstName","lastName","username","email");return w.user.role&&(a.roleId=w.user.role.roleId),a}function t(){b.path("")}function u(a){w.globalLoadState.on(),a&&_.isFunction(a.on)&&a.on()}function v(a){w.globalLoadState.off(),a&&_.isFunction(a.off)&&a.off()}var w=this;j()}]),angular.module("cms.users").controller("UserListController",["_","shared.LoadState","shared.SearchQuery","shared.urlLibrary","users.userService","users.options",function(a,b,c,d,e,f){function g(){k.userArea=f,k.urlLibrary=d,k.gridLoadState=new b,k.query=new c({onChanged:i}),k.filter=k.query.getFilters(),k.toggleFilter=h,h(!1),j()}function h(b){k.isFilterVisible=a.isUndefined(b)?!k.isFilterVisible:b}function i(){h(!1),j()}function j(){return k.gridLoadState.on(),e.getAll(k.query.getParameters()).then(function(a){k.result=a,k.gridLoadState.off()})}var k=this;g()}]);