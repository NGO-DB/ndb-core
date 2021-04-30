/**
 * Input types available for columns generated by the {@link EntitySubrecordComponent}.
 * Defines what form field is offered to the user to edit the column's value.
 */
export enum ColumnDescriptionInputType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  MONTH = "month",
  TEXTAREA = "textarea",
  SELECT = "select",
  AUTOCOMPLETE = "autocomplete",
  FUNCTION = "function",
  CONFIGURABLE_ENUM = "configurable_enum",
  READONLY = "readonly",
}
