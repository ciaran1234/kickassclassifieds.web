import { DynamicFormControlModel } from './dynamicFormControl.model';
import { DynamicCheckboxModel } from './dynamicCheckbox.model';
import { DynamicInputModel } from './dynamicInput.model';
import { DynamicRadioGroupModel } from './dynamicRadioGroup.model';
import { DynamicSelectModel } from './dynamicSelect.model';
import { DynamicFormGroupModel } from './dynamicFormGroup.model';
import { DynamicFormService } from "../services/dynamicForm.service";
import { FormGroup } from '@angular/forms';
import _ from 'lodash';

export class DynamicFormControlFactory {
    static get(key: string, property: any): DynamicFormControlModel {
        let discriminator = property.data !== undefined ? 'option' : typeof property.type === 'object' ? 'object' : property.type;

        switch (discriminator) {
            case 'String':
            case 'string':
                return new DynamicInputModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    placeholder: property.displayName || key,
                    required: property.required,
                    minLength: property.minLength,
                    maxLength: property.maxLength,
                    min: property.min,
                    max: property.max,
                    inputType: 'text',
                    validators: {
                        required: null,
                        minLength: property.minLength,
                        maxLength: property.maxLength
                    },
                    errorMessages: {
                        required: "{{displayName}} is required.",
                        minLength: 'Minimum length of {{minLength}} for {{displayName}}',
                        min: '{{displayName}} cannot be less than {{min}}',
                        max: '{{displayName}} cannot be greater than {{max}}'
                    }
                }, property.style);
            case 'Number':
            case 'number':
                return new DynamicInputModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    placeholder: property.displayName || key,
                    required: property.required,
                    minLength: property.minLength,
                    maxLength: property.maxLength,
                    min: property.min,
                    max: property.max,
                    inputType: 'number',
                    validators: {
                        required: null,
                        minLength: property.minLength,
                        maxLength: property.maxLength
                    },
                    errorMessages: {
                        required: "{{displayName}} is required.",
                        minLength: 'Minimum length of {{minLength}} for {{displayName}}',
                        greaterThanOrEqual: '{{displayName}} must be greater than or equal to {{min}}',
                        lessThanOrEqual: '{{displayName}} must be less than or equal to {{max}}'
                    }
                }, property.style);
            case 'Boolean':
            case 'boolean':
                return new DynamicCheckboxModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    value: false
                });
            case 'object':
                let subProperties = [];

                for (let subProperty in property.type) {
                    subProperties.push(this.get(subProperty, property.type[subProperty]));
                }

                return new DynamicFormGroupModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    group: subProperties
                }, property.style);
            case 'option':
                return new DynamicSelectModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    value: property.data[0],
                    errorMessages: {
                        required: "{{displayName}} is required."
                    },
                    options: _.map(property.data, function (value) {
                        return {
                            label: value,
                            value: value
                        };
                    })
                }, property.style);
            default:
                throw new Error('Invalid control type provided');
        }
    }

    static setFormGroup(formGroup: FormGroup, formService: DynamicFormService, formModel: DynamicFormControlModel[], data: any) {
        var length = formModel.length;

        if (length > 0) {
            for (let i = length - 1; i >= 0; i--) { //clear controls
                formService.removeFormGroupControl(i, formGroup, formModel);
            }
        }

        if (data) {
            for (let property in data) { //add new controls                
                var control = this.get(property, data[property]);
                formService.addFormGroupControl(formGroup, formModel, control);

            }
        }
    }
}