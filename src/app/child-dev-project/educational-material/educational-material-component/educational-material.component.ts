import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { EducationalMaterial } from "../model/educational-material";
import { ChildrenService } from "../../children/children.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Child } from "../../children/model/child";
import { OnInitDynamicComponent } from "../../../core/view/dynamic-components/on-init-dynamic-component.interface";
import { PanelConfig } from "../../../core/entity-components/entity-details/EntityDetailsConfig";
import { FormFieldConfig } from "../../../core/entity-components/entity-details/form/FormConfig";

@UntilDestroy()
@Component({
  selector: "app-educational-material",
  templateUrl: "./educational-material.component.html",
})
export class EducationalMaterialComponent
  implements OnChanges, OnInitDynamicComponent {
  @Input() child: Child;
  records = new Array<EducationalMaterial>();

  materialTypes = EducationalMaterial.MATERIAL_ALL;

  columns: FormFieldConfig[] = [
    { id: "date" },
    { id: "materialType" },
    { id: "materialAmount" },
    { id: "description" },
  ];

  constructor(private childrenService: ChildrenService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("child")) {
      this.loadData(this.child.getId());
    }
  }

  onInitFromDynamicConfig(config: PanelConfig) {
    if (config?.config?.displayedColumns) {
      this.columns = this.columns.filter((c) =>
        config.config.displayedColumns.includes(c.id)
      );
    }

    this.child = config.entity as Child;
    this.loadData(this.child.getId());
  }

  loadData(id: string) {
    this.childrenService
      .getEducationalMaterialsOfChild(id)
      .pipe(untilDestroyed(this))
      .subscribe((results) => {
        this.records = results.sort(
          (a, b) =>
            (b.date ? b.date.valueOf() : 0) - (a.date ? a.date.valueOf() : 0)
        );
      });
  }

  generateNewRecordFactory() {
    // define values locally because "this" is a different scope after passing a function as input to another component
    const child = this.child.getId();

    return () => {
      const newAtt = new EducationalMaterial(Date.now().toString());

      // use last entered date as default, otherwise today's date
      newAtt.date = this.records.length > 0 ? this.records[0].date : new Date();
      newAtt.child = child;

      return newAtt;
    };
  }

  getSummary() {
    if (this.records.length === 0) {
      return "";
    }

    const summary = new Map<string, number>();
    this.records.forEach((m) => {
      const previousValue = summary.has(m.materialType)
        ? summary.get(m.materialType)
        : 0;
      summary.set(m.materialType, previousValue + m.materialAmount);
    });

    let summaryText = "";
    summary.forEach(
      (v, k) => (summaryText = summaryText + k + ": " + v + ", ")
    );
    return summaryText;
  }
}
