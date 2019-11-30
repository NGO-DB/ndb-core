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

import {async} from '@angular/core/testing';
import {Note} from './note';
import {Entity} from '../../entity/entity';
import {WarningLevel} from '../attendance/warning-level';
import {EntitySchemaService} from '../../entity/schema/entity-schema.service';

describe('Note Entity', () => {
  const ENTITY_TYPE = 'Note';
  let entitySchemaService: EntitySchemaService;

  beforeEach(async(() => {
    entitySchemaService = new EntitySchemaService();
  }));


  it('has correct _id and entityId and type', function () {
    const id = 'test1';
    const entity = new Note(id);

    expect(entity.getId()).toBe(id);
    expect(Entity.extractEntityIdFromId(entity._id)).toBe(id);
  });

  it('has correct type/prefix', function () {
    const id = 'test1';
    const entity = new Note(id);

    expect(entity.getType()).toBe(ENTITY_TYPE);
    expect(Entity.extractTypeFromId(entity._id)).toBe(ENTITY_TYPE);
  });

  it('has all and only defined schema fields in rawData', function () {
    const id = 'test1';
    const expectedData = {
      _id: ENTITY_TYPE + ':' + id,

      children: ['1', '2'],
      date: new Date(),
      subject: 'Test',
      text: 'description',
      author: 'me',
      category: 'Phone Call',
      warningLevel: 'URGENT',

      searchIndices: [],
    };

    const entity = new Note(id);
    entity.children = expectedData.children;
    entity.date = expectedData.date;
    entity.subject = expectedData.subject;
    entity.text = expectedData.text;
    entity.author = expectedData.author;
    entity.category = expectedData.category;
    entity.warningLevel = WarningLevel.URGENT;

    const rawData = entitySchemaService.transformEntityToDatabaseFormat(entity);

    expect(rawData).toEqual(expectedData);
  });
});
