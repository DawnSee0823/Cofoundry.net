angular.module('cms.pages').run(['$templateCache',function(t){t.put('/Admin/Modules/Pages/Js/Routes/AddPage.html','<cms-page-header cms-title="Create"                 cms-parent-title="Pages"></cms-page-header><cms-form cms-name="mainForm"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <cms-page-actions>        <cms-button-submit cms-text="Save Draft"                           cms-loading="vm.saveLoadState.isLoading"                           ng-disabled="vm.mainForm.$invalid"></cms-button-submit>        <cms-button cms-text="Save &amp; Publish"                    cms-loading="vm.saveAndPublishLoadState.isLoading"                    ng-disabled="vm.mainForm.$invalid"                    ng-click="vm.saveAndPublish()"></cms-button>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"></cms-button>    </cms-page-actions>    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--MAIN-->        <cms-form-section cms-title="Main">            <cms-form-field-dropdown cms-title="Page Type"                                     cms-options="vm.pageTypes"                                     cms-option-name="name"                                     cms-option-value="value"                                     cms-model="vm.command.pageType"                                     cms-change="vm.onPageTypeChanged()"                                     cms-description="Usually this will be \'Generic\' but other page types can be used for special functions"                                     required>            </cms-form-field-dropdown>            <cms-form-field-text cms-title="Title"                                 cms-model="vm.command.title"                                 cms-description="A few words descriptive page title, e.g. \'About the team\'. Google SERP typically shows 50-60 characters"                                 required                                 cms-change="vm.onNameChanged()"                                 maxlength="300"></cms-form-field-text>            <cms-form-field-dropdown cms-title="Page Template"                                     cms-options="vm.pageTemplates"                                     cms-option-name="name"                                     cms-option-value="pageTemplateId"                                     cms-model="vm.command.pageTemplateId"                                     required></cms-form-field-dropdown>            <cms-form-field-tags cms-title="CMS Tags"                                 cms-model="vm.command.tags"></cms-form-field-tags>        </cms-form-section>        <!--Page URL-->        <cms-form-section cms-title="Page url">            <cms-form-field-locale-selector cms-model="vm.command.localeId"                                            cms-on-loaded="vm.onLocalesLoaded()"></cms-form-field-locale-selector>            <cms-form-field-directory-selector cms-model="vm.command.webDirectoryId"                                                   cms-on-loaded="vm.onWebDirectoriesLoaded()"                                                   required></cms-form-field-directory-selector>            <cms-form-field-text cms-title="Page Path"                                 cms-model="vm.command.urlPath"                                 ng-if="vm.command.pageType !== \'CustomEntityDetails\'"                                 description="Lower case and containing only letter, numbers, underscores and hyphens. E.g. \'about-the-team\'"                                 maxlength="70"></cms-form-field-text>            <cms-form-field-dropdown cms-title="Route Format"                                     cms-options="vm.routingRules"                                     cms-option-name="routeFormat"                                     cms-option-value="routeFormat"                                     cms-model="vm.command.customEntityRoutingRule"                                     ng-if="vm.command.pageType === \'CustomEntityDetails\'"                                     required></cms-form-field-dropdown>        </cms-form-section>        <!--META DATA-->        <cms-form-section cms-title="SEO">            <cms-form-field-text-area cms-title="Meta Description"                                      cms-model="vm.command.metaDescription"                                      maxlength="300"                                      cms-description="Ideally 25-250 characters. The Google SERP shows only the first 150 characters"></cms-form-field-text-area>            <cms-form-field-text cms-title="OpenGraph Title"                                 cms-model="vm.command.openGraphTitle"                                 maxlength="300"                                 cms-description="Optional. The title that shows up when sharing the page on social media"></cms-form-field-text>            <cms-form-field-text cms-title="OpenGraph Description"                                 cms-model="vm.command.openGraphDescription"                                 cms-description="Optional. The description that shows up when sharing the page on social media"></cms-form-field-text>            <cms-form-field-image-asset cms-title="OpenGraph Image"                                        cms-load-state="vm.saveLoadState"                                        cms-asset="vm.openGraphImage"                                        cms-model="vm.command.openGraphImageId"                                        cms-val-min-width="200"                                        cms-val-min-height="200"                                        cms-description="Optional. An image to show up when sharing the page on social media"></cms-form-field-image-asset>            <cms-form-field-checkbox cms-title="Show in sitemap"                                     cms-model="vm.command.showInSiteMap"                                     cms-description="Indicates whether this page should be included in the site map file used by search engine robots"></cms-form-field-checkbox>        </cms-form-section>        <cms-form-section cms-title="Template Content"                          ng-if="vm.command.pageType !== \'CustomEntityDetails\'">            <cms-form-section-actions>                <cms-button cms-text="Save Draft & Edit Content"                            cms-loading="vm.saveLoadState.isLoading"                            ng-disabled="vm.mainForm.$invalid"                            ng-click="vm.saveAndEdit()"></cms-button>            </cms-form-section-actions>            <cms-form-field-container>                <div>                    Template content can only be managed after the page                    has been created.                </div>            </cms-form-field-container>        </cms-form-section>    </cms-page-body></cms-form>');
t.put('/Admin/Modules/Pages/Js/Routes/PageDetails.html','<cms-page-header cms-title="{{vm.page.pageRoute.fullPath}}"                 cms-parent-title="Pages"></cms-page-header><cms-form cms-name="mainForm"          cms-edit-mode="vm.editMode"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <!-- Default toolbar -->    <cms-page-actions ng-show="!vm.editMode">        <cms-button cms-text="Edit"                    ng-click="vm.edit()"                    ng-show="!vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading" class="main-cta"></cms-button>        <cms-button-link cms-text="Browse to page"                         cms-icon="eye-open"                         cms-href="{{vm.page.pageRoute.fullPath}}"></cms-button-link>        <cms-button cms-text="Publish"                    ng-click="vm.publish()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"                    ng-if="vm.page.pageRoute.hasDraft"></cms-button>        <cms-button cms-text="Unpublish"                    ng-click="vm.unpublish()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"                    ng-if="vm.page.pageRoute.isPublished"></cms-button>        <cms-button cms-text="Change Url"                    ng-click="vm.changeUrl()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Duplicate"                    ng-click="vm.duplicatePage()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Delete"                    ng-click="vm.deletePage()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Edit mode toolbar -->    <cms-page-actions ng-show="vm.editMode">        <cms-button-submit cms-text="Save Draft"                           cms-loading="vm.saveLoadState.isLoading"                           ng-show="vm.editMode"                           ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"></cms-button-submit>        <cms-button cms-text="Save &amp; Publish"                    cms-loading="vm.saveAndPublishLoadState.isLoading"                    ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"                    ng-click="vm.saveAndPublish()"></cms-button>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"                    ng-show="vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Scrollable content area -->    <cms-page-body cms-sub-header="with-header"                    cms-content-type="form">        <!-- UI feedback -->        <cms-form-status></cms-form-status>        <!-- Main -->        <cms-form-section cms-title="Main">            <cms-form-field-text cms-title="Title"                                 cms-model="vm.updateDraftCommand.title"                                 cms-description="A few words descriptive page title, e.g. \'About the team\'. Google SERP typically shows 50-60 characters"                                 required                                 maxlength="300"></cms-form-field-text>            <cms-form-field-readonly cms-title="Market"                                     cms-model="vm.page.pageRoute.locale.ietfLanguageTag"></cms-form-field-readonly>            <cms-form-field-container cms-title="Url">                <a ng-href="{{vm.page.pageRoute.fullPath}}">{{vm.page.pageRoute.fullPath}}</a>            </cms-form-field-container>            <cms-form-field-checkbox cms-title="Is Published"                                     cms-model="vm.page.pageRoute.isPublished"                                     disabled></cms-form-field-checkbox>            <cms-form-field-tags cms-title="CMS Tags"                                 cms-model="vm.updatePageCommand.tags"></cms-form-field-tags>        </cms-form-section>        <!-- Meta data -->        <cms-form-section cms-title="SEO">            <cms-form-field-text-area cms-title="Meta Description"                                      cms-model="vm.updateDraftCommand.metaDescription"                                      cms-description="Ideally 25-250 characters. The Google SERP shows only the first 150 characters"                                      rows="3"                                      maxlength="300"></cms-form-field-text-area>            <cms-form-field-text cms-title="OpenGraph Title"                                 cms-model="vm.updateDraftCommand.openGraphTitle"                                 maxlength="300"                                 cms-description="Optional. The title that shows up when sharing the page on social media"></cms-form-field-text>            <cms-form-field-text-area cms-title="OpenGraph Description"                                      cms-model="vm.updateDraftCommand.openGraphDescription"                                      cms-description="Optional. The description that shows up when sharing the page on social media"                                      rows="3"></cms-form-field-text-area>            <cms-form-field-image-asset cms-title="OpenGraph Image"                                        cms-load-state="vm.saveLoadState"                                        cms-asset="vm.page.latestVersion.openGraph.image"                                        cms-model="vm.updateDraftCommand.openGraphImageId"                                        cms-val-min-width="200"                                        cms-val-min-height="200"                                        cms-update-asset="true"                                        cms-description="Optional. An image to show up when sharing the page on social media"></cms-form-field-image-asset>            <cms-form-field-checkbox cms-title="Show in sitemap"                                     cms-model="vm.updateDraftCommand.showInSiteMap"                                     cms-description="Indicates whether this page should be included in the site map file used by search engine robots"></cms-form-field-checkbox>        </cms-form-section>        <cms-form-section cms-title="Template Content">            <cms-form-section-actions>                <cms-button-link cms-text="Manage in Visual Editor"                    cms-icon="eye-open"                    ng-show="!vm.editMode"                    cms-href="{{vm.urlLibrary.pageVisualEditor(vm.page.pageRoute, true)}}"></cms-button-link>            </cms-form-section-actions>            <div class="form-section-message" ng-if="!vm.page.latestVersion.sections.length">                <p>This template has no managed content</p>            </div>            <div class="form-section-message" ng-if="vm.page.latestVersion.sections.length > 0 && vm.editMode">                <p>Page content is edited in the visual editor.</p>            </div>            <cms-form-field-container>                <cms-table-container ng-if="vm.page.latestVersion.sections.length > 0">                    <table>                        <tbody ng-repeat="section in vm.page.latestVersion.sections">                            <tr>                                <th colspan="2">                                    <cms-table-group-heading>Section: {{section.name}}</cms-table-group-heading>                                </th>                            </tr>                            <tr ng-if="!section.modules.length">                                <td colspan="2">No content</td>                            </tr>                            <tr ng-repeat="module in section.modules">                                <td>{{module.moduleType.name}}</td>                                <!--<td>{{module.moduleType.description}}</td>-->                                <td class="row-type" style="width:30px; text-align:center;">                                    <!--TODO: Action-->                                </td>                            </tr>                        </tbody>                    </table>                </cms-table-container>        </cms-form-field-container></cms-form-section>        <!-- Page versions -->        <cms-form-section cms-title="Versions">            <cms-form-field-container>                <ng-include src="::vm.getPartialUrl(\'PageVersionList\')"></ng-include>            </cms-form-field-container>        </cms-form-section>        <!-- Audit data -->        <cms-form-section-audit-data cms-audit-data="vm.page.auditData"></cms-form-section-audit-data></cms-page-body></cms-form>');
t.put('/Admin/Modules/Pages/Js/Routes/PageList.html','<!--HEADER--><cms-page-header cms-title="Pages"></cms-page-header><cms-page-sub-header>    <cms-page-header-buttons>        <a class="btn-icon" cms-text="Filter"                    ng-click="vm.toggleFilter()">            <i class="fa fa-search"></i>        </a>        <!--FILTER-->        <cms-search-filter cms-query="vm.query"                           cms-filter="vm.filter"                           ng-show="vm.isFilterVisible">            <cms-form-field-text cms-title="Tags"                                 cms-model="vm.filter.tags"></cms-form-field-text>            <cms-form-field-locale-selector cms-model="vm.filter.localeId"                                            cms-default-item-text="Any"></cms-form-field-locale-selector>            <cms-form-field-directory-selector cms-model="vm.filter.webDirectoryId"                                                   cms-default-item-text="Any"></cms-form-field-directory-selector>            <cms-form-field-dropdown cms-title="Workflow Status"                                     cms-options="vm.workFlowStatus"                                     cms-option-name="name"                                     cms-option-value="name"                                     cms-default-item-text="Any"                                     cms-model="vm.filter.workFlowStatus"></cms-form-field-dropdown>            <cms-form-field-dropdown cms-title="Template"                                     cms-options="vm.pageTemplates"                                     cms-option-name="name"                                     cms-option-value="pageTemplateId"                                     cms-default-item-text="Any"                                     cms-model="vm.filter.pageTemplateId"></cms-form-field-dropdown>        </cms-search-filter>    </cms-page-header-buttons></cms-page-sub-header><cms-page-actions>    <cms-button-link class="main-cta"                      cms-text="Create"                     cms-icon="plus"                     cms-href="#/new"></cms-button-link>    <!--RESULTS-->    <cms-pager cms-result="vm.result"               cms-query="vm.query"></cms-pager></cms-page-actions><cms-page-body cms-sub-header="with-header"               cms-content-type="form">    <cms-table-container cms-loading="vm.gridLoadState.isLoading">        <table>            <thead>                <tr>                    <th>Page</th>                    <!--<th>Market</th>-->                    <!--<th>Tags</th>-->                    <th>Status</th>                    <th>Created</th>                    <th cms-table-column-actions>Actions</th>                </tr>            </thead>            <tbody>                <tr ng-if="!vm.result.items.length">                    <td colspan="100" class="empty">Sorry, no pages could be found.</td>                </tr>                <tr ng-repeat="page in vm.result.items">                    <td>                        <a href="#/{{ page.pageId }}">{{ page.fullPath }}</a> ({{page.title}})                    </td>                    <!--<td>                    <span ng-if="page.locale">{{ page.locale.name }} ({{ page.locale.ietfLanguageTag}})</span>                </td>-->                    <!--<td>                    <cms-tag-list cms-tags="page.tags"></cms-tag-list>                </td>-->                    <td ng-if="page.isPublished">                        Published                        <br />                        <a href="{{ page.fullPath }}" ng-if="page.isPublished && page.hasDraft">(Pending Draft)</a>                    </td>                    <td ng-if="!page.isPublished">                        Draft                    </td>                    <td class="lowPriority">                        <cms-table-cell-created-audit-data cms-audit-data="page.auditData"></cms-table-cell-created-audit-data>                    </td>                    <td cms-table-column-actions>                        <!--<cms-button-icon cms-icon="pencil"                         cms-href="#/{{ page.pageId }}"                         cms-title="Edit"></cms-button-icon>-->                        <a href="#/{{ page.pageId }}" class="btn-icon" title="Edit">                            <i class="fa fa-pencil-square-o"></i>                        </a>                        <a href="{{page.fullPath}}" class="btn-icon" title="Browse to page" target="_blank">                            <i class="fa fa-external-link"></i>                        </a>                        <a href=""                           ng-if="!page.isPublished"                           ng-click="vm.publish(page.pageId)"                           ng-disabled="vm.globalLoadState.isLoading" class="btn-icon" title="Publish">                            <i class="fa fa-globe"></i>                        </a>                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-page-body>');
t.put('/Admin/Modules/Pages/Js/Routes/Modals/ChangePageUrl.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Change Url: {{::page.latestVersion.title}}    </cms-modal-dialog-header>    <cms-form cms-name="updateUrlForm"               cms-loading="formLoadState.isLoading">        <cms-page-actions>            <cms-button-submit cms-text="Save"                               ng-click="save()"                               ng-disabled="updateUrlForm.$invalid || submitLoadState.isLoading"                               cms-loading="submitLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel"                        ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-form-status></cms-form-status>            <cms-warning-message ng-if="page.pageRoute.isPublished">                WARNING: This page has been published. Changing the url will                break external links to this page (e.g. via Google search)            </cms-warning-message>            <cms-form-section cms-title="Settings">                <cms-form-field-locale-selector cms-model="command.localeId"                                                cms-on-loaded="localesLoaded()"></cms-form-field-locale-selector>                <cms-form-field-directory-selector cms-model="command.webDirectoryId"                                                       cms-on-loaded="webDirectoriesLoaded()"></cms-form-field-directory-selector>                <cms-form-field-text cms-title="Url path"                                     cms-model="command.urlPath"                                     cms-description="Lower case and containing only letter, numbers and hyphens. E.g. \'about-the-team\'."                                     ng-if="::!isCustomEntityRoute"                                     maxlength="70"></cms-form-field-text>                <cms-form-field-dropdown cms-title="Route Format"                                         cms-options="routingRules"                                         cms-option-name="routeFormat"                                         cms-option-value="routeFormat"                                         cms-model="command.customEntityRoutingRule"                                         ng-if="::isCustomEntityRoute"                                         required></cms-form-field-dropdown>            </cms-form-section>        </cms-page-body>    </cms-form></cms-modal-dialog-container>');
t.put('/Admin/Modules/Pages/Js/Routes/Modals/DuplicatePage.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Duplicate Page {{::page.latestVersion.title}}    </cms-modal-dialog-header>    <cms-form cms-name="duplicatePageForm"               cms-loading="formLoadState.isLoading">        <cms-page-actions>            <cms-button-submit cms-text="Create duplicate"                               ng-click="save()"                               ng-disabled="duplicatePageForm.$invalid || submitLoadState.isLoading"                               cms-loading="submitLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel"                        ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-form-status></cms-form-status>            <cms-form-section cms-title="Settings">                <cms-form-field-text cms-title="Title"                                     cms-model="command.title"                                     cms-description="A few words descriptive page title, e.g. \'About the team\'."                                     maxlength="70"                                     required></cms-form-field-text>                <cms-form-field-locale-selector cms-model="command.localeId"                                                cms-on-loaded="localesLoaded()"></cms-form-field-locale-selector>                <cms-form-field-directory-selector cms-model="command.webDirectoryId"                                                   cms-on-loaded="webDirectoriesLoaded()"></cms-form-field-directory-selector>                <cms-form-field-text cms-title="Url path"                                     cms-model="command.urlPath"                                     cms-description="Lower case and containing only letter, numbers and hyphens. E.g. \'about-the-team\'."                                     maxlength="70"                                     ng-if="::!isCustomEntityRoute"                                     required></cms-form-field-text>                <cms-form-field-dropdown cms-title="Route Format"                                         cms-options="routingRules"                                         cms-option-name="routeFormat"                                         cms-option-value="routeFormat"                                         cms-model="command.customEntityRoutingRule"                                         ng-if="::isCustomEntityRoute"                                         required></cms-form-field-dropdown>            </cms-form-section>        </cms-page-body>    </cms-form></cms-modal-dialog-container>');
t.put('/Admin/Modules/Pages/Js/Routes/Partials/PageVersionList.html','<cms-table-container>    <table>        <thead>            <tr>                <th>Version</th>                <th>Status</th>                <th>Created</th>                <th cms-table-column-actions ng-show="!vm.editMode">Actions</th>            </tr>        </thead>        <tbody>            <tr ng-repeat="version in vm.versions">                <td>                    {{version.pageVersionId}}                </td>                <td>                    {{ version.workFlowStatus }}                </td>                <td class="lowPriority">                    <cms-table-cell-created-audit-data cms-audit-data="version.auditData"></cms-table-cell-created-audit-data>                </td>                <td cms-table-column-actions ng-switch="version.workFlowStatus" ng-show="!vm.editMode">                    <div ng-switch-when="Draft">                        <span ng-if="vm.versions.length > 1">                            <a href="" ng-click="vm.loading || vm.discardDraft()" class="btn-icon" title="Discard draft">                                <i class="fa fa-trash-o"></i>                            </a>                        </span>                        <a href="" ng-click="vm.loading || vm.publish(vm.pageId)" class="btn-icon" title="Publish">                            <i class="fa fa-cloud-upload"></i>                        </a>                        <a href="{{vm.page.pageRoute.fullPath}}?mode=draft" class="btn-icon" target="_blank" title="Browse to page (draft)">                            <i class="fa fa-external-link"></i>                        </a>                    </div>                    <div ng-switch-when="Published">                        <a href="" ng-click="vm.loading || vm.unpublish()" class="btn-icon" title="Un-publish">                            <i class="fa fa-cloud-download"></i>                        </a>                        <a href="{{vm.page.pageRoute.fullPath}}?mode=live" class="btn-icon" target="_blank" title="Browse to page (live)">                            <i class="fa fa-external-link"></i>                        </a>                    </div>                    <div ng-switch-default>                        <a href="" ng-click="vm.loading || vm.copyToDraft(version)" class="btn-icon" title="Copy to draft">                            <i class="fa fa-files-o"></i>                        </a>                        <a href="{{vm.page.pageRoute.fullPath}}?version={{version.pageVersionId}}" class="btn-icon" target="_blank" title="Browse to page (version: {{version.pageVersionId}})">                            <i class="fa fa-external-link"></i>                        </a>                    </div>                </td>            </tr>        </tbody>    </table></cms-table-container>');}]);