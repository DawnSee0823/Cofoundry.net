﻿angular.module("cms.pages", ["ngRoute", "cms.shared"]).constant("_", window._).constant("pages.modulePath", "/admin/modules/pages/js/"); angular.module("cms.pages").config(["$routeProvider", "shared.routingUtilities", "pages.modulePath", function (n, t, i) { var r = t.mapOptions.bind(null, i); n.when("/directories", r("WebDirectoryList")).when("/directories/new", r("AddWebDirectory")).when("/directories/:id", r("WebDirectoryDetails")).when("/new", r("AddPage")).when("/:id", r("PageDetails")).otherwise(r("PageList")) }]); angular.module("cms.pages").controller("AddPageController", ["_", "$q", "$location", "$window", "shared.LoadState", "shared.stringUtilities", "shared.urlLibrary", "shared.pageService", "pages.pageTemplateService", "pages.customEntityService", function (n, t, i, r, u, f, e, o, s, h) { function w() { c.save = l.bind(null, !1, y); c.saveAndPublish = l.bind(null, !0, y); c.saveAndEdit = l.bind(null, !1, b); c.cancel = d; c.onNameChanged = k; c.onPageTypeChanged = p; c.globalLoadState = new u; c.saveLoadState = new u; c.saveAndPublishLoadState = new u; c.formLoadState = new u(!0); c.onLocalesLoaded = a.resolve; c.onWebDirectoriesLoaded = v.resolve; g() } function l(n, t) { var i; n ? (c.command.publish = !0, i = c.saveAndPublishLoadState) : i = c.saveLoadState; nt(i); o.add(c.command).then(t).finally(tt.bind(null, i)) } function y(n) { i.path("/" + n) } function b(n) { function t(n) { r.location.href = e.pageVisualEditor(n.pageRoute, !0) } return o.getById(n).then(t) } function k() { c.command.urlPath = f.slugify(c.command.title) } function p() { var t = c.command.pageType, i = t == "CustomEntityDetails" ? t : "Generic"; c.pageTemplates = n.where(c.allPageTemplates, { pageType: i }) } function d() { i.path("/") } function g() { c.pageTypes = o.getPageTypes(); c.command = { showInSiteMap: !0, pageType: c.pageTypes[0].value }; var n = s.getAll().then(function (n) { c.allPageTemplates = n }), t = h.getAllRoutingRules().then(function (n) { c.routingRules = n }); c.formLoadState.offWhen(a, v, n, t).then(p) } function nt(t) { c.globalLoadState.on(); t && n.isFunction(t.on) && t.on() } function tt(t) { c.globalLoadState.off(); t && n.isFunction(t.off) && t.off() } var c = this, a = t.defer(), v = t.defer(); w() }]); angular.module("cms.pages").controller("PageDetailsController", ["$routeParams", "$q", "$location", "_", "shared.LoadState", "shared.modalDialogService", "shared.entityVersionModalDialogService", "shared.urlLibrary", "shared.pageService", "pages.modulePath", function (n, t, i, r, u, f, e, o, s, h) { function k() { c.edit = g; c.save = y.bind(null, !1); c.saveAndPublish = y.bind(null, !0); c.cancel = nt; c.publish = tt; c.unpublish = it; c.discardDraft = rt; c.copyToDraft = ut; c.deletePage = ft; c.duplicatePage = et; c.changeUrl = ot; c.getPartialUrl = d; c.editMode = !1; c.globalLoadState = new u; c.saveLoadState = new u; c.saveAndPublishLoadState = new u; c.formLoadState = new u(!0); c.urlLibrary = o; p(c.formLoadState) } function d(n) { return h + "routes/partials/" + n + ".html" } function g() { c.editMode = !0; c.mainForm.formStatus.clear() } function y(n) { var t; n ? (c.updateDraftCommand.publish = !0, t = c.saveAndPublishLoadState) : t = c.saveLoadState; a(t); s.update(c.updatePageCommand).then(s.updateDraft.bind(this, c.updateDraftCommand)).then(l.bind(null, "Changes were saved successfully")).finally(v.bind(null, t)) } function nt() { c.editMode = !1; c.updatePageCommand = w(c.page); c.updateDraftCommand = b(c.page); c.mainForm.formStatus.clear() } function tt() { e.publish(c.page.pageId, a).then(l.bind(null, "Page published successfully.")).catch(v) } function it() { e.unpublish(c.page.pageId, a).then(l.bind(null, "The page has been unpublished and reverted to draft state.")).catch(v) } function rt() { function t() { return a(), s.removeDraft(c.page.pageId) } var n = { title: "Discard Version", message: "Are you sure you want to discard this draft? This will discard all changes since the page was last published.", okButtonTitle: "Yes, discard it", onOk: t }; f.confirm(n).then(l.bind(null, "Draft discarded successfully")) } function ut(n) { function i() { l("Draft created successfully.") } var t = !!st(); e.copyToDraft(c.page.pageId, n.pageVersionId, t, a).then(i).catch(v) } function ft() { function t() { return a(), s.remove(c.page.pageId).then(ht).catch(v) } var n = { title: "Delete Page", message: "Are you sure you want to delete this page?", okButtonTitle: "Yes, delete it", onOk: t }; f.confirm(n) } function et() { f.show({ templateUrl: h + "routes/modals/duplicatepage.html", controller: "DuplicatePageController", options: { page: c.page } }) } function ot() { f.show({ templateUrl: h + "routes/modals/changepageurl.html", controller: "ChangePageUrlController", options: { page: c.page, onSave: l.bind(null, "Url Changed") } }) } function l(n, t) { return p(t).then(c.mainForm.formStatus.success.bind(null, n)) } function st() { return r.find(c.versions, function (n) { return n.workFlowStatus === "Draft" }) } function p(i) { function r() { return s.getById(n.id).then(function (n) { c.page = n; c.updatePageCommand = w(n); c.updateDraftCommand = b(n); c.editMode = !1 }) } function u() { return s.getVersionsByPageId(n.id).then(function (n) { c.versions = n }) } return t.all([r(), u()]).then(v.bind(null, i)) } function w(n) { return { pageId: n.pageId, tags: n.tags } } function b(n) { var t = n.latestVersion, i = t.openGraph; return { pageId: n.pageId, title: t.title, metaDescription: t.metaDescription, openGraphTitle: i.title, openGraphDescription: i.description, openGraphImageId: i.image ? i.image.ImageAssetId : undefined, showInSiteMap: t.showInSiteMap } } function ht() { i.path("") } function a(n) { c.globalLoadState.on(); n && r.isFunction(n.on) && n.on() } function v(n) { c.globalLoadState.off(); n && r.isFunction(n.off) && n.off() } var c = this; k() }]); angular.module("cms.pages").controller("PageListController", ["_", "shared.entityVersionModalDialogService", "shared.LoadState", "shared.SearchQuery", "shared.pageService", "pages.pageTemplateService", function (n, t, i, r, u, f) { function h() { a(); e.gridLoadState = new i; e.globalLoadState = new i; e.query = new r({ onChanged: l }); e.filter = e.query.getFilters(); e.toggleFilter = o; o(!1); e.publish = c; s() } function o(t) { e.isFilterVisible = n.isUndefined(t) ? !e.isFilterVisible : t } function c(n) { t.publish(n, e.globalLoadState.on).then(s).catch(e.globalLoadState.off) } function l() { o(!1); s() } function a() { e.workFlowStatus = [{ name: "Draft" }, { name: "Published" }]; f.getAll().then(function (n) { e.pageTemplates = n }) } function s() { return e.gridLoadState.on(), u.getAll(e.query.getParameters()).then(function (n) { e.result = n; e.gridLoadState.off() }) } var e = this; h() }]); angular.module("cms.pages").controller("ChangePageUrlController", ["$scope", "$q", "$location", "shared.LoadState", "shared.pageService", "pages.customEntityService", "options", "close", function (n, t, i, r, u, f, e, o) { function c() { l(); n.submitLoadState = new r; n.formLoadState = new r(!0); n.save = v; n.close = o; n.localesLoaded = s.resolve; n.webDirectoriesLoaded = h.resolve; n.formLoadState.offWhen(s, h, a()) } function l() { var i = e.page, t = i.pageRoute; n.isCustomEntityRoute = t.pageType === "CustomEntityDetails"; n.page = i; n.command = { pageId: i.pageId, localeId: t.locale ? t.locale.localeId : undefined, webDirectoryId: t.webDirectory.webDirectoryId }; n.isCustomEntityRoute ? n.command.customEntityRoutingRule = t.urlPath : n.command.urlPath = t.urlPath } function a() { if (n.isCustomEntityRoute) return f.getAllRoutingRules().then(function (t) { n.routingRules = t }); var i = t.defer(); return i.resolve(), i } function v() { n.submitLoadState.on(); u.updateUrl(n.command).then(e.onSave).then(o).finally(n.submitLoadState.off) } var s = t.defer(), h = t.defer(); c() }]); angular.module("cms.pages").controller("DuplicatePageController", ["$scope", "$q", "$location", "shared.LoadState", "shared.pageService", "pages.customEntityService", "options", "close", function (n, t, i, r, u, f, e, o) { function c() { l(); n.submitLoadState = new r; n.formLoadState = new r(!0); n.save = v; n.close = o; n.localesLoaded = s.resolve; n.webDirectoriesLoaded = h.resolve; n.formLoadState.offWhen(s, h, a()) } function l() { var i = e.page, t = i.pageRoute; n.isCustomEntityRoute = t.pageType === "CustomEntityDetails"; n.page = i; n.command = { pageToDuplicateId: i.pageId, localeId: t.locale ? t.locale.localeId : undefined, webDirectoryId: t.webDirectory.webDirectoryId, title: "Copy of " + i.latestVersion.title }; n.isCustomEntityRoute ? n.command.customEntityRoutingRule = t.urlPath : n.command.urlPath = t.urlPath + "-copy" } function a() { if (n.isCustomEntityRoute) return f.getAllRoutingRules().then(function (t) { n.routingRules = t }); var i = t.defer(); return i.resolve(), i } function v() { n.submitLoadState.on(); u.duplicate(n.command).then(y).then(o).finally(n.submitLoadState.off) } function y(n) { i.path("/" + n) } var s = t.defer(), h = t.defer(); c() }]); angular.module("cms.pages").factory("pages.customEntityService", ["$http", "shared.serviceBase", function (n, t) { var i = {}; return i.getAllRoutingRules = function () { return n.get(t + "custom-entity-routing-rules/") }, i }]); angular.module("cms.pages").factory("pages.directoryService", ["$http", "_", "shared.serviceBase", function (n, t, i) { var r = {}, u = i + "webdirectories"; return r.getAll = function () { return n.get(u) }, r }]); angular.module("cms.pages").factory("pages.pageTemplateService", ["$http", "$q", "shared.serviceBase", function (n, t, i) { var r = {}, u = i + "page-templates"; return r.getAll = function () { var i = t.defer(); return n.get(u).then(function (n) { i.resolve(n.items) }, i.reject), i.promise }, r }])