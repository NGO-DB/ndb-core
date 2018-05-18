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

import { MockDatabase } from './mock-database';

describe('MockDatabase tests', () => {
  let database: MockDatabase;

  beforeEach(() => {
    database = new MockDatabase();
  });

  it('get object by _id after put into database', function (done) {
    const id = 'test_id';
    const name = 'test';
    const count = 42;
    const testData = {_id: id, name: name, count: count};

    database.put(testData).then(
      function () {
        getObjectAndCompare();
      },
      function () {
        expect(false).toBe(true, 'promise of Database.put failed');
      }
    );

    function getObjectAndCompare() {
      database.get(id).then(
        function (resultData: any) {
          expect(resultData._id).toEqual(id);
          expect(resultData.name).toEqual(name);
          expect(resultData.count).toEqual(count);
          done();
        },
        function () {
          expect(false).toBe(true, 'promise of Database.get failed');
          done();
        }
      );
    }
  });

  it('fails to get by not existing _id', function (done) {
    database.get('some_id').then(
      function () {
        expect(true).toBe(false, 'retrieved object despite get on non-existing _id');
        done();
      },
      function (err: any) {
        expect(err).toBeDefined();
        done();
      }
    );
  });

});
