import { Story, Meta } from "@storybook/angular/types-6-0";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ConfigurableEnumModule } from "../../../core/configurable-enum/configurable-enum.module";
import { NotesModule } from "../notes.module";
import { NoteDetailsComponent } from "./note-details.component";
import { Note } from "../model/note";
import { RouterTestingModule } from "@angular/router/testing";
import { EntityMapperService } from "../../../core/entity/entity-mapper.service";
import { MatNativeDateModule } from "@angular/material/core";
import { Angulartics2Module } from "angulartics2";

export default {
  title: "Child Dev Project/NoteDetails",
  component: NoteDetailsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        RouterTestingModule,
        MatNativeDateModule,
        Angulartics2Module.forRoot(),
        ConfigurableEnumModule,
        NotesModule,
      ],
      providers: [{ provide: EntityMapperService, useValue: {} }],
    }),
  ],
} as Meta;

const Template: Story<NoteDetailsComponent> = (args: NoteDetailsComponent) => ({
  component: NoteDetailsComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  entity: new Note(),
};
