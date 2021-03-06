import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormFieldConfig } from "./entity-form/FormConfig";
import { Entity } from "../../entity/model/entity";
import { EntityMapperService } from "../../entity/entity-mapper.service";
import { EntitySchemaService } from "../../entity/schema/entity-schema.service";

@Injectable()
/**
 * This service provides helper functions for creating tables or forms for an entity as well as saving
 * new changes correctly to the entity.
 */
export class EntityFormService {
  constructor(
    private fb: FormBuilder,
    private entityMapper: EntityMapperService,
    private entitySchemaService: EntitySchemaService
  ) {}

  public extendFormFieldConfig(
    formFields: FormFieldConfig[],
    entity: Entity,
    forTable = false
  ) {
    formFields.forEach((formField) => {
      try {
        this.addFormFields(formField, entity, forTable);
      } catch (err) {
        throw new Error(
          `Could not create form config for ${formField.id}: ${err}`
        );
      }
    });
  }

  private addFormFields(formField: FormFieldConfig, entity: Entity, forTable) {
    const propertySchema = entity.getSchema().get(formField.id);
    formField.edit =
      formField.edit ||
      this.entitySchemaService.getComponent(propertySchema, "edit");
    formField.view =
      formField.view ||
      this.entitySchemaService.getComponent(propertySchema, "view");
    formField.tooltip = formField.tooltip || propertySchema?.description;
    if (forTable) {
      formField.forTable = true;
      formField.label =
        formField.label || propertySchema.labelShort || propertySchema.label;
    } else {
      formField.forTable = false;
      formField.label =
        formField.label || propertySchema.label || propertySchema.labelShort;
    }
  }

  public createFormGroup(
    formFields: FormFieldConfig[],
    entity: Entity
  ): FormGroup {
    const formConfig = {};
    const entitySchema = entity.getSchema();
    formFields.forEach((formField) => {
      const propertySchema = entitySchema.get(formField.id);
      // Only properties with a schema are editable
      if (propertySchema) {
        formConfig[formField.id] = [entity[formField.id]];
        if (formField.required || propertySchema?.required) {
          formConfig[formField.id].push(Validators.required);
        }
      }
    });
    return this.fb.group(formConfig);
  }

  /**
   * This function applies the changes of the formGroup to the entity.
   * If the form is invalid or the entity does not pass validation after applying the changes, an error will be thrown.
   * The input entity will not be modified but a copy of it will be returned in case of success.
   * @param form The formGroup holding the changes
   * @param entity The entity on which the changes should be applied.
   * @returns a copy of the input entity with the changes from the form group
   */
  public saveChanges<T extends Entity>(form: FormGroup, entity: T): Promise<T> {
    this.checkFormValidity(form);
    const entityCopy = entity.copy() as T;
    this.assignFormValuesToEntity(form, entityCopy);
    entityCopy.assertValid();

    return this.entityMapper
      .save(entityCopy)
      .then(() => Object.assign(entity, entityCopy))
      .catch((err) => {
        throw new Error(`Could not save ${entity.getType()}: ${err}`);
      });
  }

  private checkFormValidity(form: FormGroup) {
    // errors regarding invalid fields wont be displayed unless marked as touched
    form.markAllAsTouched();
    if (form.invalid) {
      const invalidFields = this.getInvalidFields(form);
      throw new Error(`Fields: "${invalidFields}" are invalid`);
    }
  }

  private getInvalidFields(form: FormGroup): string {
    const invalid: string[] = [];
    const controls = form.controls;
    for (const field in controls) {
      if (controls[field].invalid) {
        invalid.push(field);
      }
    }
    return invalid.join(", ");
  }

  private assignFormValuesToEntity(form: FormGroup, entity: Entity) {
    Object.keys(form.controls).forEach((key) => {
      entity[key] = form.get(key).value;
    });
  }
}
