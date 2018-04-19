import { Injectable } from "@angular/core";

import { Medium } from "./Medium";
import { School } from "./school";
import { Student } from "./students";

@Injectable()
export class SchoolsServices {
  schools: School[];

  //Example dummy data, data should be loaded from puchdb
  constructor() {
    this.schools = [
      new School(
        1,
        'Primary',
        'India, asdw',
        [
          new Student(
            1,
            'Max Mustermann',
            10
          ),
          new Student(
            2,
            'Thomas Müller',
            12
          )
        ],
        Medium.HINDI
      ),
      new School(
        2,
        'Secondary',
        'India, wasjk',
        [
          new Student(
            3,
            'Franz Josef',
            7
          ),
          new Student(
            4,
            'Rene Adler',
            13
          )
        ],
        Medium.BENGALI
      )
    ];
  }

  getAll() {
    return  this.schools;
  }

  getSingle(id) {
    return this.schools.find(school => school.id === id);
  }
}
