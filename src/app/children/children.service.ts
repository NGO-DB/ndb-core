import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Child} from './child';
import {EntityMapperService} from '../entity/entity-mapper.service';
import {AttendanceMonth} from './attendance/attendance-month';
import {Database} from '../database/database';
import {Note} from './notes/note';
import {EducationalMaterial} from './educational-material/educational-material';
import {Aser} from './aser/aser';
import {ChildSchoolRelation} from './childSchoolRelation';
import {School} from '../schools/school';
import {SchoolWithRelation} from '../schools/schoolWithRelation';
import {HealthCheck} from './health-checkup/health-check';
import {EntitySchemaService} from '../entity/schema/entity-schema.service';

@Injectable()
export class ChildrenService {

  constructor(private entityMapper: EntityMapperService,
              private entitySchemaService: EntitySchemaService,
              private db: Database) {
    this.createAttendanceAnalysisIndex();
    this.createNotesIndex();
    this.createAttendancesIndex();
    this.createChildSchoolRelationIndex();
<<<<<<< HEAD
    // this.createPerformanceData();

  }

  async createPerformanceData() {
    const school = new School('test-school');
    await this.entityMapper.save<School>(school);
    for (let i = 1; i <= 500; i++) {
      const child = new Child('test-child-' + i);
      child.name = 'TestChild:' + i;
      await this.entityMapper.save<Child>(child);
      const relation = new ChildSchoolRelation('test-relation-' + i);
      relation.childId = child.getId();
      relation.schoolId = school.getId();
      const year = 1500 + i;
      relation.start = '' + year + '-04-18';
      await this.entityMapper.save<ChildSchoolRelation>(relation);
      for (let j = 0; j < 15; j++) {
        const note = new Note('test-note-' + i + '-' + j);
        note.children = [child.getId()];
        await this.entityMapper.save<Note>(note);
      }
    }
  }

  async getChildrenWithRelation(): Promise<ChildWithRelation[]> {
    const children = await this.entityMapper.loadType<Child>(Child);
    const childrenIds = children.map(child => child.getId());

    // const childSchoolRelations = await this.entityMapper.loadType<ChildSchoolRelation>(ChildSchoolRelation);

    let sChildId = '';
    let dLatestDate;
    const mResultMap = {};
    let schools: School[] = await this.entityMapper.loadType<School>(School);
    let schoolMap = {}
    schools.forEach(school => {
        schoolMap[school.getId()] = school;
    });
    await this.db.query('childSchoolRelations_index/by_child', {keys: childrenIds, include_docs: true})
      .then(loadedEntities => {
        loadedEntities.rows.forEach(relationEntity => {
          if (relationEntity.doc.childId === sChildId && relationEntity.doc.start <= dLatestDate) return;

          if (relationEntity.doc.childId !== sChildId) {
            // new child entry found
            sChildId = relationEntity.doc.childId;
          }
          dLatestDate = relationEntity.doc.start;

          const entity = new ChildSchoolRelation('');
          entity.load(relationEntity.doc);
          mResultMap[sChildId] = entity;
        });
      });
      const tableData: ChildWithRelation[] = [];

      children.forEach(child => {
        const relation: ChildSchoolRelation = mResultMap[child.getId()];
        if (relation) {
            tableData.push(new ChildWithRelation(child, relation, schoolMap[relation.schoolId]));
        } else {
            tableData.push(new ChildWithRelation(child, relation));
        }
      });
    
    return tableData;
  }

  async getChildWithRelation(childId: string): Promise<ChildWithRelation> {
    const child = await this.entityMapper.load<Child>(Child, childId);
    const relation = await this.queryLatestRelation(childId);
    return new ChildWithRelation(child, relation);
  }
=======
  }

