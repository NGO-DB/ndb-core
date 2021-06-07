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

import { Entity } from "../../../core/entity/entity";
import { DatabaseEntity } from "../../../core/entity/database-entity.decorator";
import { DatabaseField } from "../../../core/entity/database-field.decorator";
import { WarningLevel } from "../../warning-level";

/**
 * Model Class for the Health Checks that are taken for a Child.
 * It stores the Child's ID in a String and both, the height and weight in cm as a number, and the Date
 */
@DatabaseEntity("HealthCheck")
export class HealthCheck extends Entity {
  @DatabaseField() child: string;
  @DatabaseField({ label: "Date" }) date: Date;

  /** height measurement in cm **/
  @DatabaseField({
    label: "Height [cm]",
    viewComponent: "DisplayUnit",
    additional: "cm",
  })
  height: number;

  /** weight measurement in kg **/
  @DatabaseField({
    label: "Weight [kg]",
    viewComponent: "DisplayUnit",
    additional: "kg",
  })
  weight: number;

  get bmi(): number {
    return this.weight / ((this.height / 100) * (this.height / 100));
  }

  getWarningLevel() {
    if (this.bmi <= 16 || this.bmi >= 30) {
      return WarningLevel.URGENT;
    } else if (this.bmi >= 18 && this.bmi <= 25) {
      return WarningLevel.OK;
    } else {
      return WarningLevel.WARNING;
    }
  }
}
