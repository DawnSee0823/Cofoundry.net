/*! UberCMS 2017-06-13 */
angular.module("cms.directories",["ngRoute","cms.shared"]).constant("_",window._).constant("directories.modulePath","/Admin/Modules/Directories/Js/"),angular.module("cms.directories").config(["$routeProvider","shared.routingUtilities","directories.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"Directory")}]),angular.module("cms.directories").factory("directories.directoryService",["$http","_","shared.serviceBase","directories.DirectoryTree",function(a,b,c,d){function e(a){return g+"/"+a}var f={},g=c+"webdirectories";return f.getAll=function(){return a.get(g)},f.getTree=function(){return a.get(g+"/tree").then(function(a){return a?new d(a):a})},f.getById=function(b){return a.get(e(b))},f.add=function(b){return a.post(g,b)},f.update=function(b){return a.patch(e(b.webDirectoryId),b)},f.remove=function(b){return a["delete"](e(b))},f}]),angular.module("cms.directories").factory("directories.DirectoryTree",["_",function(a){function b(b){var c=this;a.extend(c,b),c.flatten=function(b){function d(c,e){c.webDirectoryId!=b&&(e.push(c),a.each(c.childWebDirectories,function(a){d(a,e)}))}var e=[];return d(c,e),e},c.findNodeById=function(a){function b(c){var d;if(c)return c.forEach(function(c){d||(d=c.webDirectoryId==a?c:b(c.childWebDirectories))}),d}return b([c])}}return b}]),angular.module("cms.directories").directive("cmsDirectoryGrid",["directories.modulePath",function(a){function b(){function a(a){for(var c="",d=(b.startDepth||0)+1,e=d;a>e;e++)c+="— ";return c}var b=this;b.getPathDepthIndicator=a}return{restrict:"E",templateUrl:a+"UIComponents/DirectoryGrid.html",scope:{webDirectories:"=cmsDirectories",startDepth:"=cmsStartDepth",redirect:"=cmsRedirect"},replace:!1,controller:b,controllerAs:"vm",bindToController:!0}}]),angular.module("cms.directories").controller("AddDirectoryController",["$location","shared.stringUtilities","shared.LoadState","directories.directoryService",function(a,b,c,d){function e(){k(),l.formLoadState=new c(!0),l.globalLoadState=new c,l.editMode=!1,l.save=f,l.cancel=i,l.onNameChanged=h,l.onDirectoriesLoaded=g}function f(){l.globalLoadState.on(),d.add(l.command).then(j,l.globalLoadState.off)}function g(){l.formLoadState.off()}function h(){l.command.urlPath=b.slugify(l.command.name)}function i(){j()}function j(){a.path("/")}function k(){l.command={}}var l=this;e()}]),angular.module("cms.directories").controller("DirectoryDetailsController",["$routeParams","$q","$location","_","shared.stringUtilities","shared.LoadState","shared.modalDialogService","directories.directoryService","directories.modulePath",function(a,b,c,d,e,f,g,h,i){function j(){v.edit=k,v.save=l,v.cancel=m,v.deleteDirectory=n,v.onNameChanged=o,v.editMode=!1,v.globalLoadState=new f,v.saveLoadState=new f,v.formLoadState=new f(!0),q().then(u.bind(null,v.formLoadState))}function k(){v.editMode=!0,v.mainForm.formStatus.clear()}function l(){t(v.saveLoadState),h.update(v.command).then(p.bind(null,"Changes were saved successfully"))["finally"](u.bind(null,v.saveLoadState))}function m(){v.editMode=!1,v.command=r(v.webDirectory),v.mainForm.formStatus.clear()}function n(){function a(){return t(),h.remove(v.webDirectory.webDirectoryId).then(s)["catch"](u)}var b={title:"Delete Directory",message:"Are you sure you want to delete this directory?",okButtonTitle:"Yes, delete it",onOk:a};g.confirm(b)}function o(){v.hasChildContent||(v.command.urlPath=e.slugify(v.command.name))}function p(a){return q().then(v.mainForm.formStatus.success.bind(null,a))}function q(){function b(a){var b=a.findNodeById(c),d=a.flatten(c);v.webDirectory=b,v.parentDirectories=d,v.command=r(b),v.editMode=!1,v.hasChildContent=b.numPages||b.childWebDirectories.length}var c=a.id;return h.getTree().then(b)}function r(a){return d.pick(a,"webDirectoryId","name","urlPath","parentWebDirectoryId")}function s(){c.path("")}function t(a){v.globalLoadState.on(),a&&d.isFunction(a.on)&&a.on()}function u(a){v.globalLoadState.off(),a&&d.isFunction(a.off)&&a.off()}var v=this;j()}]),angular.module("cms.directories").controller("DirectoryListController",["_","shared.modalDialogService","shared.LoadState","shared.SearchQuery","directories.directoryService",function(a,b,c,d,e){function f(){h.gridLoadState=new c,g()}function g(){return h.gridLoadState.on(),e.getTree().then(function(a){var b=a.flatten();h.result=b.slice(1,b.length),h.gridLoadState.off()})}var h=this;f()}]);