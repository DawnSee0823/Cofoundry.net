/*! UberCMS 2017-11-14 */
angular.module("cms.settings",["ngRoute","cms.shared"]).constant("_",window._).constant("settings.modulePath","/Admin/Modules/Settings/Js/"),angular.module("cms.settings").config(["$routeProvider","shared.routingUtilities","settings.modulePath",function(a,b,c){a.otherwise(b.mapOptions(c,"SettingsDetails"))}]),angular.module("cms.settings").factory("settings.settingsService",["$http","shared.serviceBase",function(a,b){var c={},d=b+"settings",e=d+"/generalsite",f=d+"/seo";return c.getGeneralSiteSettings=function(){return a.get(e)},c.getSeoSettings=function(){return a.get(f)},c.updateGeneralSiteSettings=function(b){return a.patch(e,b)},c.updateSeoSettings=function(b){return a.patch(f,b)},c.clearCache=function(c){return a["delete"](b+"cache")},c}]),angular.module("cms.settings").controller("SettingsDetailsController",["_","$q","shared.LoadState","shared.permissionValidationService","settings.settingsService","settings.modulePath",function(a,b,c,d,e,f){function g(){q.edit=h,q.save=i,q.cancel=j,q.clearCache=k,q.editMode=!1,q.globalLoadState=new c,q.saveLoadState=new c,q.formLoadState=new c(!0),q.canUpdateSettings=d.hasPermission("COFSETGENUPD"),m().then(p.bind(null,q.formLoadState))}function h(){q.editMode=!0,q.mainForm.formStatus.clear()}function i(){o(q.saveLoadState),e.updateGeneralSiteSettings(q.generalSettingsCommand).then(e.updateSeoSettings.bind(null,q.seoSettingsCommand)).then(l.bind(null,"Changes were saved successfully"))["finally"](p.bind(null,q.saveLoadState))}function j(){q.editMode=!1,n(),q.mainForm.formStatus.clear()}function k(){q.globalLoadState.on(),e.clearCache().then(l.bind(null,"Cache cleared"))["finally"](q.globalLoadState.off)}function l(a){return m().then(q.mainForm.formStatus.success.bind(null,a))}function m(){function a(a,b){q[a]=b}var c=e.getGeneralSiteSettings().then(a.bind(null,"generalSettings")),d=e.getSeoSettings().then(a.bind(null,"seoSettings"));return b.all([c,d]).then(function(){n(),q.editMode=!1})}function n(){q.seoSettingsCommand=a.clone(q.seoSettings),q.generalSettingsCommand=a.clone(q.generalSettings)}function o(b){q.globalLoadState.on(),b&&a.isFunction(b.on)&&b.on()}function p(b){q.globalLoadState.off(),b&&a.isFunction(b.off)&&b.off()}var q=this;g()}]);