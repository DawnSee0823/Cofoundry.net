/*! Cofoundry 2018-03-28 */
angular.module("cms.visualEditor",["cms.shared"]).constant("_",window._).constant("visualEditor.modulePath","/Admin/Modules/VisualEditor/Js/"),angular.module("cms.visualEditor").factory("visualEditor.pageBlockService",["$http","shared.serviceBase","visualEditor.options",function(a,b,c){function d(a,b){return e(a)+"/"+b}function e(a){return a?h:g}var f={},g=b+"page-version-region-blocks",h=b+"custom-entity-version-page-blocks";return f.getAllBlockTypes=function(){return a.get(b+"page-block-types/")},f.getPageVersionBlockById=function(b,c){return a.get(d(b,c)+"?datatype=updatecommand")},f.getRegion=function(c){return a.get(b+"page-templates/0/regions/"+c)},f.getBlockTypeSchema=function(c){return a.get(b+"page-block-types/"+c)},f.add=function(b,d){var f=b?"customEntity":"page";return d[f+"VersionId"]=c.versionId,a.post(e(b),d)},f.update=function(b,c,e){return a.put(d(b,c),e)},f.remove=function(b,c){return a["delete"](d(b,c))},f.moveUp=function(b,c){return a.put(d(b,c)+"/move-up")},f.moveDown=function(b,c){return a.put(d(b,c)+"/move-down")},f}]),angular.module("cms.visualEditor").directive("cmsPageRegion",["$window","$timeout","_","shared.modalDialogService","visualEditor.modulePath",function(a,b,c,d,e){function f(a){this.getRegionParams=function(){return c.pick(a,["siteFrameEl","refreshContent","pageTemplateRegionId","isMultiBlock","isCustomEntity","permittedBlockTypes"])}}function g(c,f,g){function h(){c.isOver=!1,c.setIsOver=j,c.addBlock=i,c.startScrollY=0,c.currentScrollY=0,c.$watch("regionAnchorElement",k),c.$watch("isRegionOver",j),c.$watch("scrolled",m),c.$watch("resized",l)}function i(){function a(){c.isPopupActive=!1}c.isPopupActive=!0,d.show({templateUrl:e+"Routes/Modals/AddBlock.html",controller:"AddBlockController",options:{anchorElement:c.regionAnchorElement,pageTemplateRegionId:c.pageTemplateRegionId,onClose:a,refreshContent:n,isCustomEntity:c.isCustomEntity,permittedBlockTypes:c.permittedBlockTypes}})}function j(a){a?(p&&(b.cancel(p),p=null),c.isOver=!0,o(c.regionAnchorElement,!0)):p||(p=b(function(){c.isOver=!1,o(c.regionAnchorElement,!1)},300))}function k(b,d){function e(a){return a?a.split(","):[]}function f(){var d=c.siteFrameEl,e=b.offset(),f=d.offset(),g=d[0].contentDocument.documentElement,h=e.top+f.top-g.scrollTop+2;h<f.top&&(h=f.top);var i=(a.innerWidth-d[0].clientWidth)/2+(e.left+b[0].offsetWidth);c.css={top:h+"px",left:(i||0)+"px"},c.startScrollY=c.currentScrollY,c.startY=h}b&&(c.pageTemplateRegionId=b.attr("data-cms-page-template-region-id"),c.regionName=b.attr("data-cms-page-region-name"),c.isMultiBlock=b.attr("data-cms-multi-block"),c.permittedBlockTypes=e(b.attr("data-cms-page-region-permitted-block-types")),c.isCustomEntity=b[0].hasAttribute("data-cms-custom-entity-region"),f()),o(d,!1)}function l(a){c.isOver=!1,c.regionAnchorElement=""}function m(a){c.currentScrollY=a||0;var b=c.startY+(c.startScrollY-a);0>b&&(b=0),b&&(c.css={top:b+"px",left:c.css.left})}function n(){return c.refreshContent({pageTemplateRegionId:c.pageTemplateRegionId})}function o(a,b){a&&a.toggleClass("cofoundry-sv__hover-region",b)}var p;h()}return{restrict:"E",templateUrl:e+"UIComponents/PageRegion.html",controller:["$scope",f],link:g,replace:!0}}]),angular.module("cms.visualEditor").directive("cmsPageRegionBlock",["$window","$timeout","visualEditor.pageBlockService","shared.modalDialogService","shared.LoadState","visualEditor.modulePath","visualEditor.options",function(a,b,c,d,e,f,g){function h(g,h,i,j){function k(){g.isOver=!1,u(),g.setIsOver=p,g.addBlock=n.bind(null,"Last"),g.editBlock=o,g.moveBlockUp=l.bind(null,!0),g.moveBlockDown=l.bind(null,!1),g.addBlockAbove=n.bind(null,"BeforeItem"),g.addBlockBelow=n.bind(null,"AfterItem"),g.deleteBlock=m,g.globalLoadState=x,g.$watch("anchorElement",q),g.$watch("isContainerOver",p),g.$watch("scrolled",r)}function l(a){var b=a?c.moveUp:c.moveDown;x.isLoading||(x.on(),b(w.isCustomEntity,g.versionBlockId).then(s)["finally"](x.off))}function m(){function a(){return c.remove(b,g.versionBlockId).then(s)["finally"](x.off)}var b=(g.anchorElement,w.isCustomEntity),e={title:"Delete Content Block",message:"Are you sure you want to delete this content block?",okButtonTitle:"Yes, delete it",onOk:a};x.isLoading||(x.on(),d.confirm(e))}function n(a){function b(){g.isPopupActive=!1,x.off()}x.isLoading||(x.on(),g.isPopupActive=!0,d.show({templateUrl:f+"Routes/Modals/AddBlock.html",controller:"AddBlockController",options:{anchorElement:g.anchorElement,pageTemplateRegionId:g.pageTemplateRegionId,adjacentVersionBlockId:g.versionBlockId,insertMode:a,refreshContent:s,isCustomEntity:w.isCustomEntity,permittedBlockTypes:w.permittedBlockTypes,onClose:b}}))}function o(){function a(){g.isPopupActive=!1,x.off()}x.isLoading||(x.on(),g.isPopupActive=!0,d.show({templateUrl:f+"Routes/Modals/EditBlock.html",controller:"EditBlockController",options:{anchorElement:g.anchorElement,versionBlockId:g.versionBlockId,pageBlockTypeId:g.pageBlockTypeId,isCustomEntity:w.isCustomEntity,refreshContent:s,onClose:a}}))}function p(a){u(),a?(v&&(b.cancel(v),v=null),g.isOver=!0,t(g.anchorElement,!0)):v||(v=b(function(){g.isOver=!1,t(g.anchorElement,!1)},300))}function q(c,d){function e(c,d){var e=w.siteFrameEl,f=c.offset(),g=e.offset(),h=e[0].contentDocument.documentElement,i=f.top+g.top-h.scrollTop+2;i<g.top&&(i=g.top);var j=f.left-h.scrollLeft+(a.innerWidth-e[0].clientWidth)/2+2;d.css={top:i+"px",left:(j||0)+"px"},d.startScroll=e[0].contentWindow.scrollY,d.startY=i,b(function(){var a,a,b=document.getElementById("cofoundry-sv__block-popover");b&&(a=b.offsetHeight,windowHeight=window.innerHeight,b.offsetTop+a>windowHeight&&(d.css.top=windowHeight-a+"px"))},1)}c&&(g.versionBlockId=c.attr("data-cms-version-block-id"),g.pageBlockTypeId=c.attr("data-cms-page-block-type-id"),e(c,g)),t(d,!1)}function r(a){var b=g.startY-a+g.startScroll;b&&(g.css={top:b+"px",left:g.css.left})}function s(){return g.refreshContent({pageTemplateRegionId:g.pageTemplateRegionId})}function t(a,b){a&&a.toggleClass("cofoundry-sv__hover-block",b)}function u(){w=j[0].getRegionParams(),g.isMultiBlock=w.isMultiBlock,g.pageTemplateRegionId=w.pageTemplateRegionId}var v,w,x=new e;k()}return{scope:{anchorElement:"=",isContainerOver:"=",refreshContent:"=",scrolled:"="},templateUrl:f+"UIComponents/PageRegionBlock.html",require:["^cmsPageRegion"],link:h}}]),angular.module("cms.visualEditor").directive("cmsSitePageFrame",["$window","$templateCache","$compile","$document","$q","$http","visualEditor.options",function(a,b,c,d,e,f,g){function h(a,b){function c(){a.$apply(function(){var c=b[0].contentWindow,d=b[0].contentDocument;i(a,d,b),c.addEventListener("scroll",function(b){a.scrolled=angular.element(this)[0].scrollY,a.$apply()}),c.addEventListener("resize",function(b){a.resized=angular.element(this)[0].innerWidth}),l&&l.resolve()})}b.ready(c)}function i(a,b,c){var d=new k(a,c);j(b,d),angular.element(b).find("html").addClass(g.isCustomEntityRoute?"cofoundry-editmode__custom-entity":"cofoundry-editmode__page")}function j(a,b){function c(b,c,e){var f,g,h,i="data-cms-"+d+"-"+b;for(f=a.hasAttribute&&a.hasAttribute(i)?[a]:a.querySelectorAll("["+i+"]"),g=f.length,h=0;g>h;++h)f[h].addEventListener("mouseenter",c.bind(null,angular.element(f[h]))),f[h].addEventListener("mouseleave",e)}var d=g.isCustomEntityRoute?"custom-entity":"page";c("region",b.showRegion,b.hideRegion),c("region-block",b.showBlock,b.hideBlock)}function k(a,b){function g(b){return function(c){a.$apply(b.bind(null,c))}}function h(a){return a.pageTemplateRegionId?k('[data-cms-page-template-region-id="'+a.pageTemplateRegionId+'"]'):a.versionBlockId?k('[data-cms-version-block-id="'+a.versionBlockId+'"]'):m()}function i(){return f.get(b[0].contentWindow.location.href)}function k(a){var c=b[0].contentDocument.querySelector(a),d=c.cloneNode(!0),e=d.querySelector(".cofoundry-sv__hover-block");return d.className+=" cofoundry-sv__region-loading",e&&(e.className=e.className.replace("cofoundry-sv__hover-block","")),c.parentNode.replaceChild(d,c),i().then(function(c){var e=n(c.data);r.isBlockOver=!1,r.isRegionOver=!1;var f=e.querySelector(a);f&&(d.parentNode.replaceChild(f,d),j(f,q)),o(b,"pageContentReloaded",{})})}function m(){return b[0].contentWindow.location.reload(),l=e.defer(),l.promise}function n(a){var b=document.createElement("div");return b.innerHTML=a,b}function o(a,b,c){var d=a[0].contentWindow;d.CMS&&d.CMS.events.trigger(b,c)}var p,q=this,r=a.$new(),s=c("<cms-page-region></cms-page-region>");r.siteFrameEl=b,r.refreshContent=h,p=s(r),d.find("body").eq(0).append(p),q.showRegion=g(function(a){r.isRegionOver&&a==r.regionAnchorElement||(r.isRegionOver=!0,r.regionAnchorElement=a)}),q.hideRegion=g(function(){r.isRegionOver=!1}),q.showBlock=g(function(a){r.isBlockOver&&a==r.blockAnchorElement||(r.isBlockOver=!0,r.blockAnchorElement=a)}),q.hideBlock=g(function(){r.isBlockOver=!1})}return{restrict:"A",link:h};var l}]),angular.module("cms.visualEditor").controller("VisualEditorController",["$window","$scope","_","shared.LoadState","shared.entityVersionModalDialogService","shared.modalDialogService","shared.localStorage","visualEditor.pageBlockService","visualEditor.modulePath","shared.urlLibrary","visualEditor.options",function(a,b,c,d,e,f,g,h,i,j,k){function l(){var b=a.addEventListener?"addEventListener":"attachEvent",c=window[b],d="attachEvent"===b?"onmessage":"message";c(d,m),D.globalLoadState=E,D.config=n,D.publish=o,D.unpublish=p,D.copyToDraft=q,D.addRegionBlock=r,D.addBlock=s,D.addBlockAbove=s,D.addBlockBelow=s,D.editBlock=t,D.moveBlockUp=u,D.moveBlockDown=u,D.deleteBlock=v}function m(a){a.data.action&&D[a.data.action]&&D[a.data.action].apply(this,a.data.args)}function n(){C={entityNameSingular:k.entityNameSingular,isCustomEntity:k.isCustomEntityRoute}}function o(a){e.publish(a.entityId,A,C).then(x)["catch"](B)}function p(a){e.unpublish(a.entityId,A,C).then(y)["catch"](B)}function q(a){e.copyToDraft(a.entityId,a.versionId,a.hasDraftVersion,A,C).then(z)["catch"](B)}function r(a){function b(){E.off()}f.show({templateUrl:i+"Routes/Modals/AddBlock.html",controller:"AddBlockController",options:{insertMode:a.insertMode,pageTemplateRegionId:a.pageTemplateRegionId,adjacentVersionBlockId:a.versionBlockId,permittedBlockTypes:a.permittedBlockTypes,onClose:b,refreshContent:w,isCustomEntity:a.isCustomEntity,regionName:a.regionName}})}function s(a){function b(){E.off()}E.isLoading||(E.on(),f.show({templateUrl:i+"Routes/Modals/AddBlock.html",controller:"AddBlockController",options:{pageTemplateRegionId:a.pageTemplateRegionId,adjacentVersionBlockId:a.versionBlockId,permittedBlockTypes:a.permittedBlockTypes,insertMode:a.insertMode,refreshContent:w,isCustomEntity:a.isCustomEntity,onClose:b}}))}function t(a){function b(){E.off()}E.isLoading||(E.on(),f.show({templateUrl:i+"Routes/Modals/EditBlock.html",controller:"EditBlockController",options:{versionBlockId:a.versionBlockId,pageBlockTypeId:a.pageBlockTypeId,isCustomEntity:a.isCustomEntity,refreshContent:w,onClose:b}}))}function u(a){var b=a.isUp?h.moveUp:h.moveDown;E.isLoading||(E.on(),b(a.isCustomEntity,a.versionBlockId).then(w)["finally"](E.off))}function v(a){function b(){return h.remove(d,a.versionBlockId).then(w)["finally"](E.off)}function c(){E.off()}var d=a.isCustomEntity,e={title:"Delete Block",message:"Are you sure you want to delete this content block?",okButtonTitle:"Yes, delete it",onOk:b,onCancel:c};E.isLoading||(E.on(),f.confirm(e))}function w(){y()}function x(){var b=a.parent.location.href;b.indexOf("mode=edit")>-1&&(b=b.replace("mode=edit","mode=preview")),a.parent.location=b}function y(){a.parent.location=a.parent.location}function z(){var b=a.parent.location.href;b=b.replace(/(.+\?(?:.+&|))(version=\d+&?)(.*)/i,"$1$3"),a.parent.location=b}function A(a){D.globalLoadState.on()}function B(a){D.globalLoadState.off()}var C,D=this,E=(a.document,new d);l()}]),angular.module("cms.visualEditor").controller("AddBlockController",["$scope","$q","_","shared.LoadState","visualEditor.pageBlockService","visualEditor.options","options","close",function(a,b,c,d,e,f,g,h){function i(){g.anchorElement;a.command={dataModel:{},pageTemplateRegionId:g.pageTemplateRegionId,pageVersionId:f.pageVerisonId,adjacentVersionBlockId:g.adjacentVersionBlockId,insertMode:g.insertMode||"Last"},a.submitLoadState=new d,a.formLoadState=new d(!0),a.save=k,a.close=l,a.selectBlockType=o,a.selectBlockTypeAndNext=p,a.isBlockTypeSelected=q,a.setStep=m,j()}function j(){function b(b){a.title=g.regionName,g.permittedBlockTypes.length?a.blockTypes=c.filter(b,function(a){return c.contains(g.permittedBlockTypes,a.fileName)}):a.blockTypes=b,1===a.blockTypes.length?(a.command.pageBlockTypeId=a.blockTypes[0].pageBlockTypeId,m(2)):a.allowStep1=!0,a.formLoadState.off()}m(1),e.getAllBlockTypes().then(b)}function k(){a.submitLoadState.on(),e.add(g.isCustomEntity,a.command).then(g.refreshContent).then(l)["finally"](a.submitLoadState.off)}function l(){h(),g.onClose()}function m(b){a.currentStep=b,2===b&&n()}function n(){function b(b){a.formDataSource={modelMetaData:b,model:a.command.dataModel},a.templates=b.templates,a.formLoadState.off()}a.formLoadState.on(),e.getBlockTypeSchema(a.command.pageBlockTypeId).then(b)}function o(b){a.command.pageBlockTypeId=b&&b.pageBlockTypeId}function p(a){o(a),m(2)}function q(b){return b&&b.pageBlockTypeId===a.command.pageBlockTypeId}i()}]),angular.module("cms.visualEditor").controller("EditBlockController",["$scope","$q","_","shared.LoadState","visualEditor.pageBlockService","visualEditor.options","options","close",function(a,b,c,d,e,f,g,h){function i(){g.anchorElement;a.command={dataModel:{}},a.submitLoadState=new d,a.formLoadState=new d(!0),a.save=k,a.close=l,j()}function j(){function c(b){a.templates=b.templates,j.modelMetaData=b}function d(b){a.command=b,j.model=b.dataModel}function f(){a.formDataSource=j,a.formLoadState.off()}var h,i,j={};a.formLoadState.on(),h=e.getBlockTypeSchema(g.pageBlockTypeId).then(c),i=e.getPageVersionBlockById(g.isCustomEntity,g.versionBlockId).then(d);b.all([h,i]).then(f)}function k(){a.submitLoadState.on(),e.update(g.isCustomEntity,g.versionBlockId,a.command).then(g.refreshContent).then(l)["finally"](a.submitLoadState.off)}function l(){h(),g.onClose()}i()}]);