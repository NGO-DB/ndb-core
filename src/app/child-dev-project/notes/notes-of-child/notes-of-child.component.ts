import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Note } from "../model/note";
import { NoteDetailsComponent } from "../note-details/note-details.component";
import { ChildrenService } from "../../children/children.service";
import moment from "moment";
import { SessionService } from "../../../core/session/session-service/session.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Child } from "../../children/model/child";
import { OnInitDynamicComponent } from "../../../core/view/dynamic-components/on-init-dynamic-component.interface";
import { ColumnDescriptionInputType } from "../../../core/entity-components/entity-subrecord/column-description-input-type.enum";
import { ColumnDescription } from "../../../core/entity-components/entity-subrecord/column-description";
import { PanelConfig } from "../../../core/entity-components/entity-details/EntityDetailsConfig";
import { ComponentWithConfig } from "../../../core/entity-components/entity-subrecord/entity-subrecord.component";

/**
 * The component that is responsible for listing the Notes that are related to a certain child
 */
@UntilDestroy()
@Component({
  selector: "app-notes-of-child",
  templateUrl: "./notes-of-child.component.html",
  styleUrls: ["./notes-of-child.component.scss"],
})
export class NotesOfChildComponent
  implements OnChanges, OnInitDynamicComponent {
  @Input() child: Child;
  records: Array<Note> = [];
  detailsComponent: ComponentWithConfig<Note> = {
    component: NoteDetailsComponent,
  };

  columns: Array<ColumnDescription> = [
    {
      name: "date",
      label: "Date",
      inputType: ColumnDescriptionInputType.DATE,
      visibleFrom: "xs",
    },
    {
      name: "subject",
      label: "Topic",
      inputType: ColumnDescriptionInputType.TEXT,
      visibleFrom: "xs",
    },
    {
      name: "text",
      label: "Notes",
      inputType: ColumnDescriptionInputType.TEXTAREA,
      visibleFrom: "md",
    },
    {
      name: "author",
      label: "SW",
      inputType: ColumnDescriptionInputType.TEXT,
      visibleFrom: "md",
    },
    {
      name: "warningLevel",
      label: "",
      inputType: ColumnDescriptionInputType.SELECT,
      selectValues: [
        { value: "OK", label: "Solved" },
        { value: "WARNING", label: "Needs Follow-Up" },
        { value: "URGENT", label: "Urgent Follow-Up" },
      ],
      valueFunction: () => "",
      visibleFrom: "md",
    },
  ];

  constructor(
    private childrenService: ChildrenService,
    private sessionService: SessionService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("child")) {
      this.initNotesOfChild();
    }
  }

  onInitFromDynamicConfig(config: PanelConfig) {
    if (config?.config?.displayedColumns) {
      this.columns = this.columns.filter((c) =>
        config.config.displayedColumns.includes(c.name)
      );
    }

    this.child = config.entity as Child;
    this.initNotesOfChild();
  }

  private initNotesOfChild() {
    this.childrenService
      .getNotesOfChild(this.child.getId())
      .pipe(untilDestroyed(this))
      .subscribe((notes: Note[]) => {
        notes.sort((a, b) => {
          if (!a.date && b.date) {
            // note without date should be first
            return -1;
          }
          return moment(b.date).valueOf() - moment(a.date).valueOf();
        });
        this.records = notes;
      });
  }

  generateNewRecordFactory() {
    // define values locally because "this" is a different scope after passing a function as input to another component
    const user = this.sessionService.getCurrentUser()
      ? this.sessionService.getCurrentUser().name
      : "";
    const childId = this.child.getId();

    return () => {
      const newNote = new Note(Date.now().toString());
      newNote.date = new Date();
      newNote.addChild(childId);
      newNote.author = user;

      return newNote;
    };
  }

  /**
   * returns the color for a note; passed to the entity subrecored component
   * @param note note to get color for
   */
  getColor = (note: Note) => note?.getColorForId(this.child.getId());
}
