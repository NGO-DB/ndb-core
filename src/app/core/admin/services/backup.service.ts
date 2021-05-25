import { Injectable } from "@angular/core";
import { Database } from "../../database/database";
import { User } from "../../user/user";
import { Papa } from "ngx-papaparse";

/**
 * Create and load backups of the database.
 */
@Injectable({
  providedIn: "root",
})
export class BackupService {
  /** CSV row separator */
  static readonly SEPARATOR_ROW = "\n";
  /** CSV column/field separator */
  static readonly SEPARATOR_COL = ",";

  constructor(private db: Database, private papa: Papa) {}

  /**
   * Creates a List of JSON elements separated by `BackupService.SEPARATOR_ROW` holding all elements of the database.
   * This method can be used to created a backup of the data.
   *
   * @returns Promise<string> a string containing all elements of the database separated by SEPARATOR_ROW
   */
  async getJsonExport(): Promise<string> {
    const results = await this.db.getAll();
    return this.createJson(results);
  }

  /**
   * Creates a JSON string of the given data.
   *
   * @param data the data which should be converted to JSON
   * @returns string containing all the values stringified elements of the input data
   */
  createJson(data): string {
    let res = "";
    data.forEach((r) => {
      res += JSON.stringify(r) + BackupService.SEPARATOR_ROW;
    });

    return res.trim();
  }

  /**
   * Creates a CSV string of the whole database
   *
   * @returns string a valid CSV string
   */
  async getCsvExport(): Promise<string> {
    const results = await this.db.getAll();
    return this.createCsv(results);
  }

  /**
   * Creates a CSV string of the input data
   *
   * @param data an array of elements
   * @returns string a valid CSV string of the input data
   */
  createCsv(data): string {
    // create list of row descriptions for the csv string
    const allFields = [];
    data.forEach((element) => allFields.push(...Object.keys(element)));
    const uniqueFields = [...new Set(allFields)]; // creates list with unique elements

    return this.papa.unparse(
      { data: data, fields: uniqueFields },
      { quotes: true, header: true }
    );
  }

  /**
   * Removes all but the user entities of the database
   *
   * @returns Promise<any> a promise that resolves after all remove operations are done
   */
  async clearDatabase(): Promise<void> {
    const allDocs = await this.db.getAll();
    for (const row of allDocs) {
      if (!row._id.startsWith(User.ENTITY_TYPE + ":")) {
        // skip User entities in order to not break login!
        await this.db.remove(row);
      }
    }
  }

  /**
   * Fills the database with the provided JSON data.
   * Data should be generated by the `getJsonExport` function
   *
   * @param json An array of entities to be written to the database
   * @param forceUpdate should existing objects be overridden? Default false
   */
  async importJson(json, forceUpdate = false): Promise<void> {
    for (const stringRecord of json.split(BackupService.SEPARATOR_ROW)) {
      const record = JSON.parse(stringRecord);
      // Remove _rev so CouchDB treats it as a new rather than a updated document
      delete record._rev;
      await this.db.put(record, forceUpdate);
    }
  }

  /**
   * Fills the database with the elements of the CSV string
   *
   * @param csv a valid CSV string
   * @param forceUpdate should existing elements be overridden? Default false
   *
   * @returns Promise<any> a promise that resolves after all save operations are done
   */
  async importCsv(csv, forceUpdate = false): Promise<void> {
    const parsedCsv = this.papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    for (const record of parsedCsv.data) {
      // remove undefined properties
      for (const propertyName in record) {
        if (record[propertyName] === null || propertyName === "_rev") {
          delete record[propertyName];
        }
      }

      await this.db.put(record, forceUpdate);
    }
  }
}
