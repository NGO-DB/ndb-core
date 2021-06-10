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

import { Component } from "@angular/core";
import { MenuItem } from "../menu-item";
import { AdminGuard } from "../../admin/admin.guard";
import { NavigationMenuConfig } from "../navigation-menu-config.interface";
import { RouterService } from "../../view/dynamic-routing/router.service";
import { ViewConfig } from "../../view/dynamic-routing/view-config.interface";
import { ConfigService } from "../../config/config.service";
import { NavigationEnd, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, map, startWith } from "rxjs/operators";

/**
 * Main app menu listing.
 */
@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
@UntilDestroy()
export class NavigationComponent {
  activeElement: string;
  /** name of config array in the config json file */
  private readonly CONFIG_ID = "navigationMenu";
  /** all menu items to be displayed */
  public menuItems: MenuItem[] = [];

  constructor(
    private adminGuard: AdminGuard,
    private configService: ConfigService,
    private router: Router
  ) {
    this.configService.configUpdated.subscribe(() =>
      this.initMenuItemsFromConfig()
    );
    this.router.events
      .pipe(
        untilDestroyed(this),
        startWith(new NavigationEnd(0, this.router.url, "")),
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) =>
          // conservative filter matching all items that could fit to the given url
          this.menuItems.filter((item) => event.url.startsWith(item.link))
        )
      )
      .subscribe((items) => {
        if (items.length === 0) {
          this.activeElement = "";
        } else if (items.length === 1) {
          this.activeElement = items[0].name;
        } else {
          // If there are multiple matches (multiple elements start with the give link),
          // use the element where the length is bigger. For example:
          // '/attendance' matches both manage attendance ('/attendance') as well as
          // '/attendance/add/day' (add day attendance).
          // Therefore, we can assume that the link with the smaller length is the
          // one to choose
          this.activeElement = items.reduce((i1, i2) =>
            i1.link.length > i2.link.length ? i1 : i2
          ).name;
        }
      });
  }

  /**
   * Load menu items from config file
   */
  private initMenuItemsFromConfig() {
    const config = this.configService.getConfig<NavigationMenuConfig>(
      this.CONFIG_ID
    );
    this.menuItems = config.items.filter((item) => this.hasPermissionFor(item));
  }

  /**
   * Check whether the user has the required rights
   */
  private hasPermissionFor(item: MenuItem): boolean {
    const viewConfig = this.configService.getConfig<ViewConfig>(
      RouterService.PREFIX_VIEW_CONFIG + item.link.replace(/^\//, "")
    );
    return !viewConfig?.requiresAdmin || this.adminGuard.isAdmin();
  }
}
