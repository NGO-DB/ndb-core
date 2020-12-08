import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListAttendanceComponent } from "./list-attendance.component";
import { Database } from "../../../../core/database/database";
import { MockDatabase } from "../../../../core/database/mock-database";
import { EntityMapperService } from "../../../../core/entity/entity-mapper.service";
import { EntitySchemaService } from "../../../../core/entity/schema/entity-schema.service";
import { ChildrenService } from "../../children.service";
import { DatabaseIndexingService } from "../../../../core/entity/database-indexing/database-indexing.service";
import { ChildPhotoService } from "../../child-photo-service/child-photo.service";
import { FilterPipeModule } from "ngx-filter-pipe";
import { Child } from "../../model/child";
import { AttendanceMonth } from "../../../attendance/model/attendance-month";
import { of } from "rxjs";

describe("ListAttendanceComponent", () => {
  let component: ListAttendanceComponent;
  let fixture: ComponentFixture<ListAttendanceComponent>;

  beforeEach(async(() => {
    const photoMock: jasmine.SpyObj<ChildPhotoService> = jasmine.createSpyObj(
      "photoMock",
      ["getImage"]
    );
    TestBed.configureTestingModule({
      declarations: [ListAttendanceComponent],
      imports: [FilterPipeModule],
      providers: [
        { provide: Database, useClass: MockDatabase },
        EntityMapperService,
        EntitySchemaService,
        ChildrenService,
        DatabaseIndexingService,
        { provide: ChildPhotoService, useValue: photoMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load the attendance data for the child", (done) => {
    const testChild = new Child("testID");
    const month1 = new AttendanceMonth("month1");
    month1.month = new Date("2020-10-30");
    const month2 = new AttendanceMonth("month2");
    month2.month = new Date("2020-11-30");
    const month3 = new AttendanceMonth("month3");
    month3.month = new Date("2020-09-30");
    const childrenService = fixture.debugElement.injector.get(ChildrenService);
    spyOn(childrenService, "getAttendancesOfChild").and.returnValue(
      of([month1, month2, month3])
    );
    component.onInitFromDynamicConfig({
      entity: testChild,
    });
    expect(childrenService.getAttendancesOfChild).toHaveBeenCalledWith(
      testChild.getId()
    );
    setTimeout(() => {
      expect(component.attendanceList).toEqual([month2, month1, month3]);
      done();
    });
  });
});
