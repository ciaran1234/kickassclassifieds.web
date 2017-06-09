import { Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { DynamicFormControlFactory } from '../models/dynamic-form-factory.model';
import { DynamicFormControlModel } from '../models/dynamic-form-control.model';
import { DynamicFormControlType } from '../models/dynamic-form-control-type.model';
import { DynamicFormGroupModel } from '../models/dynamic-form-group.model';
import { DynamicInputModel } from '../models/dynamic-input.model';
import { CustomValidator } from '../../core/validation/custom-validation.validator';
import _ from 'lodash';

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

        if (_.toLower(model.nativeType) === 'int') {
            validators.push(CustomValidator.isInteger());
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

    resetFormGroup(formGroup: FormGroup, formModel: DynamicFormControlModel[], data: any) {
        var length = formModel.length;

        if (length > 0) {
            for (let i = length - 1; i >= 0; i--) { //clear controls
                this.removeFormGroupControl(i, formGroup, formModel);
            }
        }

        if (data) {
            for (let property in data) { //add new controls                
                var control = DynamicFormControlFactory.get(property, data[property]);
                this.addFormGroupControl(formGroup, formModel, control);

            }
        }
    }
}