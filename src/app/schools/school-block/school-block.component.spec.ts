import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBlockComponent } from './school-block.component';
import {RouterTestingModule} from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {MockDatabase} from '../../database/mock-database';
import {School} from '../school';
import {ChildrenService} from '../../children/children.service';

describe('SchoolBlockComponent', () => {
  let component: SchoolBlockComponent;
  let fixture: ComponentFixture<SchoolBlockComponent>;

  beforeEach(async(() => {
    const entityMapper = new EntityMapperService(new MockDatabase());

    TestBed.configureTestingModule({
      declarations: [ SchoolBlockComponent ],
      imports: [RouterTestingModule, MatIconModule],
      providers: [
        {provide: EntityMapperService, useValue: entityMapper},
        ChildrenService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolBlockComponent);
    component = fixture.componentInstance;
    component.entity = new School('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
