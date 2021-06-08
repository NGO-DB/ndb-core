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

import { EntitySchemaDatatype } from "../schema/entity-schema-datatype";
import { EntitySchemaField } from "../schema/entity-schema-field";
import { EntitySchemaService } from "../schema/entity-schema.service";
import { EntityConstructor } from "../entity";

/**
 * Datatype for the EntitySchemaService transforming values of complex objects recursively.
 *
 * (De)serialize instances of any class recognizing the normal @DatabaseField() annotations within that referenced class.
 * This is useful if your Entity type is complex and has properties that are instances of other classes
 * rather just basic value types like string or number.
 * You can then annotate some properties of that referenced class so they will be saved to the database while ignoring other properties.
 * The referenced class instance will be saved embedded into the entity's object and not as an own "stand-alone" entity.
 *
 * see the unit tests in entity-schema.service.spec.ts for an example
 *
 * Requires the class constructor as extension field in the schema field annotation:
 *
 * `@DatabaseField({ dataType: 'schema-embed', additional: MyClass })`
 */
export const schemaEmbedEntitySchemaDatatype: EntitySchemaDatatype = {
  name: "schema-embed",

  transformToDatabaseFormat: (
    value: any,
    schemaField: EntitySchemaField,
    schemaService: EntitySchemaService
  ) => {
    return schemaService.transformEntityToDatabaseFormat(
      value,
      schemaField.additional.schema
    );
  },

  transformToObjectFormat: (
    value: any,
    schemaField: EntitySchemaField,
    schemaService: EntitySchemaService
  ) => {
    const instance = new (schemaField.additional as EntityConstructor<any>)();
    schemaService.loadDataIntoEntity(instance, value);
    return instance;
  },
};
