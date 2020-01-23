import {NoteManagerComponent} from './note-manager.component';
import {EntityMapperService} from '../../entity/entity-mapper.service';
import {EntitySchemaService} from '../../entity/schema/entity-schema.service';
import {NoteModel} from '../note.model';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotesModule} from '../notes.module';
import {MatNativeDateModule} from '@angular/material/core';
import {ConfirmationDialogService} from '../../ui-helper/confirmation-dialog/confirmation-dialog.service';
import {ChildrenService} from '../../children/children.service';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../session/session.service';
import {Database} from '../../database/database';
import {MockDatabase} from '../../database/mock-database';

function generateNewNoteModels(): Array<NoteModel> {
  let i;
  const notes: Array<NoteModel> = [];
  for (i = 0; i < 10; i++) {
    const note = new NoteModel('' + i);
    notes.push(note);
  }
  return notes;
}

const database: Database = new MockDatabase();
const testNotes =  generateNewNoteModels();

describe('NoteManagerComponent', () => {

  let component: NoteManagerComponent;
  let fixture: ComponentFixture<NoteManagerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NotesModule,
        MatNativeDateModule],
      providers: [
        EntitySchemaService,
        EntityMapperService,
        ConfirmationDialogService,
        ChildrenService,
        FormBuilder,
        SessionService,
        {provide: Database, useValue: database}
      ]
    })
      .compileComponents();
  });

  beforeEach (() => {
    fixture = TestBed.createComponent(NoteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const entityMapperService = fixture.debugElement.injector.get(EntityMapperService);
    testNotes.forEach(note => entityMapperService.save(note));
  });

  it('should create', function () {
    expect(component).toBeTruthy();
  });

  it('should load all data after initializing', async function () {
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.entityList.length).toEqual(testNotes.length);
  });

});
