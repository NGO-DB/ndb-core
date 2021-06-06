import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EntityBlockComponent } from "./entity-block.component";

describe("EntityBlockComponent", () => {
  let component: EntityBlockComponent<any>;
  let fixture: ComponentFixture<EntityBlockComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
