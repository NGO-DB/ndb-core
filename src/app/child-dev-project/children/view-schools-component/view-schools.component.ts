import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EditSchoolDialogComponent } from './edit-school-dialog/edit-school-dialog.component';
import { EntityMapperService } from '../../../core/entity/entity-mapper.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Child } from '../model/child';
import { LoggingService } from '../../../core/logging/logging.service';
import { ChildrenService } from '../children.service';
import { SchoolWithRelation } from '../../schools/model/schoolWithRelation';
import { ChildSchoolRelation } from '../model/childSchoolRelation';
import * as uniqueId from 'uniqid';

@Component({
  selector: 'app-view-schools-component',
  templateUrl: './view-schools.component.html',
  styleUrls: ['./view-schools.component.scss'],
})

export class ViewSchoolsComponent implements OnInit, OnChanges {

  @Input() public child: Child;
  private sort: MatSort;
  schoolsDataSource: MatTableDataSource<ChildSchoolRelation> = new MatTableDataSource();
  schoolsWithRelations: ChildSchoolRelation[] = [];
  displayedColumns: string[] = ['schoolName', 'class', 'startTime', 'endTime', 'results'];

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {    // Needed to set the mat sort later than ngAfterViewInit
    this.sort = ms;
    this.schoolsDataSource.sort = this.sort;
  }

  constructor(private entityMapperService: EntityMapperService, private dialog: MatDialog,
              private loggingService: LoggingService, private changeDetectionRef: ChangeDetectorRef,
              private childrenService: ChildrenService) {
  }

  ngOnInit() {
    this.schoolsDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'schoolName':
          return item.schoolId;
        case 'startTime':
          return item.start;
        case 'endTime':
          return item.end;
        case 'class':
          return item.schoolClass;
        case 'result':
          return item.result;
        default:
          return item[property];
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.child && changes.child.previousValue !== changes.child.currentValue) {  // Load new school when the input child is changed
      this.loadSchoolEntries();
    }
  }


  public loadSchoolEntries() {
    this.childrenService.getSchoolsWithRelations(this.child.getId())
      .then((schools: ChildSchoolRelation[]) => {
        this.schoolsWithRelations = schools;
        this.updateViewableItems();
        this.changeDetectionRef.detectChanges();
      },
        () => this.loggingService.error('[ViewSchoolsComponent] loading from database error.'),
      );
  }

  private updateViewableItems() {
    this.schoolsDataSource.data = this.schoolsWithRelations;

  }

  schoolClicked(viewableSchool: SchoolWithRelation) {
    const data = {
          entity: viewableSchool.childSchoolRelation,
          child: this.child,
    };
    this.showEditSchoolDialog(data);
  }


  addSchoolClick() {
    this.showEditSchoolDialog({
      entity: new ChildSchoolRelation(uniqueId()),
      child: this.child,
      creating: true,
    });
  }


  private showEditSchoolDialog(data) {
    this.dialog.open(EditSchoolDialogComponent, {data: data});
  }

  /**
   * returns a css-compatible color value from green to red using the given
   * input value
   * @param percent The percentage from 0-100 (both inclusive). 0 will be completely red, 100 will be completely green
   * Everything between will have suitable colors (orange, yellow,...)
   */

  private fromPercent(percent: number): string {
    // the hsv color-value is to be between 0 (red) and 120 (green)
    // percent is between 0-100, so we have to normalize it first
    const color = (percent / 100) * 120;
    return 'hsl(' + color + ', 70%, 65%)';
  }
}
