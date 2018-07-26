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

import { Entity } from '../../entity/entity';
import {WarningLevel} from '../attendance/warning-level';


export class Note extends Entity {
  static ENTITY_TYPE = 'Note';

  static INTERACTION_TYPES = [
    'Home Visit',
    'Talk with Guardians',
    'Talk with Child',
    'Incident',
    'Discussion/Decision',
    'School/Hostel Visit',
    'Phone Call',
    'Talk with Coaching Teacher',
    'Talk with Peer',
    'Guardians\' Meeting',
    'Children\'s Meeting',
  ];

  children: string[] = []; // id of Child entity
  date: Date;
  subject = '';
  text = '';
  author = '';
  category = '';
  warningLevel: WarningLevel = WarningLevel.OK;

  getWarningLevel (): WarningLevel {
    return this.warningLevel;
  }

  isLinkedWithChild(childId: string) {
    return (this.children.findIndex(e => e === childId) > -1);
  }


  public getColor() {
    return 'white';
  }


  public load(data: any) {
    if (data.date === undefined) {
      data.date = new Date();
    } else if (data.date !== undefined && typeof data.date !== typeof new Date()) {
      data.date = new Date(data.date);
    }

    return super.load(data);
  }
}
