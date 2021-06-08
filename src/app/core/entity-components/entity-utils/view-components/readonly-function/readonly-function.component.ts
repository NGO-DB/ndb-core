import { Component } from "@angular/core";
import { ViewPropertyConfig } from "../../../entity-list/EntityListConfig";
import { ViewComponent } from "../view-component";

@Component({
  selector: "app-readonly-function",
  templateUrl: "./readonly-function.component.html",
  styleUrls: ["./readonly-function.component.scss"],
})
export class ReadonlyFunctionComponent extends ViewComponent {
  displayFunction: (Entity) => any;
  onInitFromDynamicConfig(config: ViewPropertyConfig) {
    super.onInitFromDynamicConfig(config);
    this.displayFunction = config.config;
  }
}