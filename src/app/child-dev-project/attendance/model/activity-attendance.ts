import { Note } from "../../notes/model/note";
import {
  AttendanceCounting,
  AttendanceStatus,
  DEFAULT_ATTENDANCE_TYPES,
} from "./attendance-status";
import { Entity } from "../../../core/entity/entity";
import { RecurringActivity } from "./recurring-activity";

/**
 * Aggregate information about all events for a {@link RecurringActivity} within a given time period.
 *
 * This object is not saved in the database but instead generated dynamically from stored Events
 * to avoid problems keeping all information in sync in the database.
 */
export class ActivityAttendance extends Entity {
  /**
   * Create an instance with the given initial properties.
   */
  static create(from: Date, events: Note[] = []) {
    const instance = new ActivityAttendance();
    instance.periodFrom = from;
    instance.events = events;
    return instance;
  }

  /**
   * Starting date of the period this data refers to
   */
  periodFrom: Date;
  /**
   * End date of the period this data refers to
   */
  periodTo: Date;

  /**
   * Events within the period relating to the activity
   */
  events: Note[] = [];

  /**
   * The general, recurring activity for which this instance aggregates actual events that took place within a limited time period.
   */
  activity: RecurringActivity;

  countEventsTotal(): number {
    return this.events.length;
  }

  countEventsWithStatusForChild(
    status: AttendanceStatus,
    childId: string
  ): number {
    return this.events.reduce(
      (prev: number, currentEvent: Note) =>
        currentEvent.getAttendance(childId)?.status === status
          ? prev + 1
          : prev,
      0
    );
  }

  countEventsWithUnknownStatus(): number {
    return this.events.reduce(
      (prev: number, currentEvent: Note) =>
        currentEvent.hasUnknownAttendances() ? prev + 1 : prev,
      0
    );
  }

  countEventsPresent(childId: string): number {
    return this.countIndividual(childId, AttendanceCounting.PRESENT);
  }

  countEventsAbsent(childId: string): number {
    return this.countIndividual(childId, AttendanceCounting.ABSENT);
  }

  getAttendancePercentage(childId: string) {
    const present = this.countEventsPresent(childId);
    const absent = this.countEventsAbsent(childId);

    return present / (present + absent);
  }

  getAttendancePercentageAverage() {
    // TODO calculate overall averaged attendance percentage
    return NaN;
  }

  countEventsPresentAverage(rounded: boolean = false) {
    return this.countAverage(AttendanceCounting.PRESENT, rounded);
  }

  countEventsAbsentAverage(rounded: boolean = false) {
    return this.countAverage(AttendanceCounting.ABSENT, rounded);
  }

  private countIndividual(childId: string, countingType: AttendanceCounting) {
    return this.events.filter(
      (eventNote) =>
        getAttendanceType(eventNote.getAttendance(childId)?.status)?.countAs ===
        countingType
    ).length;
  }

  private countAverage(
    matchingType: AttendanceCounting,
    rounded: boolean = false
  ) {
    const calculatedStats = this.events
      .map((event) => {
        const eventStats = {
          matching: 0,
          total: event.children.length,
        };
        for (const childId of event.children) {
          const att = getAttendanceType(event.getAttendance(childId).status);
          if (att.countAs === matchingType) {
            eventStats.matching++;
          } else if (att.countAs === AttendanceCounting.IGNORE) {
            eventStats.total--;
          }
        }

        return eventStats;
      })
      .reduce(
        (accumulatedStats, currentEventStats) => {
          accumulatedStats.total += currentEventStats.total;
          accumulatedStats.matching += currentEventStats.matching;
          return accumulatedStats;
        },
        { total: 0, matching: 0 }
      );

    const result =
      calculatedStats.matching / (calculatedStats.total / this.events.length);
    if (rounded) {
      return Math.round(result * 10) / 10;
    } else {
      return result;
    }
  }
}

// TODO: remove once EventAttendance contains the full reference to AttendanceStatusType after that was moved into config
export function getAttendanceType(status: AttendanceStatus) {
  return DEFAULT_ATTENDANCE_TYPES.find((t) => t.status === status);
}

/**
 * Generate a event with children for the given AttendanceStatus array.
 *
 * This is particularly useful to generate simple data for demo or test purposes.
 *
 * @param participating Object where keys are string childId and values are its attendance status
 * @param date (Optional) date of the event; if not given today's date is used
 */
export function generateEventWithAttendance(
  participating: { [key: string]: AttendanceStatus },
  date = new Date()
): Note {
  const event = Note.create(date);
  for (const childId of Object.keys(participating)) {
    event.addChild(childId);
    event.getAttendance(childId).status = participating[childId];
  }
  return event;
}
