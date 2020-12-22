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

import { DatabaseEntity } from "../../../core/entity/database-entity.decorator";
import { Entity } from "../../../core/entity/entity";
import { DatabaseField } from "../../../core/entity/database-field.decorator";
import { WarningLevel, WarningLevelColor } from "../../warning-level";
import { InteractionType } from "../note-config-loader/note-config.interface";
import { EventAttendance } from "../../attendance/model/event-attendance";
import { AttendanceStatus } from "../../attendance/model/attendance-status";

@DatabaseEntity("Note")
export class Note extends Entity {
  static create(date: Date, subject: string = ""): Note {
    const instance = new Note();
    instance.date = date;
    instance.subject = subject;
    return instance;
  }

  /** IDs of Child entities linked with this note */
  @DatabaseField() children: string[] = [];

  /**
   * optional additional information about attendance at this event for each of the linked children
   *
   * No direct access to change this property. Use the `.getAttendance()` method to have safe access.
   */
  @DatabaseField() private childrenAttendance: Map<
    string,
    EventAttendance
  > = new Map();

  @DatabaseField() date: Date;
  @DatabaseField() subject: string = "";
  @DatabaseField() text: string = "";
  @DatabaseField() author: string = "";
  @DatabaseField({ dataType: "interaction-type" }) category: InteractionType =
    InteractionType.NONE;

  /**
   * id referencing a different entity (e.g. a recurring activity) this note is related to
   */
  @DatabaseField() relatesTo: string;

  @DatabaseField({ dataType: "string" }) warningLevel: WarningLevel =
    WarningLevel.OK;

  getWarningLevel(): WarningLevel {
    return this.warningLevel;
  }

  // TODO: color logic should not be part of entity/model but rather in the component responsible for displaying it
  public getColor() {
    if (this.warningLevel === WarningLevel.URGENT) {
      return WarningLevelColor(WarningLevel.URGENT);
    }
    if (this.warningLevel === WarningLevel.WARNING) {
      return WarningLevelColor(WarningLevel.WARNING);
    }

    const color = this.category.color;
    return color ? color : "";
  }

  public getColorForId(childId: string) {
    if (
      this.category.isMeeting &&
      this.childrenAttendance.get(childId)?.status === AttendanceStatus.ABSENT
    ) {
      // child is absent, highlight the entry
      return WarningLevelColor(WarningLevel.URGENT);
    }
    return this.getColor();
  }

  get categoryName(): string {
    return this.category.name;
  }

  /**
   * removes a specific child from this note
   * @param childId The id of the child to exclude from the notes
   */
  removeChild(childId: string) {
    this.children.splice(this.children.indexOf(childId), 1);
    this.childrenAttendance.delete(childId);
  }

  /**
   * adds a new child to this note
   * @param childId The id of the child to add to the notes
   */
  addChild(childId: string) {
    if (this.children.includes(childId)) {
      return;
    }

    this.children.splice(0, 0, childId);
  }

  /**
   * Returns the event attendance details for the given child.
   *
   * This method returns a default object that can be used and updated even if no attendance has been recorded yet.
   * Returns undefined if the child is not added to this event/note instance.
   *
   * @param childId
   */
  getAttendance(childId: string): EventAttendance {
    if (!this.children.includes(childId)) {
      return undefined;
    }

    let attendance = this.childrenAttendance.get(childId);
    if (!attendance) {
      attendance = new EventAttendance();
      this.childrenAttendance.set(childId, attendance);
    }
    return attendance;
  }
}
