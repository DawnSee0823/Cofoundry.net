/*! Cofoundry 2018-02-19 */
angular.module("cms.dashboard",["ngRoute","cms.shared"]).constant("_",window._).constant("dashboard.modulePath","/Admin/Modules/Dashboard/Js/"),angular.module("cms.dashboard").config(["$routeProvider","shared.routingUtilities","dashboard.modulePath",function(a,b,c){a.otherwise(b.mapOptions(c,"Dashboard"))}]),angular.module("cms.dashboard").factory("dashboard.dashboardService",["$http","_","shared.serviceBase",function(a,b,c){var d={};return d.getContent=function(){return a.get(c+"dashboard")},d}]),angular.module("cms.dashboard").directive("cmsDashboardComponent",["dashboard.modulePath",function(a){function b(){}return{restrict:"E",templateUrl:a+"UIComponents/DashboardComponent.html",scope:{heading:"@cmsHeading",listUrl:"@cmsListUrl",createUrl:"@cmsCreateUrl",entityName:"@cmsEntityName",entityNamePlural:"@cmsEntityNamePlural",numItems:"=cmsNumItems",loader:"=cmsLoader"},replace:!0,controller:b,controllerAs:"vm",bindToController:!0,transclude:!0}}]),angular.module("cms.dashboard").controller("DashboardController",["_","shared.modalDialogService","shared.urlLibrary","dashboard.dashboardService",function(a,b,c,d){function e(){f.urlLibrary=c,d.getContent().then(function(a){f.content=a})}var f=this;e()}]);