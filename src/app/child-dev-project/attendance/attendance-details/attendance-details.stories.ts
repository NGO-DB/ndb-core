import { Story, Meta } from "@storybook/angular/types-6-0";
import { moduleMetadata } from "@storybook/angular";
import { RecurringActivity } from "../model/recurring-activity";
import {
  ActivityAttendance,
  generateEventWithAttendance,
} from "../model/activity-attendance";
import { AttendanceStatus } from "../model/attendance-status";
import { AttendanceDetailsComponent } from "./attendance-details.component";
import { AttendanceModule } from "../attendance.module";
import { RouterTestingModule } from "@angular/router/testing";
import { FormDialogModule } from "../../../core/form-dialog/form-dialog.module";
import { EntityMapperService } from "../../../core/entity/entity-mapper.service";
import { Angulartics2Module } from "angulartics2";
import { FontAwesomeIconsModule } from "../../../core/icons/font-awesome-icons.module";
import { MatNativeDateModule } from "@angular/material/core";
import { EntitySubrecordModule } from "../../../core/entity-components/entity-subrecord/entity-subrecord.module";

const demoActivity = RecurringActivity.create("Coaching Batch C");
const activityAttendance = ActivityAttendance.create(new Date("2020-01-01"), [
  generateEventWithAttendance(
    {
      "1": AttendanceStatus.PRESENT,
      "2": AttendanceStatus.PRESENT,
      "3": AttendanceStatus.ABSENT,
    },
    new Date("2020-01-01")
  ),
  generateEventWithAttendance(
    {
      "1": AttendanceStatus.LATE,
      "2": AttendanceStatus.ABSENT,
    },
    new Date("2020-01-02")
  ),
  generateEventWithAttendance(
    {
      "1": AttendanceStatus.ABSENT,
      "2": AttendanceStatus.ABSENT,
    },
    new Date("2020-01-03")
  ),
  generateEventWithAttendance(
    {
      "1": AttendanceStatus.PRESENT,
      "2": AttendanceStatus.ABSENT,
    },
    new Date("2020-01-04")
  ),
]);
activityAttendance.events.forEach((e) => (e.subject = demoActivity.title));
activityAttendance.periodTo = new Date("2020-01-31");
activityAttendance.activity = demoActivity;

export default {
  title: "Child Dev Project/AttendanceDetails",
  component: AttendanceDetailsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AttendanceModule,
        EntitySubrecordModule,
        FormDialogModule,
        FontAwesomeIconsModule,
        RouterTestingModule,
        MatNativeDateModule,
        Angulartics2Module.forRoot(),
      ],
      declarations: [],
      providers: [{ provide: EntityMapperService, useValue: {} }],
    }),
  ],
} as Meta;

const Template: Story<AttendanceDetailsComponent> = (
  args: AttendanceDetailsComponent
) => ({
  component: AttendanceDetailsComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  entity: activityAttendance,
};

const activityAttendanceIndividual = Object.assign(
  new ActivityAttendance(),
  activityAttendance
);
activityAttendanceIndividual.focusedChild = "1";
export const ForIndividualChild = Template.bind({});
ForIndividualChild.args = {
  entity: activityAttendanceIndividual,
};
