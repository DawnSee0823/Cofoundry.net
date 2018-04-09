angular.module('cms.customEntities').run(['$templateCache',function(t){t.put('/Admin/Modules/CustomEntities/Js/Routes/AddCustomEntity.html','<cms-page-header cms-title="Create"                 cms-parent-title="{{::vm.options.name}}"></cms-page-header><cms-form cms-name="mainForm"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <cms-page-actions>        <cms-button class="main-cta"                    cms-text="{{::vm.saveButtonText}}"                    cms-loading="vm.saveAndPublishLoadState.isLoading"                    ng-disabled="vm.mainForm.$invalid"                    ng-click="vm.saveAndPublish()"></cms-button>        <cms-button-submit cms-text="Save Draft"                           cms-loading="vm.saveLoadState.isLoading"                           ng-if="::!vm.options.autoPublish"                           ng-disabled="vm.mainForm.$invalid"></cms-button-submit>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"></cms-button>    </cms-page-actions>    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--Main-->        <cms-form-section cms-title="Main">            <cms-form-field-locale-selector cms-model="vm.command.localeId"                                            cms-on-loaded="vm.onLocalesLoaded()"                                             ng-if="::vm.options.hasLocale"></cms-form-field-locale-selector>            <cms-form-field-text cms-title="{{::vm.options.terms[\'title\']}}"                                 cms-model="vm.command.title"                                 cms-change="vm.onNameChanged()"                                 required                                 maxlength="200"></cms-form-field-text>            <cms-form-field-text cms-title="{{::vm.options.terms[\'urlSlug\']}}"                                 cms-model="vm.command.urlSlug"                                 description="Lower case and containing only letter, numbers, underscores and hyphens. E.g. \'rock-and-roll\'"                                 ng-if="::!vm.options.autoGenerateUrlSlug"                                 required                                 maxlength="200"></cms-form-field-text>        </cms-form-section>        <!--DYNAMIC DATA-->        <cms-form-section cms-title="Properties" ng-if="vm.formDataSource.modelMetaData.dataModelProperties">            <cms-form-dynamic-field-set cms-data-source="vm.formDataSource"                                        cms-additional-parameters="vm.additionalParameters">            </cms-form-dynamic-field-set>        </cms-form-section>        <!-- DETAILS PAGES -->        <div ng-repeat="pageRoute in vm.pageRoutes">            <cms-form-section cms-title="Template: {{pageRoute.title}}"                              ng-if="vm.command.pageType !== \'CustomEntityDetails\'">                <cms-form-section-actions>                    <cms-button cms-text="{{::vm.saveAndEditButtonText}}"                                cms-loading="vm.saveLoadState.isLoading"                                ng-disabled="vm.mainForm.$invalid"                                ng-click="vm.saveAndEdit(pageRoute)"></cms-button>                </cms-form-section-actions>                <cms-form-field-container>                    <div>                        Template content can only be managed after the {{::vm.options.nameSingular}}                        has been created.                    </div>                </cms-form-field-container>            </cms-form-section>        </div>    </cms-page-body></cms-form>');
t.put('/Admin/Modules/CustomEntities/Js/Routes/CustomEntityDetails.html','<cms-page-header cms-title="{{vm.customEntity.latestVersion.title}}"                 cms-parent-title="{{::vm.options.name}}"></cms-page-header><cms-form cms-name="mainForm"          cms-edit-mode="vm.editMode"          cms-loading="vm.formLoadState.isLoading"          ng-submit="vm.save()">    <!-- Default toolbar -->    <cms-page-actions ng-show="!vm.editMode">        <cms-button class="main-cta"                    cms-text="Edit"                    ng-click="vm.edit()"                    ng-disabled="vm.globalLoadState.isLoading"                    ng-if="::vm.canUpdate"></cms-button>        <cms-button-link cms-text="Browse to page"                         cms-icon="eye-open"                         cms-href="{{vm.customEntity.fullPath}}"                         ng-if="vm.customEntity.fullPath"></cms-button-link>        <cms-button cms-text="Publish"                    ng-click="vm.publish()"                    ng-disabled="vm.globalLoadState.isLoading"                    ng-if="!vm.options.autoPublish && (!vm.isMarkedPublished || vm.customEntity.hasDraft) && vm.canPublish"></cms-button>        <cms-button cms-text="Unpublish"                    ng-click="vm.unpublish()"                    ng-disabled="vm.globalLoadState.isLoading"                    ng-if="!vm.options.autoPublish && vm.isMarkedPublished && vm.canPublish"></cms-button>        <cms-button cms-text="Change Url"                    ng-click="vm.changeUrl()"                    ng-disabled="vm.globalLoadState.isLoading"                    ng-if="vm.canChangeUrl && vm.canUpdateUrl"></cms-button>        <cms-button cms-text="Delete"                    ng-click="vm.deleteCustomEntity()"                    ng-disabled="vm.globalLoadState.isLoading"                    ng-if="::vm.canDelete"></cms-button>    </cms-page-actions>    <!-- Edit mode toolbar -->    <cms-page-actions ng-show="vm.editMode">        <cms-button-submit class="main-cta"                           cms-text="Save Draft"                           cms-loading="vm.saveLoadState.isLoading"                           ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"                           ng-if="::!vm.options.autoPublish"></cms-button-submit>        <cms-button cms-text="{{::vm.saveButtonText}}"                    cms-loading="vm.saveAndPublishLoadState.isLoading"                    ng-click="vm.saveAndPublish()"                    ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"                    ng-if="::vm.canPublish"></cms-button>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Scrollable content area -->    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--Main-->        <cms-form-section cms-title="Main">            <cms-form-field-text required                                 maxlength="200"                                 cms-title="{{::vm.options.terms[\'title\']}}"                                 cms-model="vm.updateCommand.title"></cms-form-field-text>            <cms-form-field-readonly cms-title="Market"                                     cms-model="vm.customEntity.locale.ietfLanguageTag"                                     ng-if="::vm.options.hasLocale"></cms-form-field-readonly>            <cms-form-field-container cms-title="Url" ng-if="vm.customEntity.fullPath">                <a ng-href="{{vm.customEntity.fullPath}}">{{vm.customEntity.fullPath}}</a>            </cms-form-field-container>            <cms-form-field-readonly cms-title="Published Status"                                     cms-model="vm.customEntity.publishStatus"                                     ng-if="!vm.options.autoPublish"></cms-form-field-readonly>            <cms-form-field-container cms-title="Publish Date"                                       ng-if="!vm.options.autoPublish">                <span ng-if="vm.customEntity.publishDate">{{vm.customEntity.publishDate | date:\'fullDate\'}} at {{vm.customEntity.publishDate | date:\'HH:mm:ss\'}}</span>                <span ng-if="!vm.customEntity.publishDate">Not set</span>            </cms-form-field-container>        </cms-form-section>        <!--DYNAMIC DATA-->        <cms-form-section cms-title="Properties" ng-if="vm.formDataSource.modelMetaData.dataModelProperties">            <cms-form-dynamic-field-set cms-data-source="vm.formDataSource"                                        cms-additional-parameters="vm.additionalParameters">            </cms-form-dynamic-field-set>        </cms-form-section>        <!-- DETAILS PAGES -->        <div ng-repeat="page in vm.customEntity.latestVersion.pages">            <cms-form-section cms-title="Template: {{page.pageRoute.title}}">                <cms-form-section-actions>                    <cms-button-link cms-text="Manage in Visual Editor"                                     ng-if="::vm.canUpdate"                                     cms-icon="eye-open"                                     ng-show="!vm.editMode"                                     cms-href="{{vm.urlLibrary.customEntityVisualEditor(page, true)}}"></cms-button-link>                </cms-form-section-actions>                <div class="form-section-message" ng-if="!page.regions.length">                    <p>This template has no managed content</p>                </div>                <div ng-if="page.regions.length > 0 && vm.editMode">                    <p>Page content is edited in the visual editor.</p>                </div>                <cms-form-field-container>                    <cms-table-container ng-if="page.regions.length > 0">                        <table>                            <tbody ng-repeat="region in page.regions">                                <tr>                                    <th colspan="2">                                        <cms-table-group-heading>Region: {{region.name}}</cms-table-group-heading>                                    </th>                                </tr>                                <tr ng-if="!region.blocks.length">                                    <td colspan="2">No content</td>                                </tr>                                <tr ng-repeat="block in region.blocks">                                    <td>{{block.blockType.name}}</td>                                    <!--<td>{{block.blockType.description}}</td>-->                                    <td class="row-type" style="width:30px; text-align:center;">                                        <!--TODO: Action-->                                    </td>                                </tr>                            </tbody>                        </table>                    </cms-table-container>                </cms-form-field-container>            </cms-form-section>        </div>        <!--VERSIONS-->        <cms-form-section cms-title="Versions"                          ng-if="!vm.options.autoPublish">            <cms-form-field-container>                <cms-table-container>                    <table>                        <thead>                            <tr>                                <th>Version</th>                                <th>Status</th>                                <th class="lowPriority">Created</th>                                <th cms-table-column-actions                                    ng-show="!vm.editMode">Actions</th>                            </tr>                        </thead>                        <tbody>                            <tr ng-repeat="version in vm.versions">                                <td>                                    {{::version.customEntityVersionId}}                                </td>                                <td>                                    {{::version.workFlowStatus}}                                </td>                                <td class="lowPriority">                                    <cms-table-cell-created-audit-data cms-audit-data="::version.auditData"></cms-table-cell-created-audit-data>                                </td>                                <td cms-table-column-actions ng-show="!vm.editMode">                                    <div ng-if="version.workFlowStatus == \'Draft\'">                                        <span ng-if="vm.versions.length > 1 && vm.canUpdate">                                            <a href=""                                               class="btn-icon"                                               title="Discard"                                               ng-click="vm.loading || vm.discardDraft()">                                                <i class="fa fa-trash-o"></i>                                            </a>                                        </span>                                        <a href=""                                           class="btn-icon"                                           title="Publish"                                           ng-if="::vm.canPublish"                                           ng-click="vm.loading || vm.publish(vm.customEntity.customEntityId)">                                            <i class="fa fa-cloud-upload"></i>                                        </a>                                        <a href="{{::vm.customEntity.fullPath}}?mode=draft"                                           ng-if="::vm.customEntity.fullPath"                                           class="btn-icon" title="Open">                                            <i class="fa fa-external-link"></i>                                        </a>                                    </div>                                    <div ng-if="version.isLatestPublishedVersion">                                        <a href=""                                           class="btn-icon"                                           title="Un-publish"                                           ng-if="vm.isMarkedPublished && vm.canPublish"                                           ng-click="vm.loading || vm.unpublish()">                                            <i class="fa fa-cloud-download"></i>                                        </a>                                        <a href="{{::vm.customEntity.fullPath}}?mode=live"                                           class="btn-icon"                                           title="Open"                                           ng-if="::vm.customEntity.fullPath">                                            <i class="fa fa-external-link"></i>                                        </a>                                    </div>                                    <div ng-if="!version.isLatestPublishedVersion && version.workFlowStatus == \'Published\'">                                        <a href=""                                           class="btn-icon"                                           title="Copy to draft"                                           ng-if="vm.canUpdate"                                           ng-click="vm.loading || vm.copyToDraft(version)">                                            <i class="fa fa-files-o"></i>                                        </a>                                        <a href="{{vm.customEntity.fullPath}}?version={{version.customEntityVersionId}}"                                           class="btn-icon"                                           title="Open"                                           ng-if="::vm.customEntity.fullPath">                                            <i class="fa fa-external-link"></i>                                        </a>                                    </div>                                </td>                            </tr>                        </tbody>                    </table>                </cms-table-container>            </cms-form-field-container>        </cms-form-section>        <!--AUDIT DATA-->        <cms-form-section-audit-data cms-audit-data="vm.customEntity.auditData"></cms-form-section-audit-data>    </cms-page-body></cms-form>');
t.put('/Admin/Modules/CustomEntities/Js/Routes/CustomEntityList.html','<!--HEADER--><cms-page-header cms-title="{{::vm.options.name}}"></cms-page-header><cms-page-sub-header>    <cms-page-header-buttons>        <a class="btn-icon" cms-text="Filter"           ng-click="vm.toggleFilter()">            <i class="fa fa-search"></i>        </a>        <!--FILTER-->        <cms-search-filter cms-query="vm.query"                           cms-filter="vm.filter"                           ng-show="vm.isFilterVisible">            <cms-form-field-text cms-title="Text"                                 cms-model="vm.filter.text"></cms-form-field-text>            <cms-form-field-locale-selector cms-model="vm.filter.localeId"                                            cms-default-item-text="Any"></cms-form-field-locale-selector>        </cms-search-filter>    </cms-page-header-buttons></cms-page-sub-header><!--ACTIONS--><cms-page-actions>    <cms-button-link class="main-cta"                     ng-if="::vm.canCreate"                     cms-text="Create"                     cms-icon="plus"                     cms-href="#/new"></cms-button-link>    <cms-button cms-text="Change Ordering"                ng-if="::vm.canUpdate"                ng-click="vm.changeOrdering()"                ng-hide="vm.options.ordering === \'None\'"></cms-button>    <cms-pager cms-result="vm.result"               cms-query="vm.query"></cms-pager></cms-page-actions><!--RESULTS--><cms-page-body cms-content-type="form"               cms-sub-header="with-header">    <cms-table-container cms-loading="vm.gridLoadState.isLoading">        <table>            <thead>                <tr>                    <th ng-if="vm.previewFields.fields.previewImage"></th>                    <th ng-if="vm.options.hasLocale">Market</th>                    <th>{{::vm.options.terms[\'title\']}}</th>                    <th ng-if="vm.previewFields.fields.previewDescription">{{vm.previewFields.fields.previewDescription.displayName}}</th>                    <th ng-if="::!vm.options.autoPublish">Status</th>                    <th ng-if="::!vm.options.autoPublish">Published</th>                    <th class="lowPriority">Created</th>                    <th cms-table-column-actions>Actions</th>                </tr>            </thead>            <tbody>                <tr ng-if="!vm.result.items.length">                    <td colspan="100" class="empty">Sorry, no {{::vm.options.name.toLowerCase()}} could be found.</td>                </tr>                <tr ng-repeat="entity in vm.result.items">                    <td ng-if="vm.previewFields.fields.previewImage">                        <cms-table-cell-image cms-image="vm.gridImages.images[$index]"></cms-table-cell-image>                    </td>                    <td ng-if="vm.options.hasLocale">                        <span ng-if="::entity.locale">{{ ::entity.locale.name }} ({{ ::entity.locale.ietfLanguageTag}})</span>                    </td>                    <td>                        <a href="#/{{::entity.customEntityId}}">{{::entity.title}}</a><br>                        <span ng-if="entity.fullPath">{{::entity.fullPath}}</span>                    </td>                    <td ng-if="vm.previewFields.fields.previewDescription">{{entity.model[vm.previewFields.fields.previewDescription.lowerName]}}</td>                    <td ng-if="::!vm.options.autoPublish">                        <span ng-if="entity.isPublished">Published</span>                        <span ng-if="!entity.isPublished && entity.publishStatus == \'Published\'">Scheduled</span>                        <span ng-if="entity.publishStatus == \'Unpublished\'">Unpublished</span>                        <br />                        <a href="{{ entity.fullPath }}" ng-if="entity.hasDraft">(Pending Draft)</a>                    </td>                    <td ng-if="::!vm.options.autoPublish">                        <span ng-if="::entity.publishDate"                              title="{{entity.publishDate | date:\'fullDate\'}} at {{entity.publishDate | date:\'HH:mm:ss\'}}">{{entity.publishDate | date : \'mediumDate\' }}{{entity.publishDate | date : \'HH:mm\' }}</span>                    </td>                    <td class="lowPriority">                        <cms-table-cell-created-audit-data cms-audit-data="::entity.auditData"></cms-table-cell-created-audit-data>                    </td>                    <td cms-table-column-actions>                        <a href="#/{{::entity.customEntityId}}"                           class="btn-icon"                           title="Edit"                           ng-if="::vm.canUpdate">                            <i class="fa fa-pencil-square-o"></i>                        </a>                        <a href="{{::entity.fullPath}}"                           class="btn-icon"                           title="View"                           target="_blank"                           ng-if="::entity.fullPath">                            <i class="fa fa-external-link"></i>                        </a>                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-page-body>');
t.put('/Admin/Modules/CustomEntities/Js/Routes/Modals/ChangeOrdering.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Update Ordering    </cms-modal-dialog-header>    <cms-form cms-name="step1Form"              cms-loading="formLoadState.isLoading"              ng-submit="setStep(2)"              ng-if="currentStep === 1">        <cms-page-actions>            <cms-button-submit cms-text="Next"></cms-button-submit>            <cms-button cms-text="Cancel" ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-form-section cms-title="Market">                <cms-form-status></cms-form-status>                <cms-form-field-locale-selector cms-model="command.localeId"                                                cms-on-loaded="onLocalesLoaded()"></cms-form-field-locale-selector>            </cms-form-section>        </cms-page-body>    </cms-form>    <cms-form cms-name="step2Form"              cms-loading="formLoadState.isLoading"              ng-submit="save()"              ng-if="currentStep === 2">        <cms-page-actions>            <cms-button cms-text="Previous" ng-click="setStep(1)"                        ng-if="allowStep1"                        ng-disabled="formLoadState.isLoading"></cms-button>            <cms-button-submit cms-text="Save"                               cms-loading="submitLoadState.isLoading"                               ng-disabled="formLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel" ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-warning-message ng-if="gridData.length >= 60">                WARNING: Ordering is only supported on the first 60 items.            </cms-warning-message>            <cms-table-container>                <table cms-loading="gridLoadState.isLoading">                    <thead>                        <tr>                            <th>{{::options.terms[\'title\']}}</th>                            <th>Status</th>                            <th cms-table-column-actions ng-if="isPartialOrdering">Actions</th>                        </tr>                    </thead>                    <tbody>                        <tr ng-if="!gridData.length">                            <td colspan="100" class="empty">None</td>                        </tr>                        <tr ng-repeat="entity in gridData track by $index"                            ui-draggable="true"                            data-drag="entity"                            data-drag-channel="custom-entity-{{vm.modelName}}"                            ui-on-drop="onDrop($index, $data)"                            data-drop-channel="custom-entity-{{vm.modelName}}">                            <td>                                <strong>                                    <cms-custom-entity-link cms-custom-entity-definition="options"                                                            cms-custom-entity="entity"></cms-custom-entity-link>                                </strong>                            </td>                            <td ng-if="entity.isPublished">                                Published                                <span ng-if="entity.isPublished && entity.hasDraft">(Pending Draft)</span>                            </td>                            <td ng-if="!entity.isPublished">                                Draft                            </td>                            <td cms-table-column-actions ng-if="isPartialOrdering">                                <cms-button-icon cms-title="Remove"                                                 cms-icon="trash-o"                                                 ng-click="remove(entity)">                                </cms-button-icon>                            </td>                        </tr>                    </tbody>                </table>                <cms-table-actions>                    <a href="" class="btn-icon" title="Add"                       cms-icon="plus-circle"                       ng-click="showPicker()"                       ng-if="isPartialOrdering"                       ng-disabled="submitLoadState.isLoading">                        <i class="fa fa-plus-circle"></i>                    </a>                </cms-table-actions>            </cms-table-container>        </cms-page-body>    </cms-form></cms-modal-dialog-container>');
t.put('/Admin/Modules/CustomEntities/Js/Routes/Modals/ChangeUrl.html','<cms-modal-dialog-container cms-modal-size="large">    <cms-modal-dialog-header>        Change Url: {{::customEntity.latestVersion.title}}    </cms-modal-dialog-header>    <cms-form cms-name="updateUrlForm"               cms-loading="formLoadState.isLoading">        <cms-page-actions>            <cms-button-submit cms-text="Save"                               ng-click="save()"                               ng-disabled="updateUrlForm.$invalid || submitLoadState.isLoading"                               cms-loading="submitLoadState.isLoading"></cms-button-submit>            <cms-button cms-text="Cancel"                        ng-click="close()"></cms-button>        </cms-page-actions>        <cms-page-body>            <cms-warning-message ng-if="customEntity.isPublished && customEntity.fullPath">                WARNING: This {{::options.nameSingular.toLowerCase()}} has been published. Changing the url will                break external links to this page (e.g. via google search)            </cms-warning-message>            <cms-form-status></cms-form-status>            <cms-form-section cms-title="Settings">                <cms-form-field-locale-selector cms-model="command.localeId"                                                cms-on-loaded="localesLoaded()"                                                ng-if="::options.hasLocale"></cms-form-field-locale-selector>                <cms-form-field-text cms-title="{{::options.terms[\'urlSlug\']}}"                                     cms-model="command.urlSlug"                                     cms-description="Lower case and containing only letter, numbers and hyphens. E.g. \'rock-and-roll\'."                                     ng-if="::!options.autoGenerateUrlSlug"                                     maxlength="200"                                     required></cms-form-field-text>            </cms-form-section></cms-page-body></cms-form></cms-modal-dialog-container>');}]);