import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from "@angular/core/testing";
import { FormComponent } from "./form.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { EntityDetailsModule } from "../entity-details.module";
import { EntityMapperService } from "../../../entity/entity-mapper.service";
import { SessionService } from "../../../session/session-service/session.service";
import { User } from "../../../user/user";
import { ChildPhotoService } from "../../../../child-dev-project/children/child-photo-service/child-photo.service";
import { AlertService } from "../../../alerts/alert.service";
import { Child } from "../../../../child-dev-project/children/model/child";
import { ConfigService } from "../../../config/config.service";
import { Entity } from "../../../entity/entity";
import { DatabaseField } from "../../../entity/database-field.decorator";
import { EntitySchemaService } from "../../../entity/schema/entity-schema.service";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let mockChildPhotoService: jasmine.SpyObj<ChildPhotoService>;
  let mockSessionService: jasmine.SpyObj<SessionService>;
  let mockConfigService: jasmine.SpyObj<ConfigService>;
  let mockEntityMapper: jasmine.SpyObj<EntityMapperService>;
  let mockEntitySchemaService: jasmine.SpyObj<EntitySchemaService>;

  const testChild = new Child("Test Name");

  beforeEach(
    waitForAsync(() => {
      mockChildPhotoService = jasmine.createSpyObj([
        "canSetImage",
        "setImage",
        "getImage",
      ]);
      mockSessionService = jasmine.createSpyObj({
        getCurrentUser: new User("test-user"),
      });
      mockConfigService = jasmine.createSpyObj(["getConfig"]);
      mockEntityMapper = jasmine.createSpyObj(["save"]);
      mockEntityMapper.save.and.resolveTo();
      mockEntitySchemaService = jasmine.createSpyObj([
        "getComponent",
        "registerSchemaDatatype",
      ]);

      TestBed.configureTestingModule({
        declarations: [FormComponent],
        imports: [
          EntityDetailsModule,
          NoopAnimationsModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: EntityMapperService, useValue: mockEntityMapper },
          { provide: ChildPhotoService, useValue: mockChildPhotoService },
          { provide: SessionService, useValue: mockSessionService },
          { provide: ConfigService, useValue: mockConfigService },
          { provide: EntitySchemaService, useValue: mockEntitySchemaService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    testChild.name = "Test Name";
    mockChildPhotoService.canSetImage.and.returnValue(false);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.onInitFromDynamicConfig({
      entity: testChild,
      config: { cols: [] },
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should change the creating state", () => {
    expect(component.creatingNew).toBe(false);
    component.onInitFromDynamicConfig({
      entity: testChild,
      config: { cols: [] },
      creatingNew: true,
    });
    expect(component.creatingNew).toBe(true);
  });

  it("calls router once a new child is saved", async () => {
    spyOnProperty(component.form, "valid").and.returnValue(true);
    const router = fixture.debugElement.injector.get(Router);
    spyOn(router, "navigate");
    component.creatingNew = true;
    await component.save();
    expect(router.navigate).toHaveBeenCalledWith(["", testChild.getId()]);
  });

  it("reports error when form is invalid", () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    spyOn(alertService, "addDanger");
    spyOnProperty(component.form, "invalid").and.returnValue(true);

    return expectAsync(component.save()).toBeRejected();
  });

  it("logs error when saving fails", () => {
    const alertService = fixture.debugElement.injector.get(AlertService);
    spyOn(alertService, "addDanger");
    spyOnProperty(component.form, "valid").and.returnValue(true);
    mockEntityMapper.save.and.rejectWith("error");

    return expectAsync(component.save()).toBeRejected();
  });

  it("should add column definitions from property schema", () => {
    class Test extends Entity {
      @DatabaseField() propertyField: string;
    }
    mockEntitySchemaService.getComponent.and.returnValue("PredefinedComponent");

    component.onInitFromDynamicConfig({
      entity: new Test(),
      config: {
        cols: [
          [
            {
              id: "fieldWithDefinition",
              input: "InputComponent",
              view: "DisplayComponent",
              placeholder: "Field with definition",
            },
            { id: "propertyField", placeholder: "Property" },
          ],
        ],
      },
    });

    expect(component.columns).toEqual([
      [
        {
          id: "fieldWithDefinition",
          input: "InputComponent",
          view: "DisplayComponent",
          placeholder: "Field with definition",
        },
        {
          id: "propertyField",
          input: "PredefinedComponent",
          view: "PredefinedComponent",
          placeholder: "Property",
        },
      ],
    ]);
  });
});
