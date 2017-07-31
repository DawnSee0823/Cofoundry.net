/*! UberCMS 2017-07-31 */
angular.module("cms.pages",["ngRoute","cms.shared"]).constant("_",window._).constant("pages.modulePath","/Admin/Modules/Pages/Js/"),angular.module("cms.pages").config(["$routeProvider","shared.routingUtilities","pages.modulePath",function(a,b,c){var d=b.mapOptions.bind(null,c);a.when("/new",d("AddPage")).when("/:id",d("PageDetails")).otherwise(d("PageList"))}]),angular.module("cms.pages").factory("pages.customEntityService",["$http","shared.serviceBase",function(a,b){var c={};return c.getAllRoutingRules=function(){return a.get(b+"custom-entity-routing-rules/")},c}]),angular.module("cms.pages").factory("pages.directoryService",["$http","_","shared.serviceBase",function(a,b,c){var d={},e=c+"page-directories";return d.getAll=function(){return a.get(e)},d}]),angular.module("cms.pages").factory("pages.pageTemplateService",["$http","$q","shared.serviceBase",function(a,b,c){var d={},e=c+"page-templates";return d.getAll=function(){var c=b.defer();return a.get(e).then(function(a){c.resolve(a.items)},c.reject),c.promise},d}]),angular.module("cms.pages").controller("AddPageController",["_","$q","$location","$window","shared.LoadState","shared.stringUtilities","shared.urlLibrary","shared.pageService","pages.pageTemplateService","pages.customEntityService",function(a,b,c,d,e,f,g,h,i,j){function k(){u.save=l.bind(null,!1,m),u.saveAndPublish=l.bind(null,!0,m),u.saveAndEdit=l.bind(null,!1,n),u.cancel=q,u.onNameChanged=o,u.onPageTypeChanged=p,u.globalLoadState=new e,u.saveLoadState=new e,u.saveAndPublishLoadState=new e,u.formLoadState=new e(!0),u.onLocalesLoaded=v.resolve,u.onPageDirectoriesLoaded=w.resolve,r()}function l(a,b){var c;a?(u.command.publish=!0,c=u.saveAndPublishLoadState):c=u.saveLoadState,s(c),h.add(u.command).then(b)["finally"](t.bind(null,c))}function m(a){c.path("/"+a)}function n(a){function b(a){d.location.href=g.pageVisualEditor(a.pageRoute,!0)}return h.getById(a).then(b)}function o(){u.command.urlPath=f.slugify(u.command.title)}function p(){var b=u.command.pageType,c="CustomEntityDetails"==b?b:"Generic";u.pageTemplates=a.where(u.allPageTemplates,{pageType:c})}function q(){c.path("/")}function r(){u.pageTypes=h.getPageTypes(),u.command={showInSiteMap:!0,pageType:u.pageTypes[0].value};var a=i.getAll().then(function(a){u.allPageTemplates=a}),b=j.getAllRoutingRules().then(function(a){u.routingRules=a});u.formLoadState.offWhen(v,w,a,b).then(p)}function s(b){u.globalLoadState.on(),b&&a.isFunction(b.on)&&b.on()}function t(b){u.globalLoadState.off(),b&&a.isFunction(b.off)&&b.off()}var u=this,v=b.defer(),w=b.defer();k()}]),angular.module("cms.pages").controller("PageDetailsController",["$routeParams","$q","$location","_","shared.LoadState","shared.modalDialogService","shared.entityVersionModalDialogService","shared.urlLibrary","shared.pageService","shared.permissionValidationService","pages.modulePath",function(a,b,c,d,e,f,g,h,i,j,k){function l(){F.edit=n,F.save=o.bind(null,!1),F.saveAndPublish=o.bind(null,!0),F.cancel=p,F.publish=q,F.unpublish=r,F.discardDraft=s,F.copyToDraft=t,F.deletePage=u,F.duplicatePage=v,F.changeUrl=w,F.getPartialUrl=m,F.editMode=!1,F.globalLoadState=new e,F.saveLoadState=new e,F.saveAndPublishLoadState=new e,F.formLoadState=new e(!0),F.urlLibrary=h,F.canCreate=j.canCreate("COFPGE"),F.canUpdate=j.canUpdate("COFPGE"),F.canDelete=j.canDelete("COFPGE"),F.canPublishPage=j.hasPermission("COFPGEPAGPUB"),F.canUpdatePageUrl=j.hasPermission("COFPGEUPDURL"),z(F.formLoadState)}function m(a){return k+"Routes/Partials/"+a+".html"}function n(){F.editMode=!0,F.mainForm.formStatus.clear()}function o(a){var b;a?(F.updateDraftCommand.publish=!0,b=F.saveAndPublishLoadState):b=F.saveLoadState,D(b),i.update(F.updatePageCommand).then(i.updateDraft.bind(this,F.updateDraftCommand)).then(x.bind(null,"Changes were saved successfully"))["finally"](E.bind(null,b))}function p(){F.editMode=!1,F.updatePageCommand=A(F.page),F.updateDraftCommand=B(F.page),F.mainForm.formStatus.clear()}function q(){g.publish(F.page.pageId,D).then(x.bind(null,"Page published successfully."))["catch"](E)}function r(){g.unpublish(F.page.pageId,D).then(x.bind(null,"The page has been unpublished and reverted to draft state."))["catch"](E)}function s(){function a(){return D(),i.removeDraft(F.page.pageId)}var b={title:"Discard Version",message:"Are you sure you want to discard this draft? This will discard all changes since the page was last published.",okButtonTitle:"Yes, discard it",onOk:a};f.confirm(b).then(x.bind(null,"Draft discarded successfully"))}function t(a){function b(){x("Draft created successfully.")}var c=!!y();g.copyToDraft(F.page.pageId,a.pageVersionId,c,D).then(b)["catch"](E)}function u(){function a(){return D(),i.remove(F.page.pageId).then(C)["catch"](E)}var b={title:"Delete Page",message:"Are you sure you want to delete this page?",okButtonTitle:"Yes, delete it",onOk:a};f.confirm(b)}function v(){f.show({templateUrl:k+"Routes/Modals/DuplicatePage.html",controller:"DuplicatePageController",options:{page:F.page}})}function w(){f.show({templateUrl:k+"routes/modals/changepageurl.html",controller:"ChangePageUrlController",options:{page:F.page,onSave:x.bind(null,"Url Changed")}})}function x(a,b){return z(b).then(F.mainForm.formStatus.success.bind(null,a))}function y(){return d.find(F.versions,function(a){return"Draft"===a.workFlowStatus})}function z(c){function d(){return i.getById(a.id).then(function(a){F.page=a,F.updatePageCommand=A(a),F.updateDraftCommand=B(a),F.editMode=!1})}function e(){return i.getVersionsByPageId(a.id).then(function(a){F.versions=a})}return b.all([d(),e()]).then(E.bind(null,c))}function A(a){return{pageId:a.pageId,tags:a.tags}}function B(a){var b=a.latestVersion,c=b.openGraph;return{pageId:a.pageId,title:b.title,metaDescription:b.metaDescription,openGraphTitle:c.title,openGraphDescription:c.description,openGraphImageId:c.image?c.image.ImageAssetId:void 0,showInSiteMap:b.showInSiteMap}}function C(){c.path("")}function D(a){F.globalLoadState.on(),a&&d.isFunction(a.on)&&a.on()}function E(a){F.globalLoadState.off(),a&&d.isFunction(a.off)&&a.off()}var F=this;l()}]),angular.module("cms.pages").controller("PageListController",["_","shared.entityVersionModalDialogService","shared.LoadState","shared.SearchQuery","shared.pageService","shared.permissionValidationService","pages.pageTemplateService",function(a,b,c,d,e,f,g){function h(){l(),n.gridLoadState=new c,n.globalLoadState=new c,n.query=new d({onChanged:k}),n.filter=n.query.getFilters(),n.toggleFilter=i,i(!1),n.publish=j,n.canCreate=f.canCreate("COFPGE"),n.canUpdate=f.canUpdate("COFPGE"),m()}function i(b){n.isFilterVisible=a.isUndefined(b)?!n.isFilterVisible:b}function j(a){b.publish(a,n.globalLoadState.on).then(m)["catch"](n.globalLoadState.off)}function k(){i(!1),m()}function l(){n.workFlowStatus=[{name:"Draft"},{name:"Published"}],g.getAll().then(function(a){n.pageTemplates=a})}function m(){return n.gridLoadState.on(),e.getAll(n.query.getParameters()).then(function(a){n.result=a,n.gridLoadState.off()})}var n=this;h()}]),angular.module("cms.pages").controller("ChangePageUrlController",["$scope","$q","$location","shared.LoadState","shared.pageService","pages.customEntityService","options","close",function(a,b,c,d,e,f,g,h){function i(){j(),a.submitLoadState=new d,a.formLoadState=new d(!0),a.save=l,a.close=h,a.localesLoaded=m.resolve,a.pageDirectoriesLoaded=n.resolve,a.formLoadState.offWhen(m,n,k())}function j(){var b=g.page,c=b.pageRoute;a.isCustomEntityRoute="CustomEntityDetails"===c.pageType,a.page=b,a.command={pageId:b.pageId,localeId:c.locale?c.locale.localeId:void 0,pageDirectoryId:c.pageDirectory.pageDirectoryId},a.isCustomEntityRoute?a.command.customEntityRoutingRule=c.urlPath:a.command.urlPath=c.urlPath}function k(){if(a.isCustomEntityRoute)return f.getAllRoutingRules().then(function(b){a.routingRules=b});var c=b.defer();return c.resolve(),c}function l(){a.submitLoadState.on(),e.updateUrl(a.command).then(g.onSave).then(h)["finally"](a.submitLoadState.off)}var m=b.defer(),n=b.defer();i()}]),angular.module("cms.pages").controller("DuplicatePageController",["$scope","$q","$location","shared.LoadState","shared.pageService","pages.customEntityService","options","close",function(a,b,c,d,e,f,g,h){function i(){j(),a.submitLoadState=new d,a.formLoadState=new d(!0),a.save=l,a.close=h,a.localesLoaded=n.resolve,a.pageDirectoriesLoaded=o.resolve,a.formLoadState.offWhen(n,o,k())}function j(){var b=g.page,c=b.pageRoute;a.isCustomEntityRoute="CustomEntityDetails"===c.pageType,a.page=b,a.command={pageToDuplicateId:b.pageId,localeId:c.locale?c.locale.localeId:void 0,pageDirectoryId:c.pageDirectory.pageDirectoryId,title:"Copy of "+b.latestVersion.title},a.isCustomEntityRoute?a.command.customEntityRoutingRule=c.urlPath:a.command.urlPath=c.urlPath+"-copy"}function k(){if(a.isCustomEntityRoute)return f.getAllRoutingRules().then(function(b){a.routingRules=b});var c=b.defer();return c.resolve(),c}function l(){a.submitLoadState.on(),e.duplicate(a.command).then(m).then(h)["finally"](a.submitLoadState.off)}function m(a){c.path("/"+a)}var n=b.defer(),o=b.defer();i()}]);