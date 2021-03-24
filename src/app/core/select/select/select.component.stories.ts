import { SelectComponent } from "./select.component";
import { Meta, Story } from "@storybook/angular/types-6-0";
import { Entity } from "../../entity/entity";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { Angulartics2Module } from "angulartics2";

export default {
  title: "Core/select-component",
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatChipsModule,
        Angulartics2Module.forRoot(),
      ]
    }),
  ],
} as Meta;

const genericEntities: Entity[] = ["A", "B", "C"].map((e) => new Entity(e));

const Template: Story<SelectComponent<Entity>> = (
  args: SelectComponent<Entity>
) => ({
  component: SelectComponent,
  props: args,
});

export const Generic = Template.bind({});
Generic.args = {
  label: "Generic",
  entities: genericEntities,
};