import { Component } from "@angular/core";
import { Entity, EntityConstructor } from "../../entity/entity";
import { EntityMapperService } from "../../entity/entity-mapper.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogService } from "../../confirmation-dialog/confirmation-dialog.service";
import { Child } from "../../../child-dev-project/children/model/child";
import { School } from "../../../child-dev-project/schools/model/school";
import * as uniqid from "uniqid";

const ENTITY_MAP: Map<string, any> = new Map<string, EntityConstructor<Entity>>(
  [
    ["Child", Child],
    ["School", School],
  ]
);

@Component({
  selector: "app-entity-details",
  templateUrl: "./entity-details.component.html",
  styleUrls: ["./entity-details.component.scss"],
})
export class EntityDetailsComponent {
  entity: Entity;
  creatingNew = false;

  panels: any[];
  classNamesWithIcon: String;
  config: any = {};

  constructor(
    private entityMapperService: EntityMapperService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private confirmationDialog: ConfirmationDialogService
  ) {
    this.route.data.subscribe((config) => {
      this.config = config;
      this.classNamesWithIcon = "fa fa-" + config.icon + " fa-fw";
      this.route.paramMap.subscribe((params) =>
        this.loadEntity(params.get("id"))
      );
    });
  }

  loadEntity(id: string) {
    const constr: EntityConstructor<Entity> = ENTITY_MAP.get(
      this.config.entity
    );
    if (id === "new") {
      this.entity = new constr(uniqid());
      this.creatingNew = true;
      this.addEntityToConfig();
    } else {
      this.creatingNew = false;
      this.entityMapperService.load<Entity>(constr, id).then((entity) => {
        this.entity = entity;
        this.addEntityToConfig();
      });
    }
  }

  private addEntityToConfig() {
    this.panels = this.config.panels.map((p) => {
      return {
        title: p.title,
        components: p.components.map((c) => {
          return {
            title: c.title,
            component: c.component,
            config: {
              entity: this.entity,
              config: c.config,
              creatingNew: this.creatingNew,
            },
          };
        }),
      };
    });
  }

  removeEntity() {
    const dialogRef = this.confirmationDialog.openDialog(
      "Delete?",
      "Are you sure you want to delete this " + this.config.entity + " ?"
    );

    dialogRef.afterClosed().subscribe((confirmed) => {
      const currentUrl = this.router.url;
      if (confirmed) {
        this.entityMapperService
          .remove<Entity>(this.entity)
          .then(() => this.navigateBack())
          .catch((err) => console.log("error", err));

        const snackBarRef = this.snackBar.open(
          'Deleted Entity "' + this.entity.getId() + '"',
          "Undo",
          { duration: 8000 }
        );
        snackBarRef.onAction().subscribe(() => {
          this.entityMapperService.save(this.entity, true);
          this.router.navigate([currentUrl]);
        });
      }
    });
  }

  navigateBack() {
    this.location.back();
  }
}