>>>>>>> b00e7b5d77eee938176d92f96410785c2f55f1a3

  getChildren(): Observable<Child[]> {
    return from(this.entityMapper.loadType<Child>(Child));
  }
  getChild(id: string): Observable<Child> {
    return from(this.entityMapper.load<Child>(Child, id));
  }

  getAttendances(): Observable<AttendanceMonth[]> {
    return from(this.entityMapper.loadType<AttendanceMonth>(AttendanceMonth));
  }

  getAttendancesOfChild(childId: string): Observable<AttendanceMonth[]> {
    const promise = this.db.query('attendances_index/by_child', {key: childId, include_docs: true})
      .then(loadedEntities => {
        return loadedEntities.rows.map(loadedRecord => {
          const entity = new AttendanceMonth('');
          this.entitySchemaService.loadDataIntoEntity(entity, loadedRecord.doc);
          return entity;
        });
      });

    return from(promise);
  }

  getAttendancesOfMonth(month: Date): Observable<AttendanceMonth[]> {
    const monthString = month.getFullYear().toString() + '-' + (month.getMonth() + 1).toString();
    const promise = this.db.query('attendances_index/by_month', {key: monthString, include_docs: true})
      .then(loadedEntities => {
        return loadedEntities.rows.map(loadedRecord => {
          const entity = new AttendanceMonth('');
          this.entitySchemaService.loadDataIntoEntity(entity, loadedRecord.doc);
          return entity;
        });
      });

    return from(promise);
  }

  private createAttendancesIndex(): Promise<any> {
    const designDoc = {
      _id: '_design/attendances_index',
      views: {
        by_child: {
          map: '(doc) => { ' +
            'if (!doc._id.startsWith("' + AttendanceMonth.ENTITY_TYPE + '")) return;' +
            'emit(doc.student); ' +
            '}'
        },
        by_month: {
          map: '(doc) => { ' +
            'if (!doc._id.startsWith("' + AttendanceMonth.ENTITY_TYPE + '")) return;' +
            'emit(doc.month); ' +
            '}'
        }
      }
    };

    return this.db.saveDatabaseIndex(designDoc);
  }

  private createChildSchoolRelationIndex(): Promise<any> {

    const designDoc = {
      _id: '_design/childSchoolRelations_index',
      views: {
        by_child: {
          map: `(doc) => {
            if (!doc._id.startsWith("${ChildSchoolRelation.ENTITY_TYPE}")) return;
            emit(doc.childId);
            }`
        },
        by_school: {
          map: `(doc) => {
            if (!doc._id.startsWith("${ChildSchoolRelation.ENTITY_TYPE}")) return;
            if (doc.end) return;
            emit(doc.schoolId);
            }`
        },
        by_date: {
          map: `(doc) => {
            if (!doc._id.startsWith("${ChildSchoolRelation.ENTITY_TYPE}")) return;
            emit(doc.childId + '_' + (new Date(doc.start)).getTime().toString().padStart(14, "0"));
            }`
        }

      }
    };
    return this.db.saveDatabaseIndex(designDoc);
  }

  queryLatestRelation(childId: string): Promise<ChildSchoolRelation> {
<<<<<<< HEAD
    return this.querySortedRelations(childId, 1).then(children => children[0])
  } 
=======
    return this.querySortedRelations(childId, 1).then(children => children[0]);
 }
