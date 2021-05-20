import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Aser } from "../model/aser";
import { ChildrenService } from "../../children/children.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Child } from "../../children/model/child";
import { OnInitDynamicComponent } from "../../../core/view/dynamic-components/on-init-dynamic-component.interface";
import { PanelConfig } from "../../../core/entity-components/entity-details/EntityDetailsConfig";
import { EditPropertyConfig } from "../../../core/entity-components/entity-details/form/FormConfig";

@UntilDestroy()
@Component({
  selector: "app-aser",
  template: `<app-entity-subrecord
    [records]="records"
    [columns]="columns"
    [newRecordFactory]="generateNewRecordFactory()"
  ></app-entity-subrecord>`,
})
export class AserComponent implements OnChanges, OnInitDynamicComponent {
  @Input() child: Child;
  records: Array<Aser> = [];

  columns: EditPropertyConfig[] = [
    { id: "date" },
    { id: "math" },
    { id: "english" },
    { id: "hindi" },
    { id: "bengali" },
    { id: "remarks" },
  ];

  constructor(private childrenService: ChildrenService) {}

  ngOnChanges(changes: SimpleChanges) {
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
      .getAserResultsOfChild(id)
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
      const newAtt = new Aser(Date.now().toString());
      newAtt.date = new Date();
      newAtt.child = child;

      return newAtt;
    };
  }
}
