/*! UberCMS 2017-05-31 */
angular.module("cms.dashboard",["ngRoute","cms.shared"]).constant("_",window._).constant("dashboard.modulePath","/Admin/Modules/Dashboard/Js/"),angular.module("cms.dashboard").config(["$routeProvider","shared.routingUtilities","dashboard.modulePath",function(a,b,c){a.otherwise(b.mapOptions(c,"Dashboard"))}]),angular.module("cms.dashboard").factory("dashboard.dashboardService",["$http","_","shared.serviceBase",function(a,b,c){function d(a){var c=f;return a&&(c=b.extend({},f,a)),{params:c}}var e={},f={pageSize:5};return e.getPages=function(){return a.get(c+"pages",d())},e.getDraftPages=function(){return a.get(c+"pages",d({workFlowStatus:"Draft"}))},e.getUsers=function(){return a.get(c+"users",d({userAreaCode:"COF"}))},e.getPageTemplates=function(){return a.get(c+"page-templates",d())},e}]),angular.module("cms.dashboard").directive("cmsDashboardComponent",["dashboard.modulePath",function(a){function b(){}return{restrict:"E",templateUrl:a+"UIComponents/DashboardComponent.html",scope:{heading:"@cmsHeading",listUrl:"@cmsListUrl",createUrl:"@cmsCreateUrl",entityName:"@cmsEntityName",entityNamePlural:"@cmsEntityNamePlural",numItems:"=cmsNumItems",loader:"=cmsLoader"},replace:!0,controller:b,controllerAs:"vm",bindToController:!0,transclude:!0}}]),angular.module("cms.dashboard").controller("DashboardController",["_","shared.modalDialogService","shared.urlLibrary",function(a,b,c){function d(){e.urlLibrary=c}var e=this;d()}]);