>>>>>>> b00e7b5d77eee938176d92f96410785c2f55f1a3

 querySortedRelations(childId: string, limit?: number): Promise<ChildSchoolRelation[]> {
    const options: any = {
      startkey: childId + '_' + '\uffff', //  higher value needs to be startkey
      endkey: childId + '_',              //  \uffff is not a character -> only relations staring with childId will be selected
      descending: true,
      include_docs: true,
      limit: limit
    };
    return this.db.query(
      'childSchoolRelations_index/by_date',
      options
    )
      .then(loadedEntities => {
        return loadedEntities.rows.map(loadedRecord => {
          const entity = new ChildSchoolRelation('');
          this.entitySchemaService.loadDataIntoEntity(entity, loadedRecord.doc);
          return entity;
        });
      });
 }

  queryRelationsOfChild(childId: string): Promise<ChildSchoolRelation[]> {
    return this.db.query('childSchoolRelations_index/by_child', {key: childId, include_docs: true})
      .then(loadedEntities => {
        return loadedEntities.rows.map(loadedRecord => {
          const entity = new ChildSchoolRelation('');
          this.entitySchemaService.loadDataIntoEntity(entity, loadedRecord.doc);
          return entity;
        });
      });

  }

  queryAttendanceLast3Months() {
    return this.db.query('avg_attendance_index/three_months', {reduce: true, group: true});
  }

  queryAttendanceLastMonth() {
    return this.db.query('avg_attendance_index/last_month', {reduce: true, group: true});
  }


  private createAttendanceAnalysisIndex(): Promise<any> {
    const designDoc = {
      _id: '_design/avg_attendance_index',
      views: {
        three_months: {
          map: this.getAverageAttendanceMapFunction(),
          reduce: '_stats'
        },
        last_month: {
          map: this.getLastAverageAttendanceMapFunction(),
          reduce: '_stats'
        }
      }
    };

    return this.db.saveDatabaseIndex(designDoc);
  }


  private getAverageAttendanceMapFunction () {
    return '(doc) => {' +
      'if (!doc._id.startsWith("AttendanceMonth:") ) { return; }' +
      'if (!isWithinLast3Months(new Date(doc.month), new Date())) { return; }' +
      'var attendance = (doc.daysAttended / (doc.daysWorking - doc.daysExcused));' +
      'if (!isNaN(attendance)) { emit(doc.student, attendance); }' +
      'function isWithinLast3Months(date, now) {' +
      '  let months;' +
      '  months = (now.getFullYear() - date.getFullYear()) * 12;' +
      '  months -= date.getMonth();' +
      '  months += now.getMonth();' +
      '  if (months < 0) { return false; }' +
      '  return months <= 3;' +
      '}' +
      '}';
  }

  private getLastAverageAttendanceMapFunction () {
    return '(doc) => {' +
      'if (!doc._id.startsWith("AttendanceMonth:")) { return; }' +
      'if (!isWithinLastMonth(new Date(doc.month), new Date())) { return; }' +
      'var attendance = (doc.daysAttended / (doc.daysWorking - doc.daysExcused));' +
      'if (!isNaN(attendance)) { emit(doc.student, attendance); }' +
      'function isWithinLastMonth(date, now) {' +
      '  let months;' +
      '  months = (now.getFullYear() - date.getFullYear()) * 12;' +
      '  months -= date.getMonth();' +
      '  months += now.getMonth();' +
      '  return months === 1;' +
      '}' +
      '}';
  }

  getNotesOfChild(childId: string): Observable<Note[]> {
    const promise = this.db.query('notes_index/by_child', {key: childId, include_docs: true})
      .then(loadedEntities => {
        return loadedEntities.rows.map(loadedRecord => {
          const entity = new Note('');
          this.entitySchemaService.loadDataIntoEntity(entity, loadedRecord.doc);
          return entity;
        });
      });

    return from(promise);
  }

  private createNotesIndex(): Promise<any> {
    const designDoc = {
      _id: '_design/notes_index',
      views: {
        by_child: {
          map: '(doc) => { ' +
            'if (!doc._id.startsWith("' + Note.ENTITY_TYPE + '")) return;' +
            'doc.children.forEach(childId => emit(childId)); ' +
            '}'
        }
      }
    };

    return this.db.saveDatabaseIndex(designDoc);
  }

  getEducationalMaterialsOfChild(childId: string): Observable<EducationalMaterial[]> {
    return from(
      this.entityMapper.loadType<EducationalMaterial>(EducationalMaterial)
        .then(loadedEntities => {
          return loadedEntities.filter(o => o.child === childId);
        })
    );
  }

  /**
   *
   * @param childId should be set in the specific components and is passed by the URL as a parameter
   * This function should be considered refactored and should use a index, once they're made generic
   */
  getHealthChecksOfChild(childId: string): Observable<HealthCheck[]> {
    return from(
      this.entityMapper.loadType<HealthCheck>(HealthCheck)
      .then(loadedEntities => {
        return loadedEntities.filter(h => h.child === childId);
      })
    );
  }

  getAserResultsOfChild(childId: string): Observable<Aser[]> {
    return from(
      this.entityMapper.loadType<Aser>(Aser)
        .then(loadedEntities => {
          return loadedEntities.filter(o => o.child === childId);
        })
    );
  }

  getCurrentSchool(childId: string): Promise<School> {
    return this.queryLatestRelation(childId)
      .then(relation => {
        if (relation) {
         return this.entityMapper.load<School>(School, relation.schoolId);
        }
        return null;
      });
  }

  async getSchoolsWithRelations(childId: string): Promise<SchoolWithRelation[]> {
    const relations = await this.querySortedRelations(childId);
    const schools: SchoolWithRelation[] = [];
    for (const relation of relations) {
      const school: School = await this.entityMapper.load<School>(School, relation.schoolId);
      schools.push(new SchoolWithRelation(relation, school));
    }
    return schools;
  }
}
