import { Component } from "@angular/core";
import { EditComponent, EditPropertyConfig } from "../edit-component";
import { ConfigurableEnumValue } from "../../../../configurable-enum/configurable-enum.interface";

@Component({
  selector: "app-edit-configurable-enum",
  templateUrl: "./edit-configurable-enum.component.html",
  styleUrls: ["./edit-configurable-enum.component.scss"],
})
export class EditConfigurableEnumComponent extends EditComponent<ConfigurableEnumValue> {
  enumId: string;

  onInitFromDynamicConfig(config: EditPropertyConfig) {
    super.onInitFromDynamicConfig(config);
    this.enumId =
      config.formFieldConfig.additional || config.propertySchema.innerDataType;
  }
}