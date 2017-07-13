/*! UberCMS 2017-07-13 */
angular.module("cms.roles",["ngRoute","cms.shared"]).constant("_",window._).constant("roles.modulePath","/Admin/Modules/Roles/Js/"),angular.module("cms.roles").config(["$routeProvider","shared.routingUtilities","roles.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"Role")}]),angular.module("cms.roles").factory("roles.permissionService",["$http","shared.serviceBase",function(a,b){var c={},d=b+"permissions";return c.getAll=function(b){return a.get(d)},c}]),angular.module("cms.roles").factory("roles.roleService",["$http","_","shared.serviceBase",function(a,b,c){function d(a){return f+"/"+a}var e={},f=c+"roles";return e.getAll=function(b){return a.get(f,{params:b})},e.getById=function(b){return a.get(d(b))},e.add=function(b){return a.post(f,b)},e.update=function(b){return a.patch(d(b.roleId),b)},e.remove=function(b){return a["delete"](d(b))},e}]),angular.module("cms.roles").factory("roles.userAreaService",["$http","_","shared.serviceBase",function(a,b,c){var d={};return d.getAll=function(){return a.get(c+"user-areas")},d}]),angular.module("cms.shared").directive("cmsFormFieldPermissionsCollection",["_","shared.LoadState","roles.modulePath","roles.permissionService",function(a,b,c,d){function e(c,e,g,h){function i(b,c){var d=b.target;a.each(c.permissions,function(a){a.selected=!!d.checked,j(a,c,!0)}),k()}function j(b,c,d){b.permissionType.code===f&&(c.isReadPermitted=b.selected,b.selected||a.each(c.permissions,function(a){a.selected=!1})),d||k()}function k(){var b=[];a.each(o.permissions,function(a){var c;a.selected&&(c={permissionCode:a.permissionType.code},a.entityDefinition&&(c.entityDefinitionCode=a.entityDefinition.entityDefinitionCode),b.push(c))}),o.model=b}function l(){if(o.permissionGroups&&o.permissionGroups.length){var b=!(!o.model||!o.model.length);a.each(o.permissionGroups,function(c){a.each(c.permissions,function(d){d.selected=b&&!!a.find(o.model,function(a){return d.uniqueId===m(a.permissionCode,a.entityDefinitionCode)}),j(d,c,!0)})})}}function m(a,b){var c="permission"+a;return b&&(c+=b),c}function n(){function b(b){b&&(o.permissions=b,o.permissionGroups=a.chain(o.permissions).groupBy(function(a){return a.entityDefinition?a.entityDefinition.name:"Misc"}).map(function(a,b){var d=c(a);return{title:b,isReadPermitted:!d||d.selected,permissions:e(a)}}).sortBy("title").value(),l()),o.permissionsLoadState.off()}function c(b){var c=a.find(b,function(a){return a.permissionType.code===f});return c}function e(b){return a.sortBy(b,function(a){var b=a.permissionType;switch(a.uniqueId=m(a.permissionType.code,a.entityDefinition?a.entityDefinition.entityDefinitionCode:""),b.code){case"COMRED":return a.isRead=!0,"AAAA1";case"COMMOD":return"AAAA2";case"COMCRT":return"AAAA3";case"COMUPD":return"AAAA4";case"COMDEL":return"AAAA5";default:return b.name}return a.permissionType.code})}return d.getAll().then(b)}var o=c,p=h[0];c.$watch("model",function(a,b){l()}),n(),o.formScope=p.getFormScope(),o.permissionsLoadState=new b(!0),o.toggleGroup=i,o.permissionChanged=j}var f="COMRED";return{restrict:"E",scope:{model:"=cmsModel",globalLoadState:"=cmsGlobalLoadState"},templateUrl:c+"UIComponents/FormFieldPermissionsCollection.html",require:["^^cmsForm"],link:e}}]),angular.module("cms.roles").controller("AddRoleController",["$location","shared.LoadState","roles.permissionService","roles.roleService","roles.userAreaService",function(a,b,c,d,e){function f(){l.globalLoadState=new b,l.formLoadState=new b(!0),j(),k(),l.editMode=!1,l.save=g,l.cancel=h}function g(){l.globalLoadState.on(),d.add(l.command).then(i)["finally"](l.globalLoadState.off)}function h(){i()}function i(){a.path("/")}function j(){function a(a){l.userAreas=a,1==a.length&&(l.command.userAreaCode=a[0].userAreaCode),l.formLoadState.off()}e.getAll().then(a)}function k(){l.command={permissions:[]}}var l=this;f()}]),angular.module("cms.roles").controller("RoleDetailsController",["$routeParams","$location","$q","shared.LoadState","shared.modalDialogService","shared.permissionValidationService","roles.roleService","roles.permissionService","roles.modulePath",function(a,b,c,d,e,f,g,h,i){function j(){u.edit=k,u.save=l,u.cancel=m,u.deleteRole=n,u.editMode=!1,u.globalLoadState=new d,u.saveLoadState=new d,u.formLoadState=new d(!0),u.canUpdate=f.canUpdate("COFROL"),u.canDelete=f.canDelete("COFROL"),p().then(t.bind(null,u.formLoadState))}function k(){u.editMode=!0,u.mainForm.formStatus.clear()}function l(){s(u.saveLoadState),g.update(u.command).then(o.bind(null,"Changes were saved successfully"))["finally"](t.bind(null,u.saveLoadState))}function m(){u.editMode=!1,u.command=q(u.role),u.mainForm.formStatus.clear()}function n(){function a(){return s(),g.remove(u.role.roleId).then(r)["catch"](t)}var b={title:"Delete Role",message:"Are you sure you want to delete this role?",okButtonTitle:"Yes, delete it",onOk:a};e.confirm(b)}function o(a){return p().then(u.mainForm.formStatus.success.bind(null,a))}function p(){function b(a){u.role=a,u.command=q(a),u.editMode=!1}var c=a.id;return g.getById(c).then(b)}function q(a){var b=_.pick(a,"roleId","title");return b.permissions=_.map(a.permissions,function(a){var b={permissionCode:a.permissionType.code};return a.entityDefinition&&(b.entityDefinitionCode=a.entityDefinition.entityDefinitionCode),b}),b}function r(){b.path("")}function s(a){u.globalLoadState.on(),a&&_.isFunction(a.on)&&a.on()}function t(a){u.globalLoadState.off(),a&&_.isFunction(a.off)&&a.off()}var u=this;j()}]),angular.module("cms.roles").controller("RoleListController",["_","shared.LoadState","shared.SearchQuery","shared.urlLibrary","shared.permissionValidationService","roles.roleService",function(a,b,c,d,e,f){function g(){k.urlLibrary=d,k.gridLoadState=new b,k.query=new c({onChanged:i}),k.filter=k.query.getFilters(),k.toggleFilter=h,k.canCreate=e.canCreate("COFROL"),k.canUpdate=e.canUpdate("COFROL"),h(!1),j()}function h(b){k.isFilterVisible=a.isUndefined(b)?!k.isFilterVisible:b}function i(){h(!1),j()}function j(){return k.gridLoadState.on(),f.getAll(k.query.getParameters()).then(function(a){k.result=a,k.gridLoadState.off()})}var k=this;g()}]);