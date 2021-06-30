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

import { Entity } from "../../../core/entity/model/entity";
import { warningLevels } from "../../warning-level";
import { DatabaseField } from "../../../core/entity/database-field.decorator";
import { DatabaseEntity } from "../../../core/entity/database-entity.decorator";
import { ConfigurableEnumValue } from "../../../core/configurable-enum/configurable-enum.interface";
import { mathLevels } from "./mathLevels";
import { readingLevels } from "./readingLevels";

@DatabaseEntity("Aser")
export class Aser extends Entity {
  static isReadingPassedOrNA(level: ConfigurableEnumValue) {
    if (!level || level.id === "") {
      // not applicable
      return true;
    }
    return level === readingLevels.find((it) => it.id === "read_paragraph");
  }

  static isMathPassedOrNA(level: ConfigurableEnumValue) {
    if (!level || level.id === "") {
      // not applicable
      return true;
    }
    return level === mathLevels.find((it) => it.id === "division");
  }

  @DatabaseField() child: string; // id of Child entity
  @DatabaseField({ label: "Date" }) date: Date = new Date();
  @DatabaseField({
    label: "Hindi",
    dataType: "configurable-enum",
    innerDataType: "reading-levels",
  })
  hindi: ConfigurableEnumValue;
  @DatabaseField({
    label: "Bengali",
    dataType: "configurable-enum",
    innerDataType: "reading-levels",
  })
  bengali: ConfigurableEnumValue;
  @DatabaseField({
    label: "English",
    dataType: "configurable-enum",
    innerDataType: "reading-levels",
  })
  english: ConfigurableEnumValue;
  @DatabaseField({
    label: "Math",
    dataType: "configurable-enum",
    innerDataType: "math-levels",
  })
  math: ConfigurableEnumValue;
  @DatabaseField({ label: "Remarks" }) remarks: string = "";

  getWarningLevel(): ConfigurableEnumValue {
    let warningLevel;

    if (
      Aser.isReadingPassedOrNA(this.english) &&
      Aser.isReadingPassedOrNA(this.hindi) &&
      Aser.isReadingPassedOrNA(this.bengali) &&
      Aser.isMathPassedOrNA(this.math)
    ) {
      warningLevel = warningLevels.find((level) => level.id === "OK");
    } else {
      warningLevel = warningLevels.find((level) => level.id === "WARNING");
    }

    return warningLevel;
  }
}
