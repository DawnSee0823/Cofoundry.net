﻿angular.module('cms.pageTemplates').run(['$templateCache', function (t) { t.put('/admin/modules/PageTemplates/Js/Routes/PageTemplateDetails.html', '<cms-page-header cms-title="{{vm.pageTemplate.name}}"                 cms-parent-title="Page Templates"></cms-page-header><cms-form cms-name="mainForm"          cms-edit-mode="vm.editMode"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <!-- Toolbar -->    <cms-page-actions ng-if="!vm.editMode">    </cms-page-actions>    <!-- Scrollable content area -->    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--MAIN-->        <cms-form-section cms-title="Main">            <cms-form-field-text cms-title="Name"                                 cms-model="vm.command.name"                                 maxlength="100"                                 required></cms-form-field-text>            <cms-form-field-text-area cms-title="Description"                                      cms-model="vm.command.description"></cms-form-field-text-area>            <cms-form-field-readonly cms-title="File path"                                     cms-model="vm.pageTemplate.fullPath"></cms-form-field-readonly>            <cms-form-field-container cms-title="Page Type">                <span>{{vm.pageTemplate.pageType == \'CustomEntityDetails\' ? vm.pageTemplate.customEntityDefinition.name + \' Details\' : vm.pageTemplate.pageType}}</span>            </cms-form-field-container>            <cms-form-field-readonly cms-title="Model Type"                                     cms-model="vm.pageTemplate.customEntityModelType"                                     ng-if="vm.pageTemplate.pageType == \'CustomEntityDetails\'"></cms-form-field-readonly>            <cms-form-field-container cms-title="Num Pages">                <a ng-href="/admin/pages#/?pageTemplateId={{::vm.pageTemplate.pageTemplateId}}">{{::vm.pageTemplate.numPages}}</a>            </cms-form-field-container>        </cms-form-section>        <!--SECTIONS-->        <cms-form-section cms-title="Sections">            <div class="control-group">                <div class="control-group-area">                    <cms-table-container>                        <table>                            <thead>                                <tr>                                    <th>Name</th>                                    <th ng-if="vm.pageTemplate.customEntityDefinition">Entity</th>                                </tr>                            </thead>                            <tbody>                                <tr ng-if="!vm.pageTemplate.sections.length">                                    <td colspan="100" class="empty">None.</td>                                </tr>                                <tr ng-repeat="section in vm.pageTemplate.sections">                                    <td>{{::section.name}}</td>                                    <td ng-if="vm.pageTemplate.customEntityDefinition">                                        <span ng-if="::section.isCustomEntitySection">{{::vm.pageTemplate.customEntityDefinition.name}}</span>                                        <span ng-if="::!section.isCustomEntitySection">Page</span>                                    </td>                                </tr>                            </tbody>                        </table>                    </cms-table-container>                </div>            </div>        </cms-form-section>    </cms-page-body></cms-form>'); t.put('/admin/modules/PageTemplates/Js/Routes/PageTemplateList.html', '<!--HEADER--><cms-page-header cms-title="Page Templates"></cms-page-header><cms-page-sub-header>    <cms-page-header-buttons>        <a class="btn-icon" cms-text="Filter"           ng-click="vm.toggleFilter()">            <i class="fa fa-search"></i>        </a>        <!--FILTER-->        <cms-search-filter cms-query="vm.query"                           cms-filter="vm.filter"                           ng-show="vm.isFilterVisible">            <cms-form-field-text cms-title="Name"                                 cms-model="vm.filter.name"></cms-form-field-text>        </cms-search-filter>    </cms-page-header-buttons></cms-page-sub-header><!-- Default toolbar --><cms-page-actions ng-show="!vm.editMode">    <!--RESULTS-->    <cms-pager cms-result="vm.result"               cms-query="vm.query"></cms-pager></cms-page-actions><!-- Scrollable content area --><cms-page-body cms-content-type="form">    <cms-table-container cms-loading="vm.gridLoadState.isLoading">        <table>            <thead>                <tr>                    <th>Name</th>                    <th>File Name</th>                    <th>Sections</th>                    <th>Pages</th>                    <th>Updated</th>                </tr>            </thead>            <tbody>                <tr ng-if="!vm.result.items.length">                    <td colspan="100" class="empty">Sorry, no page templates could be found.</td>                </tr>                <tr ng-repeat="pageTemplate in vm.result.items">                    <td>                        <a href="#/{{::pageTemplate.pageTemplateId}}">{{::pageTemplate.name}}</a>                    </td>                    <td>                        {{::pageTemplate.fileName}}                    </td>                    <td>                        {{::pageTemplate.numSections}}                    </td>                    <td>                        <a href="/admin/pages#/?pageTemplateId={{::pageTemplate.pageTemplateId}}">{{::pageTemplate.numPages}}</a>                    </td>                    <td class="lowPriority">                        <cms-time-ago cms-time="::pageTemplate.updateDate"></cms-time-ago>                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-page-body>'); }]);