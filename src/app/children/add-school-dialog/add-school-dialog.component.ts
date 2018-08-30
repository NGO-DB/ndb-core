import {Component, Inject} from '@angular/core';
import {EntityMapperService} from "../../entity/entity-mapper.service";
import {ChildSchoolRelation} from "../childSchoolRelation";
import { School } from "../../schools/school";

import uniqid from 'uniqid';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-school-dialog',
  templateUrl: './add-school-dialog.component.html',
  styleUrls: ['./add-school-dialog.component.scss']
})
export class AddSchoolDialogComponent {

  public schools: School[];
  public selectedSchool: School;
  public childSchoolRelation: ChildSchoolRelation = new ChildSchoolRelation(uniqid());

  constructor(private entityMapperService: EntityMapperService,
              public dialogRef: MatDialogRef<AddSchoolDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.childSchoolRelation.childId = this.data.child.getId();
    this.entityMapperService.loadType<School>(School)
      .then((schools: School[]) => this.schools = schools)
  }

  public addSchoolClick() {
    this.childSchoolRelation.schoolId = this.selectedSchool.getId();
    console.log(this.childSchoolRelation);
    this.entityMapperService.save<ChildSchoolRelation>(this.childSchoolRelation)
      .then(() => this.dialogRef.close());
  }
}

