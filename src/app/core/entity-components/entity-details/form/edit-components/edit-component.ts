import { OnInitDynamicComponent } from "../../../../view/dynamic-components/on-init-dynamic-component.interface";
import { AbstractControl, FormControl } from "@angular/forms";
import { FormFieldConfig } from "../FormConfig";
import { EntitySchemaField } from "../../../../entity/schema/entity-schema-field";

export interface EditComponentConfig {
  formFieldConfig: FormFieldConfig;
  propertySchema: EntitySchemaField;
  formControl: AbstractControl;
}

export class TypedFormControl<T> extends FormControl {
  value: T;
  setValue(
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ) {
    super.setValue(value, options);
  }
}

export abstract class EditComponent<T> implements OnInitDynamicComponent {
  tooltip: string;
  formControlName: string;
  placeholder: string;
  formControl: TypedFormControl<T>;
  enumId: string;

  onInitFromDynamicConfig(config: EditComponentConfig) {
    this.formControlName = config.formFieldConfig.id;
    this.formControl = config.formControl as TypedFormControl<T>;
    this.tooltip = config.formFieldConfig.tooltip;
    this.placeholder =
      config.formFieldConfig.placeholder || config.propertySchema?.label;
    this.enumId =
      config.formFieldConfig.enumId || config.propertySchema?.innerDataType;
  }
}
