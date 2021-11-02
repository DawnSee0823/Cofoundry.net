angular.module('cms.pages').run(['$templateCache',function(t){t.put('/Admin/Modules/Pages/Js/Routes/AddPage.html','<cms-page-header cms-title="Create"                 cms-parent-title="Pages"></cms-page-header><cms-form cms-name="mainForm"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <cms-page-actions>        <cms-button-submit cms-text="Save Draft"                           cms-loading="vm.saveLoadState.isLoading"                           ng-disabled="vm.mainForm.$invalid"></cms-button-submit>        <cms-button cms-text="Save &amp; Publish"                    cms-loading="vm.saveAndPublishLoadState.isLoading"                    ng-disabled="vm.mainForm.$invalid"                    ng-click="vm.saveAndPublish()"></cms-button>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"></cms-button>    </cms-page-actions>    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--MAIN-->        <cms-form-section cms-title="Main">            <cms-form-field-dropdown cms-title="Page Type"                                     cms-options="vm.pageTypes"                                     cms-option-name="name"                                     cms-option-value="value"                                     cms-model="vm.command.pageType"                                     cms-change="vm.onPageTypeChanged()"                                     cms-description="Usually this will be \'Generic\' but other page types can be used for special functions"                                     required>            </cms-form-field-dropdown>            <cms-form-field-text cms-title="Title"                                 cms-model="vm.command.title"                                 cms-description="A few words descriptive page title, e.g. \'About the team\'. Google SERP typically shows 50-60 characters"                                 required                                 cms-change="vm.onNameChanged()"                                 maxlength="300"></cms-form-field-text>            <cms-form-field-dropdown cms-title="Page Template"                                     cms-options="vm.pageTemplates"                                     cms-option-name="name"                                     cms-option-value="pageTemplateId"                                     cms-model="vm.command.pageTemplateId"                                     required></cms-form-field-dropdown>            <cms-form-field-tags cms-title="CMS Tags"                                 cms-model="vm.command.tags"></cms-form-field-tags>        </cms-form-section>        <!--Page URL-->        <cms-form-section cms-title="Page url">            <cms-form-field-locale-selector cms-model="vm.command.localeId"                                            cms-on-loaded="vm.onLocalesLoaded()"></cms-form-field-locale-selector>            <cms-form-field-directory-selector cms-model="vm.command.pageDirectoryId"                                                   cms-on-loaded="vm.onPageDirectoriesLoaded()"                                                   required></cms-form-field-directory-selector>            <cms-form-field-text cms-title="Page Path"                                 cms-model="vm.command.urlPath"                                 ng-if="vm.command.pageType !== \'CustomEntityDetails\'"                                 description="Lower case and containing only letter, numbers, underscores and hyphens. E.g. \'about-the-team\'"                                 maxlength="70"></cms-form-field-text>            <cms-form-field-dropdown cms-title="Route Format"                                     cms-options="vm.routingRules"                                     cms-option-name="routeFormat"                                     cms-option-value="routeFormat"                                     cms-model="vm.command.customEntityRoutingRule"                                     ng-if="vm.command.pageType === \'CustomEntityDetails\'"                                     required></cms-form-field-dropdown>        </cms-form-section>        <!--META DATA-->        <cms-form-section cms-title="SEO">            <cms-form-field-text-area cms-title="Meta Description"                                      cms-model="vm.command.metaDescription"                                      maxlength="300"                                      cms-description="Ideally 25-250 characters. The Google SERP shows only the first 150 characters"></cms-form-field-text-area>            <cms-form-field-text cms-title="OpenGraph Title"                                 cms-model="vm.command.openGraphTitle"                                 maxlength="300"                                 cms-description="Optional. The title that shows up when sharing the page on social media"></cms-form-field-text>            <cms-form-field-text cms-title="OpenGraph Description"                                 cms-model="vm.command.openGraphDescription"                                 cms-description="Optional. The description that shows up when sharing the page on social media"></cms-form-field-text>            <cms-form-field-image-asset cms-title="OpenGraph Image"                                        cms-load-state="vm.saveLoadState"                                        cms-asset="vm.openGraphImage"                                        cms-model="vm.command.openGraphImageId"                                        cms-val-min-width="200"                                        cms-val-min-height="200"                                        cms-description="Optional. An image to show up when sharing the page on social media"></cms-form-field-image-asset>            <cms-form-field-checkbox cms-title="Show in sitemap"                                     cms-model="vm.command.showInSiteMap"                                     cms-description="Indicates whether this page should be included in the site map file used by search engine robots"></cms-form-field-checkbox>        </cms-form-section>        <cms-form-section cms-title="Template Content"                          ng-if="vm.command.pageType !== \'CustomEntityDetails\'">            <cms-form-section-actions>                <cms-button cms-text="Save Draft & Edit Content"                            cms-loading="vm.saveLoadState.isLoading"                            ng-disabled="vm.mainForm.$invalid"                            ng-click="vm.saveAndEdit()"></cms-button>            </cms-form-section-actions>            <cms-form-field-container>                <div>                    Template content can only be managed after the page                    has been created.                </div>            </cms-form-field-container>        </cms-form-section>    </cms-page-body></cms-form>');
t.put('/Admin/Modules/Pages/Js/Routes/PageDetails.html','<cms-page-header cms-title="{{vm.page.pageRoute.fullPath}}"                 cms-parent-title="Pages"></cms-page-header><cms-form cms-name="mainForm"          cms-edit-mode="vm.editMode"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <!-- Default toolbar -->    <cms-page-actions ng-show="!vm.editMode">        <cms-button cms-text="Edit"                    ng-if="::vm.canUpdate"                    ng-click="vm.edit()"                    ng-show="!vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading" class="main-cta"></cms-button>        <cms-button-link cms-text="Browse to page"                         cms-icon="eye-open"                         cms-href="{{vm.page.pageRoute.fullPath}}"                         ng-if="vm.page.pageRoute.pageType == \'Generic\'"></cms-button-link>        <cms-button cms-text="Publish"                    ng-click="vm.publish()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"                    ng-if="(!vm.isMarkedPublished || vm.page.pageRoute.hasDraftVersion) && vm.canPublishPage"></cms-button>        <cms-button cms-text="Unpublish"                    ng-click="vm.unpublish()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"                    ng-if="vm.isMarkedPublished && vm.canPublishPage"></cms-button>        <cms-button cms-text="Change Url"                    ng-if="::vm.canUpdatePageUrl"                    ng-click="vm.changeUrl()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Access Rules"                    ng-if="::vm.accessRulesEnabled"                    ng-click="vm.viewAccessRules()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Duplicate"                    ng-if="::vm.canCreate"                    ng-click="vm.duplicatePage()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Delete"                    ng-if="::vm.canDelete"                    ng-click="vm.deletePage()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Edit mode toolbar -->    <cms-page-actions ng-show="vm.editMode">        <cms-button-submit cms-text="Save Draft"                           cms-loading="vm.saveLoadState.isLoading"                           ng-show="vm.editMode"                           ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"></cms-button-submit>        <cms-button cms-text="Save &amp; Publish"                    cms-loading="vm.saveAndPublishLoadState.isLoading"                    ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"                    ng-click="vm.saveAndPublish()"></cms-button>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"                    ng-show="vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Scrollable content area -->    <cms-page-body cms-content-type="form">        <!-- UI feedback -->        <cms-form-status></cms-form-status>        <!-- Main -->        <cms-form-section cms-title="Main">            <cms-form-field-text cms-title="Title"                                 cms-model="vm.updateDraftCommand.title"                                 cms-description="A few words descriptive page title, e.g. \'About the team\'. Google SERP typically shows 50-60 characters"                                 required                                 maxlength="300"></cms-form-field-text>            <cms-form-field-readonly cms-title="Market"                                     cms-model="vm.page.pageRoute.locale.ietfLanguageTag"></cms-form-field-readonly>            <cms-form-field-container cms-title="Url">                <a ng-href="{{vm.page.pageRoute.fullPath}}"                   ng-if="vm.page.pageRoute.pageType == \'Generic\'">{{vm.page.pageRoute.fullPath}}</a>                <span ng-if="vm.page.pageRoute.pageType != \'Generic\'">{{vm.page.pageRoute.fullPath}}</span>            </cms-form-field-container>            <cms-form-field-readonly cms-title="Published Status"                                     cms-model="vm.publishStatusLabel"></cms-form-field-readonly>            <cms-form-field-container cms-title="Publish Date">                <span ng-if="vm.page.pageRoute.publishDate">{{vm.page.pageRoute.publishDate | date:\'fullDate\'}} at {{vm.page.pageRoute.publishDate | date:\'HH:mm:ss\'}}</span>                <span ng-if="!vm.page.pageRoute.publishDate">Not set</span>            </cms-form-field-container>            <cms-form-field-tags cms-title="CMS Tags"                                 cms-model="vm.updatePageCommand.tags"></cms-form-field-tags>        </cms-form-section>        <!-- Meta data -->        <cms-form-section cms-title="SEO">            <cms-form-field-text-area cms-title="Meta Description"                                      cms-model="vm.updateDraftCommand.metaDescription"                                      cms-description="Ideally 25-250 characters. The Google SERP shows only the first 150 characters"                                      rows="3"                                      maxlength="300"></cms-form-field-text-area>            <cms-form-field-text cms-title="OpenGraph Title"                                 cms-model="vm.updateDraftCommand.openGraphTitle"                                 maxlength="300"                                 cms-description="Optional. The title that shows up when sharing the page on social media"></cms-form-field-text>            <cms-form-field-text-area cms-title="OpenGraph Description"                                      cms-model="vm.updateDraftCommand.openGraphDescription"                                      cms-description="Optional. The description that shows up when sharing the page on social media"                                      rows="3"></cms-form-field-text-area>            <cms-form-field-image-asset cms-title="OpenGraph Image"                                        cms-load-state="vm.saveLoadState"                                        cms-asset="vm.page.latestVersion.openGraph.image"                                        cms-model="vm.updateDraftCommand.openGraphImageId"                                        cms-val-min-width="200"                                        cms-val-min-height="200"                                        cms-update-asset="true"                                        cms-description="Optional. An image to show up when sharing the page on social media"></cms-form-field-image-asset>            <cms-form-field-checkbox cms-title="Show in sitemap"                                     cms-model="vm.updateDraftCommand.showInSiteMap"                                     cms-description="Indicates whether this page should be included in the site map file used by search engine robots"></cms-form-field-checkbox>        </cms-form-section>        <cms-form-section cms-title="Template Content">            <cms-form-section-actions>                <cms-button-link cms-text="Manage in Visual Editor"                    ng-if="vm.canUpdate && vm.page.latestVersion.regions.length && vm.page.pageRoute.pageType == \'Generic\'"                    cms-icon="eye-open"                    ng-show="!vm.editMode"                    cms-href="{{vm.urlLibrary.visualEditorForPage(vm.page.pageRoute, true)}}"></cms-button-link>            </cms-form-section-actions>            <div class="form-section-message" ng-if="!vm.page.latestVersion.regions.length">                <p>This template has no managed content</p>            </div>            <div class="form-section-message" ng-if="vm.page.latestVersion.regions.length > 0 && vm.editMode">                <p>Page content is edited in the visual editor.</p>            </div>            <cms-form-field-container>                <cms-table-container ng-if="vm.page.latestVersion.regions.length > 0">                    <table>                        <tbody ng-repeat="region in vm.page.latestVersion.regions">                            <tr>                                <th colspan="2">                                    <cms-table-group-heading>Region: {{region.name}}</cms-table-group-heading>                                </th>                            </tr>                            <tr ng-if="!region.blocks.length">                                <td colspan="2">No content</td>                            </tr>                            <tr ng-repeat="block in region.blocks">                                <td>{{block.blockType.name}}</td>                                <!--<td>{{block.blockType.description}}</td>-->                                <td class="row-type" style="width:30px; text-align:center;">                                    <!--TODO: Action-->                                </td>                            </tr>                        </tbody>                    </table>                </cms-table-container>            </cms-form-field-container>    </cms-form-section>        <!-- Page versions -->        <cms-form-section cms-title="Versions">            <cms-form-field-container>                <cms-table-container cms-loading="vm.versionsLoadState.isLoading">                <table>                    <thead>                        <tr>                            <th>Version</th>                            <th>Created</th>                            <th cms-table-column-actions ng-show="!vm.editMode">Actions</th>                        </tr>                    </thead>                    <tbody>                        <tr ng-repeat="version in vm.versions.items">                            <td>                                {{::version.versionLabel}}                            </td>                            <td class="lowPriority">                                <cms-table-cell-created-audit-data cms-audit-data="version.auditData"></cms-table-cell-created-audit-data>                            </td>                            <td cms-table-column-actions ng-show="!vm.editMode">                                <span ng-if="version.workFlowStatus == \'Draft\'">                                    <span ng-if="vm.versions.items.length > 1 && vm.canUpdate">                                        <a href=""                                           class="btn-icon"                                           title="Discard draft"                                           ng-click="vm.loading || vm.discardDraft()">                                            <i class="fa fa-trash-o"></i>                                        </a>                                    </span>                                    <a href=""                                       class="btn-icon"                                       title="Publish"                                       ng-if="vm.canPublishPage"                                       ng-click="vm.loading || vm.publish(vm.pageId)">                                        <i class="fa fa-cloud-upload"></i>                                    </a>                                </span>                                <span ng-if="version.isLatestPublishedVersion">                                    <a href=""                                       class="btn-icon"                                       title="Un-publish"                                       ng-if="vm.isMarkedPublished && vm.canPublishPage"                                       ng-click="vm.loading || vm.unpublish()">                                        <i class="fa fa-cloud-download"></i>                                    </a>                                </span>                                <span ng-if="!version.isLatestPublishedVersion && version.workFlowStatus == \'Published\'">                                    <a href=""                                       class="btn-icon"                                       title="Copy to draft"                                       ng-if="vm.canUpdate"                                       ng-click="vm.loading || vm.copyToDraft(version)">                                        <i class="fa fa-files-o"></i>                                    </a>                                </span>                                <a href="{{version.browseUrl}}"                                   class="btn-icon"                                   target="_blank"                                   title="Browse to page: {{::version.versionLabel}}"                                   ng-if="vm.page.pageRoute.pageType == \'Generic\'">                                    <i class="fa fa-external-link"></i>                                </a>                            </td>                        </tr>                    </tbody>                </table>                </cms-table-container>                                <cms-pager cms-result="vm.versions"                            cms-query="vm.versionsQuery"></cms-pager>            </cms-form-field-container>        </cms-form-section>        <!-- Audit data -->        <cms-form-section-audit-data cms-audit-data="vm.page.auditData"></cms-form-section-audit-data></cms-page-body></cms-form>');
t.put('/Admin/Modules/Pages/Js/Routes/PageList.html','<!--HEADER--><cms-page-header cms-title="Pages"></cms-page-header><cms-page-sub-header>    <cms-page-header-buttons>        <a class="btn-icon" cms-text="Filter"                    ng-click="vm.toggleFilter()">            <i class="fa fa-search"></i>        </a>        <!--FILTER-->        <cms-search-filter cms-query="vm.query"                           cms-filter="vm.filter"                           ng-show="vm.isFilterVisible">            <cms-form-field-text cms-title="Tags"                                 cms-model="vm.filter.tags"></cms-form-field-text>            <cms-form-field-locale-selector cms-model="vm.filter.localeId"                                            cms-default-item-text="Any"></cms-form-field-locale-selector>            <cms-form-field-directory-selector cms-model="vm.filter.pageDirectoryId"                                                   cms-default-item-text="Any"></cms-form-field-directory-selector>            <cms-form-field-dropdown cms-title="Publish Status"                                     cms-options="vm.publishStatus"                                     cms-option-name="name"                                     cms-option-value="name"                                     cms-default-item-text="Any"                                     cms-model="vm.filter.publishStatus"></cms-form-field-dropdown>            <cms-form-field-dropdown cms-title="Template"                                     cms-options="vm.pageTemplates"                                     cms-option-name="name"                                     cms-option-value="pageTemplateId"                                     cms-default-item-text="Any"                                     cms-model="vm.filter.pageTemplateId"></cms-form-field-dropdown>        </cms-search-filter>    </cms-page-header-buttons></cms-page-sub-header><cms-page-actions>    <cms-button-link class="main-cta"                      cms-text="Create"                     cms-icon="plus"                     cms-href="#/new"                     ng-if="::vm.canCreate"></cms-button-link>    <!--RESULTS-->    <cms-pager cms-result="vm.result"               cms-query="vm.query"></cms-pager></cms-page-actions><cms-page-body cms-content-type="form">    <cms-table-container cms-loading="vm.gridLoadState.isLoading">        <table>            <thead>                <tr>                    <th>Page</th>                    <!--<th>Market</th>-->                    <!--<th>Tags</th>-->                    <th>Status</th>                    <th>Published</th>                    <th>Created</th>                    <th cms-table-column-actions>Actions</th>                </tr>            </thead>            <tbody>                <tr ng-if="!vm.result.items.length">                    <td colspan="100" class="empty">Sorry, no pages could be found.</td>                </tr>                <tr ng-repeat="page in vm.result.items">                    <td>                        <a href="#/{{::page.pageId }}">{{::page.fullPath }}</a><br>                        <span>{{::page.title}}</span>                    </td>                    <!--<td>                    <span ng-if="page.locale">{{ page.locale.name }} ({{ page.locale.ietfLanguageTag}})</span>                </td>-->                    <!--<td>                    <cms-tag-list cms-tags="page.tags"></cms-tag-list>                </td>-->                    <td>                        <span>{{::page.getPublishStatusLabel()}}</span>                        <br />                        <a href="{{::page.fullPath }}" ng-if="::page.hasDraftVersion && page.pageType == \'Generic\'">(Pending Draft)</a>                        <span ng-if="::page.hasDraftVersion && page.pageType != \'Generic\'">(Pending Draft)</span>                    </td>                    <td>                        <span ng-if="::page.publishDate"                              title="{{::page.publishDate | date:\'fullDate\'}} at {{::page.publishDate | date:\'HH:mm:ss\'}}">{{::page.publishDate | date : \'mediumDate\' }} {{::page.publishDate | date : \'HH:mm\' }}</span>                    </td>                    <td class="lowPriority">                        <cms-table-cell-created-audit-data cms-audit-data="page.auditData"></cms-table-cell-created-audit-data>                    </td>                    <td cms-table-column-actions>                        <!--<cms-button-icon cms-icon="pencil"                         cms-href="#/{{::page.pageId }}"                         cms-title="Edit"></cms-button-icon>-->                                                <a href=""                           ng-if="::!page.isPublished() || page.hasDraftVersion"                           ng-click="vm.publish(page.pageId)"                           ng-disabled="vm.gridLoadState.isLoading" class="btn-icon" title="Publish">                            <i class="fa fa-globe"></i>                        </a>                        <a href="#/{{::page.pageId }}"                           class="btn-icon"                           title="Edit"                           ng-if="::vm.canUpdate">                            <i class="fa fa-pencil-square-o"></i>                        </a>                        <a href="{{::page.fullPath}}"                            class="btn-icon"                            title="Browse to page"                            target="_blank"                           ng-if="::page.pageType == \'Generic\'">                            <i class="fa fa-external-link"></i>                        </a>                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-page-body>');
t.put('/Admin/Modules/Pages/Js/Routes/Modals/AddPageAccessRule.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Add Access Rule    </cms-modal-dialog-header>    <cms-form cms-name="mainForm" ng-submit="onAdd()">        <cms-page-actions>            <cms-button cms-text="Add" ng-click="onAdd()" class="main-cta" ng-disabled="mainForm.$invalid || saveLoadState.isLoading"></cms-button>            <cms-button cms-text="Cancel" ng-click="onCancel()"></cms-button>        </cms-page-actions>        <cms-page-body cms-content-type="form">            <cms-form-status></cms-form-status>            <cms-form-section cms-title="Permit Access To">                <cms-form-field-dropdown cms-title="User Area"                    cms-options="userAreas"                    cms-option-name="name"                    cms-option-value="userAreaCode"                    cms-model="command.userAreaCode"                    cms-description="The user area to restrict access to."                    cms-change="onUserAreaChanged()"                    required></cms-form-field-dropdown>                <cms-form-field-filtered-dropdown cms-title="Role"                        cms-search-function="searchRoles($query)"                        cms-option-name="title"                        cms-option-value="roleId"                        cms-model="command.roleId"                        cms-description="Optionally you can restrict access to a specific role within the user area."                        ></cms-form-field-dropdown>            </cms-form-section>        </cms-page-body>    </cms-form></cms-modal-dialog-container>');
t.put('/Admin/Modules/Pages/Js/Routes/Modals/ChangePageUrl.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Change Url: {{::page.latestVersion.title}}    </cms-modal-dialog-header>    <cms-form cms-name="updateUrlForm"               cms-loading="formLoadState.isLoading">        <cms-page-actions>            <cms-button-submit cms-text="Save"                               ng-click="save()"                               ng-disabled="updateUrlForm.$invalid || submitLoadState.isLoading"                               cms-loading="submitLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel"                        ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-form-status></cms-form-status>            <cms-warning-message ng-if="page.pageRoute.isPublished">                WARNING: This page has been published. Changing the url will                break external links to this page (e.g. via Google search)            </cms-warning-message>            <cms-form-section cms-title="Settings">                <cms-form-field-locale-selector cms-model="command.localeId"                                                cms-on-loaded="localesLoaded()"></cms-form-field-locale-selector>                <cms-form-field-directory-selector cms-model="command.pageDirectoryId"                                                       cms-on-loaded="pageDirectoriesLoaded()"></cms-form-field-directory-selector>                <cms-form-field-text cms-title="Url path"                                     cms-model="command.urlPath"                                     cms-description="Lower case and containing only letter, numbers and hyphens. E.g. \'about-the-team\'."                                     ng-if="::!isCustomEntityRoute"                                     maxlength="70"></cms-form-field-text>                <cms-form-field-dropdown cms-title="Route Format"                                         cms-options="routingRules"                                         cms-option-name="routeFormat"                                         cms-option-value="routeFormat"                                         cms-model="command.customEntityRoutingRule"                                         ng-if="::isCustomEntityRoute"                                         required></cms-form-field-dropdown>            </cms-form-section>        </cms-page-body>    </cms-form></cms-modal-dialog-container>');
t.put('/Admin/Modules/Pages/Js/Routes/Modals/DuplicatePage.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Duplicate Page: {{::page.latestVersion.title}}    </cms-modal-dialog-header>    <cms-form cms-name="duplicatePageForm"               cms-loading="formLoadState.isLoading">        <cms-page-actions>            <cms-button-submit cms-text="Create duplicate"                               ng-click="save()"                               ng-disabled="duplicatePageForm.$invalid || submitLoadState.isLoading"                               cms-loading="submitLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel"                        ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-form-status></cms-form-status>            <cms-form-section cms-title="Settings">                <cms-form-field-text cms-title="Title"                                     cms-model="command.title"                                     cms-description="A few words descriptive page title, e.g. \'About the team\'."                                     cms-change="onTitleChanged()"                                     maxlength="70"                                     required></cms-form-field-text>                <cms-form-field-locale-selector cms-model="command.localeId"                                                cms-on-loaded="localesLoaded()"></cms-form-field-locale-selector>                <cms-form-field-directory-selector cms-model="command.pageDirectoryId"                                                   cms-on-loaded="pageDirectoriesLoaded()"></cms-form-field-directory-selector>                <cms-form-field-text cms-title="Url path"                                     cms-model="command.urlPath"                                     cms-description="Lower case and containing only letter, numbers and hyphens. E.g. \'about-the-team\'."                                     maxlength="70"                                     ng-if="::!isCustomEntityRoute"                                     required></cms-form-field-text>                <cms-form-field-dropdown cms-title="Route Format"                                         cms-options="routingRules"                                         cms-option-name="routeFormat"                                         cms-option-value="routeFormat"                                         cms-model="command.customEntityRoutingRule"                                         ng-if="::isCustomEntityRoute"                                         required></cms-form-field-dropdown>            </cms-form-section>        </cms-page-body>    </cms-form></cms-modal-dialog-container>');
t.put('/Admin/Modules/Pages/Js/Routes/Modals/PageAccessRuleList.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Access Rules: {{::page.latestVersion.title}}    </cms-modal-dialog-header>    <cms-form cms-name="mainForm"        cms-edit-mode="editMode"        ng-submit="save()"        cms-loading="formLoadState.isLoading">        <cms-page-actions ng-show="!editMode">            <cms-button cms-text="Ok"                ng-click="close()"                ng-disabled="globalLoadState.isLoading" class="main-cta"></cms-button>        </cms-page-actions>        <!-- Edit mode toolbar -->        <cms-page-actions ng-show="editMode">            <cms-button-submit cms-text="Save"                cms-loading="saveLoadState.isLoading"                ng-disabled="mainForm.$invalid || globalLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel"                ng-click="close()"                ng-disabled="globalLoadState.isLoading"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-form-status></cms-form-status>            <cms-form-section cms-title="Inherited Rules">                <cms-form-field-container cms-loading="formLoadState.isLoading">                    <cms-table-container>                        <table>                            <thead>                                <tr>                                    <th>Directory</th>                                    <th>User Area</th>                                    <th>Role</th>                                    <th>Violation Action</th>                                </tr>                            </thead>                            <tbody>                                <tr ng-if="accessInfo.inheritedAccessRules.length == 0">                                    <td colspan="100" class="empty">No rules inherited from parent directories.</td>                                </tr>                                <tr ng-repeat="rule in accessInfo.inheritedAccessRules">                                    <td>(inherited from X?)</td>                                    <td>{{rule.userArea.name}}</td>                                    <td>{{rule.role.title}}</td>                                    <td>{{rule.violationAction}}</td>                                </tr>                            </tbody>                        </table>                    </cms-table-container>                </cms-form-field-container>            </cms-form-section>            <cms-form-section cms-title="Access Rules">                <cms-form-field-container cms-loading="formLoadState.isLoading">                    <cms-table-container>                        <table>                            <thead>                                <tr>                                    <th>User Area</th>                                    <th>Role</th>                                    <th cms-table-column-actions                                        ng-if="canManage">Actions</th>                                </tr>                            </thead>                            <tbody>                                <tr ng-if="accessInfo.accessRules.length == 0">                                    <td colspan="100" class="empty">No rules found.</td>                                </tr>                                <tr ng-repeat="rule in accessInfo.accessRules">                                    <td>{{rule.userArea.name}}</td>                                    <td>{{rule.role.title}}</td>                                    <td cms-table-column-actions                                        ng-if="canManage">                                        <cms-button-icon cms-title="Delete"                                            cms-icon="trash-o"                                            ng-click="deleteRule(rule, $index)"                                            ng-disabled="globalLoadState.isLoading">                                        </cms-button-icon>                                    </td>                                </tr>                            </tbody>                        </table>                        <cms-table-actions>                            <a href="" class="btn-icon" title="Add"                                cms-icon="plus-circle"                                ng-click="add()"                                ng-if="canManage"                                ng-disabled="globalLoadState.isLoading">                                <i class="fa fa-plus-circle"></i>                            </a>                        </cms-table-actions>                    </cms-table-container>                </cms-form-field-container>            </cms-form-section>            <cms-form-section cms-title="Actions">                <cms-form-field-checkbox cms-title="Redirect to login"                    cms-model="command.redirectoToLogin"                    cms-description="Selecting this option will redirect the user to the login page if they are not logged in. If they are logged in but not authorized to view the page then the default action will be triggered."                ></cms-form-field-checkbox>                <cms-form-field-dropdown cms-title="Redirect to login for area:"                    cms-options="userAreasInRules"                    cms-option-name="name"                    cms-option-value="userAreaCode"                    cms-model="command.userAreaCodeForLoginRedirect"                    cms-description="If the user is not logged in, then they will be redirected to the login page for the selected user area."                    ng-if="command.redirectoToLogin && userAreasInRules.length > 1"                    required></cms-form-field-dropdown>                <cms-form-field-dropdown cms-title="Default Action"                    cms-options="violationActions"                    cms-option-name="name"                    cms-option-value="id"                    cms-model="command.violationAction"                    cms-description="The action to take when the a user is not authorized to view the page. Using a n \'Error\' action tells the user that the page was found but could not be accessed, whereas a \'Not Found\' action will make the page appear not to exist for unauthorized users."                    required></cms-form-field-dropdown>            </cms-form-section>        </cms-page-body></cms-modal-dialog-container>');}]);