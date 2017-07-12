/*! UberCMS 2017-07-17 */
angular.module("cms.customEntities",["ngRoute","cms.shared"]).constant("_",window._).constant("customEntities.modulePath","/Admin/Modules/CustomEntities/Js/"),angular.module("cms.customEntities").config(["$routeProvider","shared.routingUtilities","customEntities.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"CustomEntity")}]),angular.module("cms.customEntities").controller("AddCustomEntityController",["$scope","$location","$q","$window","shared.stringUtilities","shared.LoadState","shared.customEntityService","shared.urlLibrary","customEntities.options",function(a,b,c,d,e,f,g,h,i){function j(){s.globalLoadState=new f,s.saveLoadState=new f,s.saveAndPublishLoadState=new f,s.formLoadState=new f(!0),s.editMode=!1,s.options=i,s.saveButtonText=i.autoPublish?"Save":"Save & Publish",s.saveAndEditButtonText=i.autoPublish?"Save & Edit Content":"Save Draft & Edit Content",s.save=k.bind(null,!1,n),s.saveAndPublish=k.bind(null,!0,n),s.saveAndEdit=k.bind(null,!1,o),s.cancel=m,s.onNameChanged=l,p()}function k(a,b){var c;a?(s.command.publish=!0,c=s.saveAndPublishLoadState):c=s.saveLoadState,q(c),g.add(s.command,i.customEntityDefinitionCode).then(b)["finally"](r.bind(null,c))}function l(){s.command.urlSlug=e.slugify(s.command.title)}function m(){b.path("/")}function n(a){b.path("/"+a)}function o(a){function b(a){d.location.href=h.customEntityVisualEditor(a,!0)}return g.getById(a).then(b)}function p(){function b(a){s.command.model={},s.formDataSource={model:s.command.model,modelMetaData:a}}function c(a){s.pageRoutes=a}var d=g.getDataModelSchema(i.customEntityDefinitionCode).then(b),e=g.getPageRoutes(i.customEntityDefinitionCode).then(c);s.formLoadState.offWhen(d,e),s.command={},a.$watch("vm.command.localeId",function(a){a?s.additionalParameters={localeId:a}:s.additionalParameters={}})}function q(a){s.globalLoadState.on(),a&&_.isFunction(a.on)&&a.on()}function r(a){s.globalLoadState.off(),a&&_.isFunction(a.off)&&a.off()}var s=this;j()}]),angular.module("cms.customEntities").controller("CustomEntityDetailsController",["$routeParams","$q","$location","_","shared.LoadState","shared.modalDialogService","shared.entityVersionModalDialogService","shared.customEntityService","shared.urlLibrary","shared.permissionValidationService","customEntities.modulePath","customEntities.options",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(){E.edit=n,E.save=o.bind(null,!1),E.saveAndPublish=o.bind(null,!0),E.cancel=p,E.publish=q,E.unpublish=r,E.discardDraft=s,E.copyToDraft=t,E.deleteCustomEntity=u,E.changeUrl=v,E.editMode=!1,E.globalLoadState=new e,E.saveLoadState=new e,E.saveAndPublishLoadState=new e,E.formLoadState=new e(!0),E.options=l,E.urlLibrary=i,E.saveButtonText=l.autoPublish?"Save":"Save & Publish",E.canChangeUrl=!l.autoGenerateUrlSlug||l.hasLocale,E.permissions=j,y(E.formLoadState)}function n(){E.editMode=!0,E.mainForm.formStatus.clear()}function o(a){var b;a?(E.updateCommand.publish=!0,b=E.saveAndPublishLoadState):b=E.saveLoadState,B(b),h.updateDraft(E.updateCommand,l.customEntityDefinitionCode).then(w.bind(null,"Changes were saved successfully"))["finally"](C.bind(null,b))}function p(){E.editMode=!1,E.updateCommand=z(E.customEntity),E.mainForm.formStatus.clear()}function q(){g.publish(E.customEntity.customEntityId,B,G).then(w.bind(null,l.nameSingular+" published successfully."))["catch"](C)}function r(){g.unpublish(E.customEntity.customEntityId,B,G).then(w.bind(null,"The "+F+" has been unpublished and reverted to draft state."))["catch"](C)}function s(){function a(){return B(),h.removeDraft(E.customEntity.customEntityId)}var b={title:"Discard Version",message:"Are you sure you want to discard this draft? This will discard all changes since it was last published.",okButtonTitle:"Yes, discard it",onOk:a};f.confirm(b).then(w.bind(null,"Draft discarded successfully"))}function t(a){function b(){w("Draft created successfully.")}var c=!!x();g.copyToDraft(E.customEntity.customEntityId,a.customEntityVersionId,c,B,G).then(b)["catch"](C)}function u(){function a(){return B(),h.remove(E.customEntity.customEntityId).then(A)["catch"](C)}var b={title:"Delete "+l.nameSingular,message:"Are you sure you want to delete this "+F+"?",okButtonTitle:"Yes, delete it",onOk:a};f.confirm(b)}function v(){f.show({templateUrl:k+"Routes/Modals/ChangeUrl.html",controller:"ChangeUrlController",options:{customEntity:E.customEntity,onSave:w.bind(null,"Url Changed")}})}function w(a,b){return y(b).then(E.mainForm.formStatus.success.bind(null,a))}function x(){return d.find(E.versions,function(a){return"Draft"===a.workFlowStatus})}function y(c){function d(a){var b=a[0],c=a[1];D=a[2],E.customEntity=b,E.versions=c,E.updateCommand=z(b),E.customEntity.locale?E.additionalParameters={localeId:E.customEntity.locale.localeId}:E.additionalParameters={},E.editMode=!1}function e(){return h.getDataModelSchema(l.customEntityDefinitionCode)}function f(){return h.getById(a.id)}function g(){return h.getVersionsByCustomEntityId(a.id)}return b.all([f(),g(),e()]).then(d).then(C.bind(null,c))}function z(a){var b={customEntityId:a.customEntityId,title:a.latestVersion.title,model:angular.copy(a.latestVersion.model)};return E.formDataSource={model:b.model,modelMetaData:D},b}function A(){c.path("")}function B(a){E.globalLoadState.on(),a&&d.isFunction(a.on)&&a.on()}function C(a){E.globalLoadState.off(),a&&d.isFunction(a.off)&&a.off()}var D,E=this,F=l.nameSingular.toLowerCase(),G={entityNameSingular:l.nameSingular,isCustomEntity:!0};m()}]),angular.module("cms.customEntities").controller("CustomEntityListController",["_","shared.LoadState","shared.SearchQuery","shared.modalDialogService","shared.customEntityService","shared.permissionValidationService","customEntities.modulePath","customEntities.options",function(a,b,c,d,e,f,g,h){function i(){n.options=h,n.gridLoadState=new b,n.query=new c({onChanged:l}),n.filter=n.query.getFilters(),n.toggleFilter=j,n.changeOrdering=k,n.permissions=f,j(!1),m()}function j(b){n.isFilterVisible=a.isUndefined(b)?!n.isFilterVisible:b}function k(){d.show({templateUrl:g+"Routes/Modals/ChangeOrdering.html",controller:"ChangeOrderingController",options:{localeId:n.filter.localeId,onSave:m}})}function l(){j(!1),m()}function m(){return n.gridLoadState.on(),e.getAll(n.query.getParameters(),h.customEntityDefinitionCode).then(function(a){n.result=a,n.gridLoadState.off()})}var n=this;i()}]),angular.module("cms.customEntities").controller("ChangeOrderingController",["$scope","$q","$location","_","shared.LoadState","shared.arrayUtilities","shared.internalModulePath","shared.modalDialogService","shared.customEntityService","customEntities.options","options","close",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(){a.options=j,a.command={localeId:k.localeId,customEntityDefinitionCode:j.customEntityDefinitionCode},a.isPartialOrdering="Partial"===j.ordering,a.submitLoadState=new e,a.formLoadState=new e(!0),a.gridLoadState=new e,a.save=n,a.close=l,a.setStep=u,a.onLocalesLoaded=o,a.onDrop=p,a.remove=q,a.showPicker=r,t()}function n(){a.command.orderedCustomEntityIds=s(),a.submitLoadState.on(),i.updateOrdering(a.command).then(k.onSave).then(l)["finally"](a.submitLoadState.off)}function o(){a.formLoadState.off()}function p(b,c){f.moveObject(a.gridData,c,b,w)}function q(b){f.removeObject(a.gridData,b)}function r(){function b(b){if(b&&b.length){var c=d.filter(a.gridData,function(a){return!d.contains(b,a[w])});a.gridData=d.difference(a.gridData,c);var e=d.difference(b,s());e.length&&(a.gridLoadState.on(),i.getByIdRange(e).then(function(b){a.gridData=d.union(a.gridData,b),a.gridLoadState.off()}))}else a.gridData=[]}h.show({templateUrl:g+"UIComponents/CustomEntities/CustomEntityPickerDialog.html",controller:"CustomEntityPickerDialogController",options:{selectedIds:s(),customEntityDefinition:j,filter:{localeId:a.command.localeId},onSelected:b}})}function s(){return d.pluck(a.gridData,w)}function t(){j.hasLocale?(a.allowStep1=!0,u(1)):(u(2),a.formLoadState.off())}function u(b){a.currentStep=b,2===b&&v()}function v(){function b(b){a.isPartialOrdering?a.gridData=d.filter(b.items,function(a){return!!a.ordering}):a.gridData=b.items,a.formLoadState.off()}a.formLoadState.on();var c={pageSize:60,localeId:a.command.localeId,interpretNullLocaleAsNone:!0};i.getAll(c,j.customEntityDefinitionCode).then(b)}var w="customEntityId";m()}]),angular.module("cms.customEntities").controller("ChangeUrlController",["$scope","$q","$location","shared.LoadState","shared.customEntityService","customEntities.options","options","close",function(a,b,c,d,e,f,g,h){function i(){var b=g.customEntity;a.options=f,a.customEntity=b,a.command={customEntityId:b.customEntityId,localeId:b.locale?b.locale.localeId:void 0,urlSlug:b.urlSlug},a.submitLoadState=new d,a.formLoadState=new d(f.hasLocale),a.save=j,a.close=h,a.localesLoaded=k.resolve,a.formLoadState.offWhen(k)}function j(){a.submitLoadState.on(),e.updateUrl(a.command).then(g.onSave).then(h)["finally"](a.submitLoadState.off)}var k=b.defer();i()}]);