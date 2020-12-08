import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { ChildrenListComponent } from "./children-list.component";
import { ChildrenService } from "../children.service";
import { MockDatabase } from "../../../core/database/mock-database";
import { Database } from "../../../core/database/database";
import { RouterTestingModule } from "@angular/router/testing";
import { ExportDataComponent } from "../../../core/admin/export-data/export-data.component";
import { ChildPhotoService } from "../child-photo-service/child-photo.service";
import { SessionService } from "../../../core/session/session-service/session.service";
import { User } from "app/core/user/user";
import { of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ChildrenModule } from "../children.module";
import { Angulartics2Module } from "angulartics2";
import { Child } from "../model/child";

describe("ChildrenListComponent", () => {
  let component: ChildrenListComponent;
  let fixture: ComponentFixture<ChildrenListComponent>;
  const routeData = {
    title: "Children List",
    columns: [
      { type: "DisplayText", title: "PN", id: "projectNumber" },
      { type: "ChildBlock", title: "Name", id: "name" },
      { type: "DisplayDate", title: "DoB", id: "dateOfBirth" },
      { type: "DisplayText", title: "Gender", id: "gender" },
      { type: "DisplayText", title: "Class", id: "schoolClass" },
      { type: "DisplayText", title: "School", id: "schoolId" },
      { type: "ListAttendance", title: "Attendance (School)", id: "school" },
    ],
    columnGroups: {
      default: "Basic Info",
      mobile: "School Info",
      groups: [
        {
          name: "Basic Info",
          columns: ["projectNumber", "name", "dateOfBirth"],
        },
        {
          name: "School Info",
          columns: ["name", "schoolClass", "schoolId", "school"],
        },
      ],
    },
    filters: [
      {
        id: "isActive",
        type: "boolean",
        default: "true",
        true: "Currently active children",
        false: "Currently inactive children",
        all: "All children",
      },
      {
        id: "center",
      },
    ],
  };
  const routeMock = {
    data: of(routeData),
    queryParams: of({}),
  };

  beforeEach(async(() => {
    const mockSessionService = jasmine.createSpyObj(["getCurrentUser"]);
    mockSessionService.getCurrentUser.and.returnValue(new User("test1"));
    TestBed.configureTestingModule({
      declarations: [ChildrenListComponent, ExportDataComponent],

      imports: [
        ChildrenModule,
        RouterTestingModule,
        Angulartics2Module.forRoot(),
      ],
      providers: [
        {
          provide: SessionService,
          useValue: mockSessionService,
        },
        { provide: Database, useClass: MockDatabase },
        {
          provide: ChildPhotoService,
          useValue: jasmine.createSpyObj(["getImage"]),
        },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenListComponent);
    component = fixture.componentInstance;
    const router = fixture.debugElement.injector.get(Router);
    fixture.ngZone.run(() => router.initialNavigation());
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load children on init", fakeAsync(() => {
    const child1 = new Child("c1");
    const child2 = new Child("c2");
    const childrenService = fixture.debugElement.injector.get(ChildrenService);
    spyOn(childrenService, "getChildren").and.returnValue(of([child1, child2]));
    component.ngOnInit();
    tick();
    expect(childrenService.getChildren).toHaveBeenCalled();
    expect(component.childrenList).toEqual([child1, child2]);
  }));

  it("should route to the given id", () => {
    const router = fixture.debugElement.injector.get(Router);
    spyOn(router, "navigate");
    component.routeTo("childId");
    expect(router.navigate).toHaveBeenCalledWith(["/child", "childId"]);
  });
});
