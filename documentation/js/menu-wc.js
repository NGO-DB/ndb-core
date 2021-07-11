'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ndb-core documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Developer Documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/overview.html" data-type="entity-link" data-context-id="additional">Overview</a>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/tutorial.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-1027d3472962208c19c6dda1feebbbf7"' : 'data-target="#xs-additional-page-1027d3472962208c19c6dda1feebbbf7"' }>
                                                <span class="link-name">Tutorial</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-1027d3472962208c19c6dda1feebbbf7"' : 'id="xs-additional-page-1027d3472962208c19c6dda1feebbbf7"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/tutorial/overview-of-technologies.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Overview of Technologies</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/tutorial/setting-up-the-project.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Setting up the project</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/tutorial/using-aam-digital-(as-a-user).html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Using Aam Digital (as a user)</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/tutorial/diving-into-the-code.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Diving into the Code</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/how-to-guides.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-30d908c080ff7ca85afdf3b25078edeb"' : 'data-target="#xs-additional-page-30d908c080ff7ca85afdf3b25078edeb"' }>
                                                <span class="link-name">How-To Guides</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-30d908c080ff7ca85afdf3b25078edeb"' : 'id="xs-additional-page-30d908c080ff7ca85afdf3b25078edeb"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/navigate-the-code-structure.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Navigate the Code Structure</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/contribute-code-to-the-project.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Contribute Code to the Project</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/load-and-save-data.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Load and Save Data</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/display-dialogs-and-notifications.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Display Dialogs and Notifications</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/display-related-entities.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Display Related Entities</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/log-errors.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Log Errors</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/write-automated-unit-tests.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Write Automated Unit Tests</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/document-code.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Document Code</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/use-queries-and-indices.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Use Queries and Indices</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/create-a-new-entity-type.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Create a New Entity Type</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/generate-demo-data.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Generate Demo Data</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/review-a-pull-request.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Review a Pull Request</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/how-to-guides/create-a-report.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Create a Report</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/concepts.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-cc3ee55ac7e93ac8a067d9f686c4b470"' : 'data-target="#xs-additional-page-cc3ee55ac7e93ac8a067d9f686c4b470"' }>
                                                <span class="link-name">Concepts</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-cc3ee55ac7e93ac8a067d9f686c4b470"' : 'id="xs-additional-page-cc3ee55ac7e93ac8a067d9f686c4b470"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/concepts/overall-architecture.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Overall Architecture</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/concepts/entity-schema.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Entity Schema</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/concepts/session-and-authentication-system.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Session and Authentication System</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/concepts/configuration.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Configuration</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/concepts/ux-guidelines.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">UX Guidelines</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/concepts/documentation-structure.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Documentation Structure</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/prerequisites.html" data-type="entity-link" data-context-id="additional">Prerequisites</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' : 'data-target="#xs-components-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' :
                                            'id="xs-components-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExportDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExportDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' : 'data-target="#xs-injectables-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' :
                                        'id="xs-injectables-links-module-AdminModule-5114a5f13a6308feadbcd32cb330cdbd"' }>
                                        <li class="link">
                                            <a href="injectables/BackupService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BackupService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ChildPhotoUpdateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildPhotoUpdateService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlertsModule.html" data-type="entity-link" >AlertsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' : 'data-target="#xs-components-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' :
                                            'id="xs-components-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' }>
                                            <li class="link">
                                                <a href="components/AlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' : 'data-target="#xs-injectables-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' :
                                        'id="xs-injectables-links-module-AlertsModule-e628de13afda79c471a2e10838d0eb81"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppConfigModule-08c39812c74ec2e282258be129f6bcce"' : 'data-target="#xs-injectables-links-module-AppConfigModule-08c39812c74ec2e282258be129f6bcce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-08c39812c74ec2e282258be129f6bcce"' :
                                        'id="xs-injectables-links-module-AppConfigModule-08c39812c74ec2e282258be129f6bcce"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfig.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfig</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' : 'data-target="#xs-components-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' :
                                            'id="xs-components-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' : 'data-target="#xs-injectables-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' :
                                        'id="xs-injectables-links-module-AppModule-6506e0efa787361325ea8f97063f2552"' }>
                                        <li class="link">
                                            <a href="injectables/AnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalyticsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AttendanceModule.html" data-type="entity-link" >AttendanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AttendanceModule-6756a05f805421bb0f30c58925580474"' : 'data-target="#xs-components-links-module-AttendanceModule-6756a05f805421bb0f30c58925580474"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AttendanceModule-6756a05f805421bb0f30c58925580474"' :
                                            'id="xs-components-links-module-AttendanceModule-6756a05f805421bb0f30c58925580474"' }>
                                            <li class="link">
                                                <a href="components/ActivityAttendanceSectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityAttendanceSectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActivityCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActivityListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddDayAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddDayAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceDayBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceDayBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceStatusSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceStatusSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttendanceWeekDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendanceWeekDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupedChildAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupedChildAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecentAttendanceBlocksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecentAttendanceBlocksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RollCallComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RollCallComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RollCallSetupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RollCallSetupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChildrenModule.html" data-type="entity-link" >ChildrenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' : 'data-target="#xs-components-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' :
                                            'id="xs-components-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' }>
                                            <li class="link">
                                                <a href="components/AserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BmiBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BmiBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildrenBmiDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildrenBmiDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildrenCountDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildrenCountDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildrenListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildrenListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EducationalMaterialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EducationalMaterialComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HealthCheckupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthCheckupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoRecentNotesDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoRecentNotesDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesOfChildComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesOfChildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviousSchoolsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviousSchoolsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecentNotesDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecentNotesDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' : 'data-target="#xs-injectables-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' :
                                        'id="xs-injectables-links-module-ChildrenModule-106d53bdd60182cc98dfed44ef195bed"' }>
                                        <li class="link">
                                            <a href="injectables/ChildrenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildrenService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComingSoonModule.html" data-type="entity-link" >ComingSoonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComingSoonModule-1da849e9c94a1690cc71305cbcedbf67"' : 'data-target="#xs-components-links-module-ComingSoonModule-1da849e9c94a1690cc71305cbcedbf67"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComingSoonModule-1da849e9c94a1690cc71305cbcedbf67"' :
                                            'id="xs-components-links-module-ComingSoonModule-1da849e9c94a1690cc71305cbcedbf67"' }>
                                            <li class="link">
                                                <a href="components/ComingSoonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComingSoonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConfigModule-d215fd68be9aacd73fac59a4734278fc"' : 'data-target="#xs-injectables-links-module-ConfigModule-d215fd68be9aacd73fac59a4734278fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConfigModule-d215fd68be9aacd73fac59a4734278fc"' :
                                        'id="xs-injectables-links-module-ConfigModule-d215fd68be9aacd73fac59a4734278fc"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigurableEnumModule.html" data-type="entity-link" >ConfigurableEnumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' : 'data-target="#xs-components-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' :
                                            'id="xs-components-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' }>
                                            <li class="link">
                                                <a href="components/DisplayConfigurableEnumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayConfigurableEnumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditConfigurableEnumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditConfigurableEnumComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' : 'data-target="#xs-directives-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' :
                                        'id="xs-directives-links-module-ConfigurableEnumModule-012c07a21165df2cf2a029a6eb7a52c1"' }>
                                        <li class="link">
                                            <a href="directives/ConfigurableEnumDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigurableEnumDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmationDialogModule.html" data-type="entity-link" >ConfirmationDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' : 'data-target="#xs-components-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' :
                                            'id="xs-components-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' }>
                                            <li class="link">
                                                <a href="components/ConfirmationDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmationDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' : 'data-target="#xs-injectables-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' :
                                        'id="xs-injectables-links-module-ConfirmationDialogModule-4057a5e6a5fcaa1b7d3c0967cba10f05"' }>
                                        <li class="link">
                                            <a href="injectables/ConfirmationDialogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmationDialogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConflictResolutionModule.html" data-type="entity-link" >ConflictResolutionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConflictResolutionModule-cd071d7859fbeed037c19b4503b4b9c1"' : 'data-target="#xs-components-links-module-ConflictResolutionModule-cd071d7859fbeed037c19b4503b4b9c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConflictResolutionModule-cd071d7859fbeed037c19b4503b4b9c1"' :
                                            'id="xs-components-links-module-ConflictResolutionModule-cd071d7859fbeed037c19b4503b4b9c1"' }>
                                            <li class="link">
                                                <a href="components/CompareRevComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompareRevComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConflictResolutionListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConflictResolutionListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConflictResolutionRoutingModule.html" data-type="entity-link" >ConflictResolutionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-ea4be52518e88ec20a501f20701284ce"' : 'data-target="#xs-components-links-module-DashboardModule-ea4be52518e88ec20a501f20701284ce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-ea4be52518e88ec20a501f20701284ce"' :
                                            'id="xs-components-links-module-DashboardModule-ea4be52518e88ec20a501f20701284ce"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardShortcutWidgetModule.html" data-type="entity-link" >DashboardShortcutWidgetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardShortcutWidgetModule-976143d9d54024bf2fe7286d57028dda"' : 'data-target="#xs-components-links-module-DashboardShortcutWidgetModule-976143d9d54024bf2fe7286d57028dda"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardShortcutWidgetModule-976143d9d54024bf2fe7286d57028dda"' :
                                            'id="xs-components-links-module-DashboardShortcutWidgetModule-976143d9d54024bf2fe7286d57028dda"' }>
                                            <li class="link">
                                                <a href="components/DashboardShortcutWidgetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardShortcutWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DemoDataModule.html" data-type="entity-link" >DemoDataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DemoDataModule-68a7e227ac945b688e49b567b8939793"' : 'data-target="#xs-components-links-module-DemoDataModule-68a7e227ac945b688e49b567b8939793"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DemoDataModule-68a7e227ac945b688e49b567b8939793"' :
                                            'id="xs-components-links-module-DemoDataModule-68a7e227ac945b688e49b567b8939793"' }>
                                            <li class="link">
                                                <a href="components/DemoDataGeneratingProgressDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DemoDataGeneratingProgressDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityDetailsModule.html" data-type="entity-link" >EntityDetailsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityDetailsModule-020cd83ecf3df520a719724f95326ccc"' : 'data-target="#xs-components-links-module-EntityDetailsModule-020cd83ecf3df520a719724f95326ccc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityDetailsModule-020cd83ecf3df520a719724f95326ccc"' :
                                            'id="xs-components-links-module-EntityDetailsModule-020cd83ecf3df520a719724f95326ccc"' }>
                                            <li class="link">
                                                <a href="components/EntityDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityFormModule.html" data-type="entity-link" >EntityFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' : 'data-target="#xs-components-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' :
                                            'id="xs-components-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' }>
                                            <li class="link">
                                                <a href="components/EntityFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' : 'data-target="#xs-injectables-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' :
                                        'id="xs-injectables-links-module-EntityFormModule-738b2cfa7e2c9d4953fcbdd57ac8d399"' }>
                                        <li class="link">
                                            <a href="injectables/EntityFormService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityFormService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityListModule.html" data-type="entity-link" >EntityListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityListModule-109e04c21ba61d998ed3b7666266365a"' : 'data-target="#xs-components-links-module-EntityListModule-109e04c21ba61d998ed3b7666266365a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityListModule-109e04c21ba61d998ed3b7666266365a"' :
                                            'id="xs-components-links-module-EntityListModule-109e04c21ba61d998ed3b7666266365a"' }>
                                            <li class="link">
                                                <a href="components/EntityListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityModule.html" data-type="entity-link" >EntityModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EntityModule-ee45d5110487432f8bd357e3927ea149"' : 'data-target="#xs-injectables-links-module-EntityModule-ee45d5110487432f8bd357e3927ea149"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EntityModule-ee45d5110487432f8bd357e3927ea149"' :
                                        'id="xs-injectables-links-module-EntityModule-ee45d5110487432f8bd357e3927ea149"' }>
                                        <li class="link">
                                            <a href="injectables/EntityConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EntityMapperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityMapperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EntitySchemaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntitySchemaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntitySubrecordModule.html" data-type="entity-link" >EntitySubrecordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' : 'data-target="#xs-components-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' :
                                            'id="xs-components-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' }>
                                            <li class="link">
                                                <a href="components/EntitySubrecordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntitySubrecordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPaginatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPaginatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' : 'data-target="#xs-pipes-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' :
                                            'id="xs-pipes-links-module-EntitySubrecordModule-4a49a07b34000ea5f1956f580420977a"' }>
                                            <li class="link">
                                                <a href="pipes/KeysPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeysPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntityUtilsModule.html" data-type="entity-link" >EntityUtilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' : 'data-target="#xs-components-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' :
                                            'id="xs-components-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' }>
                                            <li class="link">
                                                <a href="components/DisplayCheckmarkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayCheckmarkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisplayDateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayDateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisplayEntityArrayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayEntityArrayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisplayEntityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisplayPercentageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayPercentageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisplayTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisplayUnitComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisplayUnitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAgeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditAgeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBooleanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditBooleanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditDateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditDateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEntityArrayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditEntityArrayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditLongTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditLongTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditNumberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditNumberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPercentageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPercentageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPhotoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPhotoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditSingleEntityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditSingleEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EntitySelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntitySelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReadonlyFunctionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReadonlyFunctionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' : 'data-target="#xs-pipes-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' :
                                            'id="xs-pipes-links-module-EntityUtilsModule-4335f92f52f3bb1f83db031442d602c2"' }>
                                            <li class="link">
                                                <a href="pipes/EntityFunctionPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityFunctionPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FontAwesomeIconsModule.html" data-type="entity-link" >FontAwesomeIconsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormDialogModule.html" data-type="entity-link" >FormDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' : 'data-target="#xs-components-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' :
                                            'id="xs-components-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' }>
                                            <li class="link">
                                                <a href="components/FormDialogWrapperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormDialogWrapperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' : 'data-target="#xs-injectables-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' :
                                        'id="xs-injectables-links-module-FormDialogModule-053900d16c6b64448464aa7c3e9dce6f"' }>
                                        <li class="link">
                                            <a href="injectables/FormDialogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormDialogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpModule.html" data-type="entity-link" >HelpModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpModule-9ad11998dfdbd52561f722dd036c34b5"' : 'data-target="#xs-components-links-module-HelpModule-9ad11998dfdbd52561f722dd036c34b5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpModule-9ad11998dfdbd52561f722dd036c34b5"' :
                                            'id="xs-components-links-module-HelpModule-9ad11998dfdbd52561f722dd036c34b5"' }>
                                            <li class="link">
                                                <a href="components/HowToComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HowToComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HistoricalDataModule.html" data-type="entity-link" >HistoricalDataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HistoricalDataModule-501bb621293605646fcaf9d0012026c0"' : 'data-target="#xs-components-links-module-HistoricalDataModule-501bb621293605646fcaf9d0012026c0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HistoricalDataModule-501bb621293605646fcaf9d0012026c0"' :
                                            'id="xs-components-links-module-HistoricalDataModule-501bb621293605646fcaf9d0012026c0"' }>
                                            <li class="link">
                                                <a href="components/HistoricalDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoricalDataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LatestChangesModule.html" data-type="entity-link" >LatestChangesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' : 'data-target="#xs-components-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' :
                                            'id="xs-components-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' }>
                                            <li class="link">
                                                <a href="components/AppVersionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppVersionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangelogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangelogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' : 'data-target="#xs-injectables-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' :
                                        'id="xs-injectables-links-module-LatestChangesModule-9770fbfce44f7815889d35b27f9ee92f"' }>
                                        <li class="link">
                                            <a href="injectables/LatestChangesDialogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LatestChangesDialogService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LatestChangesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LatestChangesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateManagerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateManagerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationModule.html" data-type="entity-link" >NavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavigationModule-723300da14611e7b51bc51643b427cbf"' : 'data-target="#xs-components-links-module-NavigationModule-723300da14611e7b51bc51643b427cbf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationModule-723300da14611e7b51bc51643b427cbf"' :
                                            'id="xs-components-links-module-NavigationModule-723300da14611e7b51bc51643b427cbf"' }>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotesModule.html" data-type="entity-link" >NotesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotesModule-d5749233489e02dd65691e43c1159971"' : 'data-target="#xs-components-links-module-NotesModule-d5749233489e02dd65691e43c1159971"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotesModule-d5749233489e02dd65691e43c1159971"' :
                                            'id="xs-components-links-module-NotesModule-d5749233489e02dd65691e43c1159971"' }>
                                            <li class="link">
                                                <a href="components/ChildMeetingNoteAttendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildMeetingNoteAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoteDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoteDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesManagerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' : 'data-target="#xs-components-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' :
                                            'id="xs-components-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' }>
                                            <li class="link">
                                                <a href="components/DisabledWrapperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisabledWrapperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' : 'data-target="#xs-directives-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' :
                                        'id="xs-directives-links-module-PermissionsModule-7170d92a3973fb95b1f3b736a7f414b4"' }>
                                        <li class="link">
                                            <a href="directives/DisableEntityOperationDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DisableEntityOperationDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressDashboardWidgetModule.html" data-type="entity-link" >ProgressDashboardWidgetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProgressDashboardWidgetModule-881f49606c00a8185ea3a9f482f1882b"' : 'data-target="#xs-components-links-module-ProgressDashboardWidgetModule-881f49606c00a8185ea3a9f482f1882b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProgressDashboardWidgetModule-881f49606c00a8185ea3a9f482f1882b"' :
                                            'id="xs-components-links-module-ProgressDashboardWidgetModule-881f49606c00a8185ea3a9f482f1882b"' }>
                                            <li class="link">
                                                <a href="components/ProgressDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportingModule.html" data-type="entity-link" >ReportingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReportingModule-23ab204be32ed3a2993eeb003018100f"' : 'data-target="#xs-components-links-module-ReportingModule-23ab204be32ed3a2993eeb003018100f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportingModule-23ab204be32ed3a2993eeb003018100f"' :
                                            'id="xs-components-links-module-ReportingModule-23ab204be32ed3a2993eeb003018100f"' }>
                                            <li class="link">
                                                <a href="components/ReportRowComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportRowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolsModule.html" data-type="entity-link" >SchoolsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' : 'data-target="#xs-components-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' :
                                            'id="xs-components-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' }>
                                            <li class="link">
                                                <a href="components/ChildrenOverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChildrenOverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolBlockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolBlockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' : 'data-target="#xs-injectables-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' :
                                        'id="xs-injectables-links-module-SchoolsModule-d5bcd63e37138bc724ceb57fd1414fc0"' }>
                                        <li class="link">
                                            <a href="injectables/SchoolsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SessionModule.html" data-type="entity-link" >SessionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SessionModule-05df19ab8a0149a48ca4565fc3b102b0"' : 'data-target="#xs-components-links-module-SessionModule-05df19ab8a0149a48ca4565fc3b102b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SessionModule-05df19ab8a0149a48ca4565fc3b102b0"' :
                                            'id="xs-components-links-module-SessionModule-05df19ab8a0149a48ca4565fc3b102b0"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SyncStatusModule.html" data-type="entity-link" >SyncStatusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SyncStatusModule-56f34551911441ccb6d03a24b00cf015"' : 'data-target="#xs-components-links-module-SyncStatusModule-56f34551911441ccb6d03a24b00cf015"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SyncStatusModule-56f34551911441ccb6d03a24b00cf015"' :
                                            'id="xs-components-links-module-SyncStatusModule-56f34551911441ccb6d03a24b00cf015"' }>
                                            <li class="link">
                                                <a href="components/BackgroundProcessingIndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BackgroundProcessingIndicatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InitialSyncDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InitialSyncDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SyncStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SyncStatusComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiModule.html" data-type="entity-link" >UiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiModule-0131712a9aa0c6b9d6e6d25799fb9a3d"' : 'data-target="#xs-components-links-module-UiModule-0131712a9aa0c6b9d6e6d25799fb9a3d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiModule-0131712a9aa0c6b9d6e6d25799fb9a3d"' :
                                            'id="xs-components-links-module-UiModule-0131712a9aa0c6b9d6e6d25799fb9a3d"' }>
                                            <li class="link">
                                                <a href="components/PrimaryActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-984eb3904c9cf1d9382506a15a17c6bf"' : 'data-target="#xs-components-links-module-UserModule-984eb3904c9cf1d9382506a15a17c6bf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-984eb3904c9cf1d9382506a15a17c6bf"' :
                                            'id="xs-components-links-module-UserModule-984eb3904c9cf1d9382506a15a17c6bf"' }>
                                            <li class="link">
                                                <a href="components/UserAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAccountComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewModule.html" data-type="entity-link" >ViewModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ViewModule-42b3ac480c68b7415b2483e16cd45353"' : 'data-target="#xs-directives-links-module-ViewModule-42b3ac480c68b7415b2483e16cd45353"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ViewModule-42b3ac480c68b7415b2483e16cd45353"' :
                                        'id="xs-directives-links-module-ViewModule-42b3ac480c68b7415b2483e16cd45353"' }>
                                        <li class="link">
                                            <a href="directives/DynamicComponentDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DynamicComponentDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebdavModule.html" data-type="entity-link" >WebdavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' : 'data-target="#xs-components-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' :
                                            'id="xs-components-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' }>
                                            <li class="link">
                                                <a href="components/CloudFileServiceUserSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudFileServiceUserSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' : 'data-target="#xs-injectables-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' :
                                        'id="xs-injectables-links-module-WebdavModule-c513002254e2d00dc63efe3ff65db682"' }>
                                        <li class="link">
                                            <a href="injectables/CloudFileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudFileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageComponent.html" data-type="entity-link" >PageComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActivityAttendance.html" data-type="entity-link" >ActivityAttendance</a>
                            </li>
                            <li class="link">
                                <a href="classes/Alert.html" data-type="entity-link" >Alert</a>
                            </li>
                            <li class="link">
                                <a href="classes/Aser.html" data-type="entity-link" >Aser</a>
                            </li>
                            <li class="link">
                                <a href="classes/AttendanceDay.html" data-type="entity-link" class="deprecated-name">AttendanceDay</a>
                            </li>
                            <li class="link">
                                <a href="classes/AttendanceMonth.html" data-type="entity-link" class="deprecated-name">AttendanceMonth</a>
                            </li>
                            <li class="link">
                                <a href="classes/Changelog.html" data-type="entity-link" >Changelog</a>
                            </li>
                            <li class="link">
                                <a href="classes/Child.html" data-type="entity-link" >Child</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChildSchoolRelation.html" data-type="entity-link" >ChildSchoolRelation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Config.html" data-type="entity-link" >Config</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigurableEnumDatatype.html" data-type="entity-link" >ConfigurableEnumDatatype</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomFaker.html" data-type="entity-link" >CustomFaker</a>
                            </li>
                            <li class="link">
                                <a href="classes/Database.html" data-type="entity-link" >Database</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoChildConfig.html" data-type="entity-link" >DemoChildConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoDataGenerator.html" data-type="entity-link" >DemoDataGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoDataServiceConfig.html" data-type="entity-link" >DemoDataServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoEducationMaterialConfig.html" data-type="entity-link" >DemoEducationMaterialConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoEventsConfig.html" data-type="entity-link" >DemoEventsConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoHistoricalDataConfig.html" data-type="entity-link" >DemoHistoricalDataConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoNoteConfig.html" data-type="entity-link" >DemoNoteConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemoSchoolConfig.html" data-type="entity-link" >DemoSchoolConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditComponent.html" data-type="entity-link" >EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/EducationalMaterial.html" data-type="entity-link" >EducationalMaterial</a>
                            </li>
                            <li class="link">
                                <a href="classes/Entity.html" data-type="entity-link" >Entity</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventAttendance.html" data-type="entity-link" >EventAttendance</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventNote.html" data-type="entity-link" >EventNote</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterSelection.html" data-type="entity-link" >FilterSelection</a>
                            </li>
                            <li class="link">
                                <a href="classes/HealthCheck.html" data-type="entity-link" >HealthCheck</a>
                            </li>
                            <li class="link">
                                <a href="classes/HistoricalEntityData.html" data-type="entity-link" >HistoricalEntityData</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockEntityMapperService.html" data-type="entity-link" >MockEntityMapperService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NdbCorePage.html" data-type="entity-link" >NdbCorePage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/OnlineSessionService.html" data-type="entity-link" >OnlineSessionService</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhotoDatatype.html" data-type="entity-link" >PhotoDatatype</a>
                            </li>
                            <li class="link">
                                <a href="classes/PouchDatabase.html" data-type="entity-link" >PouchDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProgressDashboardConfig.html" data-type="entity-link" >ProgressDashboardConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryDataSource.html" data-type="entity-link" >QueryDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecurringActivity.html" data-type="entity-link" >RecurringActivity</a>
                            </li>
                            <li class="link">
                                <a href="classes/School.html" data-type="entity-link" >School</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionService.html" data-type="entity-link" >SessionService</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateHandler.html" data-type="entity-link" >StateHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/Test.html" data-type="entity-link" >Test</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypedFormControl.html" data-type="entity-link" >TypedFormControl</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewComponent.html" data-type="entity-link" >ViewComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AttendanceMigrationService.html" data-type="entity-link" >AttendanceMigrationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceService.html" data-type="entity-link" >AttendanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AutoResolutionService.html" data-type="entity-link" >AutoResolutionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChildPhotoService.html" data-type="entity-link" >ChildPhotoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChildrenMigrationService.html" data-type="entity-link" >ChildrenMigrationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigMigrationService.html" data-type="entity-link" >ConfigMigrationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseIndexingService.html" data-type="entity-link" >DatabaseIndexingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoActivityEventsGeneratorService.html" data-type="entity-link" >DemoActivityEventsGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoActivityGeneratorService.html" data-type="entity-link" >DemoActivityGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoAserGeneratorService.html" data-type="entity-link" >DemoAserGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoChildGenerator.html" data-type="entity-link" >DemoChildGenerator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoChildSchoolRelationGenerator.html" data-type="entity-link" >DemoChildSchoolRelationGenerator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoDataService.html" data-type="entity-link" >DemoDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoEducationalMaterialGeneratorService.html" data-type="entity-link" >DemoEducationalMaterialGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoHealthCheckGeneratorService.html" data-type="entity-link" >DemoHealthCheckGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoHistoricalDataGenerator.html" data-type="entity-link" >DemoHistoricalDataGenerator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoNoteGeneratorService.html" data-type="entity-link" >DemoNoteGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoProgressDashboardWidgetGeneratorService.html" data-type="entity-link" >DemoProgressDashboardWidgetGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoSchoolGenerator.html" data-type="entity-link" >DemoSchoolGenerator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemoUserGeneratorService.html" data-type="entity-link" >DemoUserGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EntityPermissionsService.html" data-type="entity-link" >EntityPermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterGeneratorService.html" data-type="entity-link" >FilterGeneratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoricalDataService.html" data-type="entity-link" >HistoricalDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalSession.html" data-type="entity-link" >LocalSession</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingErrorHandler.html" data-type="entity-link" >LoggingErrorHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingService.html" data-type="entity-link" >LoggingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewLocalSessionService.html" data-type="entity-link" >NewLocalSessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotesMigrationService.html" data-type="entity-link" >NotesMigrationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueryService.html" data-type="entity-link" >QueryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RemoteSession.html" data-type="entity-link" >RemoteSession</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportingService.html" data-type="entity-link" >ReportingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterService.html" data-type="entity-link" >RouterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SyncedSessionService.html" data-type="entity-link" >SyncedSessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAccountService.html" data-type="entity-link" >UserAccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WebdavWrapperService.html" data-type="entity-link" >WebdavWrapperService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoggedInGuard.html" data-type="entity-link" >LoggedInGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Aggregation.html" data-type="entity-link" >Aggregation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AttendanceStatusType.html" data-type="entity-link" >AttendanceStatusType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AttendanceWeekRow.html" data-type="entity-link" >AttendanceWeekRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AverageAttendanceStats.html" data-type="entity-link" >AverageAttendanceStats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackgroundProcessState.html" data-type="entity-link" >BackgroundProcessState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BmiRow.html" data-type="entity-link" >BmiRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BooleanFilterConfig.html" data-type="entity-link" >BooleanFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChildWithRecentNoteInfo.html" data-type="entity-link" >ChildWithRecentNoteInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnGroupsConfig.html" data-type="entity-link" >ColumnGroupsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurableEnumFilterConfig.html" data-type="entity-link" >ConfigurableEnumFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurableEnumValue.html" data-type="entity-link" >ConfigurableEnumValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmationDialogConfig.html" data-type="entity-link" >ConfirmationDialogConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConflictResolutionStrategy.html" data-type="entity-link" >ConflictResolutionStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicComponentConfig.html" data-type="entity-link" >DynamicComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditPropertyConfig.html" data-type="entity-link" >EditPropertyConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityConfig.html" data-type="entity-link" >EntityConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityDetailsConfig.html" data-type="entity-link" >EntityDetailsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityListConfig.html" data-type="entity-link" >EntityListConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntitySchemaDatatype.html" data-type="entity-link" >EntitySchemaDatatype</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntitySchemaField.html" data-type="entity-link" >EntitySchemaField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterComponentSettings.html" data-type="entity-link" >FilterComponentSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterConfig.html" data-type="entity-link" >FilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterSelectionOption.html" data-type="entity-link" >FilterSelectionOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormFieldConfig.html" data-type="entity-link" >FormFieldConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupByDescription.html" data-type="entity-link" >GroupByDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupConfig.html" data-type="entity-link" >GroupConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAppConfig.html" data-type="entity-link" >IAppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InteractionType.html" data-type="entity-link" >InteractionType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationMenuConfig.html" data-type="entity-link" >NavigationMenuConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotesManagerConfig.html" data-type="entity-link" >NotesManagerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnInitDynamicComponent.html" data-type="entity-link" >OnInitDynamicComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Panel.html" data-type="entity-link" >Panel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PanelComponent.html" data-type="entity-link" >PanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PanelConfig.html" data-type="entity-link" >PanelConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Photo.html" data-type="entity-link" >Photo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrebuiltFilterConfig.html" data-type="entity-link" >PrebuiltFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProgressDashboardPart.html" data-type="entity-link" >ProgressDashboardPart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportConfig.html" data-type="entity-link" >ReportConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportingComponentConfig.html" data-type="entity-link" >ReportingComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportRow.html" data-type="entity-link" >ReportRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShowsEntity.html" data-type="entity-link" >ShowsEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateChangedEvent.html" data-type="entity-link" >StateChangedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableRow.html" data-type="entity-link" >TableRow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdatedEntity.html" data-type="entity-link" >UpdatedEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewConfig.html" data-type="entity-link" >ViewConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPropertyConfig.html" data-type="entity-link" >ViewPropertyConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});