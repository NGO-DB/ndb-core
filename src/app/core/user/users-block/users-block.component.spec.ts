import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";

import { EntityMapperService } from "../../entity/entity-mapper.service";
import { User } from "../user";
import { Entity } from "../../entity/entity";
import { UsersBlockComponent } from "./users-block.component";

class TestEntity extends Entity {
  static create(userIds: string[]) {
    const entity = new TestEntity();
    entity.userIds = userIds;
    return entity;
  }
  userIds: string[] = [];
}

describe("UsersBlockComponent", () => {
  let component: UsersBlockComponent;
  let fixture: ComponentFixture<UsersBlockComponent>;

  const commonThreshold = 2;

  let testUsers: User[] = [];
  const mockEntityMapperService = jasmine.createSpyObj("EntityMapperService", [
    "loadType",
  ]);

  beforeEach(async () => {
    testUsers = ["UserA", "demo", "demoAdmin", "UserB"].map((name) => {
      const user = new User();
      user.name = name;
      return user;
    });
    mockEntityMapperService.loadType.and.returnValue(
      Promise.resolve(testUsers)
    );
    await TestBed.configureTestingModule({
      declarations: [UsersBlockComponent],
      providers: [
        {
          provide: EntityMapperService,
          useValue: mockEntityMapperService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load all users when given as id's", fakeAsync(() => {
    component.inputType = "id";
    component.entities = testUsers.slice(2, 3).map((u) => u.getId());
    tick();
    expect(component.users).toEqual(testUsers.slice(2, 3));
  }));

  it("should load all users when given as entities", fakeAsync(() => {
    component.inputType = "entity";
    component.entities = testUsers.slice(2, 3);
    tick();
    expect(component.users).toEqual(testUsers.slice(2, 3));
  }));

  it("shows all users up to the threshold", () => {
    component.maxUserThreshold = commonThreshold;
    [1, 2].forEach((userCount) => {
      component.users = testUsers.slice(0, userCount);
      const expectedString = testUsers
        .slice(0, userCount)
        .map((u) => u.name)
        .join(", ");
      expect(component.authorNames).toEqual(expectedString);
    });
  });

  it("only shows the users up to a threshold when more than the threshold are given", () => {
    [3, 4].forEach((userCount) => {
      component.users = testUsers.slice(0, userCount);
      const expectedString = testUsers
        .slice(0, commonThreshold)
        .map((u) => u.name)
        .join(", ");
      expect(component.authorNames).toEqual(expectedString);
    });
  });

  it("knows how many remaining users exist if more users than the threshold are given", () => {
    component.maxUserThreshold = commonThreshold;
    console.log(testUsers);
    [3, 4].forEach((userCount) => {
      component.users = testUsers.slice(0, userCount);
      expect(component.additionalUsers).toBe(userCount - commonThreshold);
    });
  });

  it("inits from the config", fakeAsync(() => {
    const testEntity = TestEntity.create(
      testUsers.slice(0, 2).map((e) => e.getId())
    );
    component.onInitFromDynamicConfig({ entity: testEntity, id: "userIds" });
    tick();
    expect(component.users).toEqual(testUsers.splice(0, 2));
  }));
});