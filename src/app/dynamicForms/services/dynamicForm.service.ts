import { Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { DynamicFormControlModel } from '../models/dynamicFormControl.model';
import { DynamicFormControlType } from '../models/dynamicFormControl.types';
import { DynamicFormGroupModel } from '../models/dynamicFormGroup.model';
import { DynamicInputModel } from '../models/dynamicInput.model';
import { CustomValidator } from '../../core/validation/customValidator';

export class DynamicFormService {

    constructor( @Inject(FormBuilder) private formBuilder: FormBuilder) { }

    createFormGroup(group: DynamicFormControlModel[]): FormGroup {
        let formGroup: { [id: string]: AbstractControl } = {};

        group.forEach(model => {
            if (model.type === DynamicFormControlType.Group) {
                let groupModel = model as DynamicFormGroupModel;
                formGroup[model.id] = this.createFormGroup(groupModel.group);
            }
            else {                
                formGroup[model.id] = new FormControl({ value: model.value, disabled: false }, this.getValidators(model));
            }
        });

        return this.formBuilder.group(formGroup);
    }

    addFormGroupControl(formGroup: FormGroup, groupModel: DynamicFormControlModel[] | DynamicFormGroupModel, ...controlModels: DynamicFormControlModel[]): void {
        if (groupModel instanceof DynamicFormGroupModel) {
            this.insertFormGroupControl(groupModel.size(), formGroup, groupModel, ...controlModels);
        }
        else {
            let formModel = groupModel as DynamicFormControlModel[];
            this.insertFormGroupControl(formModel.length, formGroup, formModel, ...controlModels);
        }
    }

    removeFormGroupControl(index: number, formGroup: FormGroup,
        groupModel: DynamicFormControlModel[] | DynamicFormGroupModel): void {

        if (groupModel instanceof DynamicFormGroupModel) {

            formGroup.removeControl(groupModel.get(index).id);
            groupModel.remove(index);

        } else {

            formGroup.removeControl(groupModel[index].id);
            (groupModel as DynamicFormControlModel[]).splice(index, 1);
        }
    }

    insertFormGroupControl(index: number, formGroup: FormGroup,
        groupModel: DynamicFormControlModel[] | DynamicFormGroupModel,
        ...controlModels: DynamicFormControlModel[]): void {
        let controls = this.createFormGroup(controlModels).controls;

        Object.keys(controls).forEach((controlName, idx) => {
            let controlModel = controlModels[idx];

            if (groupModel instanceof DynamicFormGroupModel) {
                groupModel.insert(index, controlModel);
            }
            else {
                (groupModel as DynamicFormControlModel[]).splice(index, 0, controlModel);
            }

            formGroup.addControl(controlName, controls[controlName]);
        });
    }

    private getValidators(model: DynamicFormControlModel): Array<ValidatorFn> {
        let validators = new Array<ValidatorFn>();

        if (model.required) {
            validators.push(Validators.required);
        }

        if (model.minLength) {
            validators.push(Validators.minLength(model.minLength));
        }

        if (model.maxLength) {
            validators.push(Validators.maxLength(model.maxLength));
        }

        if (model instanceof DynamicInputModel) {
            let inputModel = model as DynamicInputModel;

            if (inputModel.min) {
                validators.push(CustomValidator.greaterThanOrEqual(inputModel.min));
            }

            if (inputModel.max) {
                validators.push(CustomValidator.lessThanOrEqual(inputModel.max));
            }
        }

        return validators;
    }
}