import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SearchComponent } from "./search.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ChildrenModule } from "../../../child-dev-project/children/children.module";
import { SchoolsModule } from "../../../child-dev-project/schools/schools.module";
import { EntitySchemaService } from "../../entity/schema/entity-schema.service";
import { Child } from "../../../child-dev-project/children/model/child";
import { School } from "../../../child-dev-project/schools/model/school";
import { RouterTestingModule } from "@angular/router/testing";
import { EntityBlockModule } from "../../entity-components/entity-block/entity-block.module";
import { DatabaseIndexingService } from "../../entity/database-indexing/database-indexing.service";
import { Subscription } from "rxjs";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let mockIndexService: jasmine.SpyObj<DatabaseIndexingService>;
  const entitySchemaService = new EntitySchemaService();
  let subscription: Subscription;

  beforeEach(
    waitForAsync(() => {
      mockIndexService = jasmine.createSpyObj("mockIndexService", [
        "queryIndexRaw",
        "createIndex",
      ]);

      TestBed.configureTestingModule({
        imports: [
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          MatAutocompleteModule,
          CommonModule,
          FormsModule,
          NoopAnimationsModule,
          ChildrenModule,
          SchoolsModule,
          MatToolbarModule,
          RouterTestingModule,
          EntityBlockModule,
          ReactiveFormsModule,
        ],
        providers: [
          { provice: EntitySchemaService, useValue: entitySchemaService },
          { provide: DatabaseIndexingService, useValue: mockIndexService },
        ],
        declarations: [SearchComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    subscription?.unsubscribe();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockIndexService.createIndex).toHaveBeenCalled();
  });

  it("should not search for less than MIN_CHARACTERS_FOR_SEARCH character of input", (done) => {
    const tests = ["A", "AB"];
    let iteration = 0;
    subscription = component.results.subscribe((next) => {
      iteration++;
      expect(next).toHaveSize(0);
      expect(mockIndexService.queryIndexRaw).not.toHaveBeenCalled();
      if (iteration === 2) {
        done();
      }
    });
    tests.forEach((t, index) => {
      setTimeout(() => component.formControl.setValue(t), 600 * index); // debounce
    });
  });

  it("should not search for less than one real character of input", (done) => {
    subscription = component.results.subscribe((next) => {
      expect(next).toHaveSize(0);
      expect(mockIndexService.queryIndexRaw).not.toHaveBeenCalled();
      done();
    });
    component.formControl.setValue("   ");
  });

  it("should reset results if a a null search is performed", (done) => {
    subscription = component.results.subscribe((next) => {
      expect(next).toHaveSize(0);
      expect(mockIndexService.queryIndexRaw).not.toHaveBeenCalled();
      done();
    });
    component.formControl.setValue(null);
  });

  it("should set results correctly for search input", (done) => {
    const child1 = new Child("1");
    child1.name = "Adam X";
    const school1 = new School("s1");
    school1.name = "Anglo Primary";
    const mockQueryResults = {
      rows: [
        {
          id: child1._id,
          doc: {},
          key: child1.name.toLowerCase(),
        },
        {
          id: school1._id,
          doc: {},
          key: school1.name.toLowerCase(),
        },
      ],
    };
    mockIndexService.queryIndexRaw.and.returnValue(
      Promise.resolve(mockQueryResults)
    );

    subscription = component.results.subscribe((next) => {
      expect(next).toHaveSize(1);
      expect(next[0].getId()).toEqual(child1.getId());
      expect(mockIndexService.queryIndexRaw).toHaveBeenCalled();
      done();
    });
    component.formControl.setValue("Ada");
  });

  it("should not include duplicates in results", (done) => {
    const child1 = new Child("1");
    child1.name = "Adam Ant";

    const mockQueryResults = {
      rows: [
        { id: child1.getId(), doc: {}, key: "adam" },
        { id: child1.getId(), doc: {}, key: "adam" }, // may be returned twice from db if several indexed values match the search
      ],
    };
    mockIndexService.queryIndexRaw.and.returnValue(
      Promise.resolve(mockQueryResults)
    );

    subscription = component.results.subscribe((next) => {
      expect(next).toHaveSize(1);
      expect(next[0].getId()).toEqual(child1.getId());
      expect(mockIndexService.queryIndexRaw).toHaveBeenCalled();
      done();
    });
    component.formControl.setValue("Ada");
  });
});
