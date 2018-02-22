/*
 *     This file is part of ndb-core.
 *
 *     ndb-core is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     ndb-core is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with ndb-core.  If not, see <http://www.gnu.org/licenses/>.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsModule } from '../alerts/alerts.module';
import { UiComponent } from './ui/ui.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigationModule } from '../navigation/navigation.module';
import { SessionModule } from '../session/session.module';
import { SyncStatusModule } from '../sync-status/sync-status.module';
import { RouterModule } from '@angular/router';
import { LatestChangesModule } from '../latest-changes/latest-changes.module';
import { MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AlertsModule,
    LatestChangesModule,
    NavigationModule,
    RouterModule,
    SessionModule,
    SyncStatusModule,
    MatSidenavModule
  ],
  declarations: [UiComponent, FooterComponent, HeaderComponent],
  exports: [UiComponent]
})
export class UiModule {
}
