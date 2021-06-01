import { Component } from "@angular/core";
import { OnInitDynamicComponent } from "../../../core/view/dynamic-components/on-init-dynamic-component.interface";
import { SchoolsService } from "../schools.service";
import { Child } from "../../children/model/child";
import { PanelConfig } from "../../../core/entity-components/entity-details/EntityDetailsConfig";
import { FormFieldConfig } from "../../../core/entity-components/entity-details/form/FormConfig";
import { Router } from "@angular/router";

/**
 * This component creates a table containing all children currently attending this school.
 */
@Component({
  selector: "app-children-overview",
  template: ` <app-entity-subrecord
    [records]="children"
    [columns]="columns"
    [showEntity]="routeToChild.bind(this)"
    [editable]="false"
  ></app-entity-subrecord>`,
})
export class ChildrenOverviewComponent implements OnInitDynamicComponent {
  columns: FormFieldConfig[] = [
    { id: "projectNumber" },
    { id: "name" },
    { id: "schoolClass", placeholder: "Class", view: "DisplayText" },
    { id: "age", placeholder: "Age", view: "DisplayText" },
  ];

  children: Child[] = [];

  constructor(private schoolsService: SchoolsService, private router: Router) {}

  async onInitFromDynamicConfig(config: PanelConfig) {
    if (config?.config?.displayedColumns) {
      this.columns = config.config.displayedColumns;
    }
    this.children = await this.schoolsService.getChildrenForSchool(
      config.entity.getId()
    );
  }

  routeToChild(child: Child) {
    this.router.navigate([`/${child.getType().toLowerCase()}`, child.getId()]);
  }
}
