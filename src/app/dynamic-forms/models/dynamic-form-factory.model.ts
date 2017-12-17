import { DynamicFormControlModel } from './dynamic-form-control.model';
import { DynamicCheckboxModel } from './dynamic-checkbox.model';
import { DynamicInputModel } from './dynamic-input.model';
import { DynamicRadioGroupModel } from './dynamic-radio-group.model';
import { DynamicSelectModel } from './dynamic-select.model';
import { DynamicFormGroupModel } from './dynamic-form-group.model';
import { DynamicFormService } from "../services/dynamic-form.service";
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

export class DynamicFormControlFactory {
    static get(key: string, property: any, value?: any): DynamicFormControlModel {

        let discriminator = property.data !== undefined ? 'option' : typeof property.type === 'object' ? 'object' : _.toLower(property.type);

        switch (_.toLower(discriminator)) {
            case 'string':
                return new DynamicInputModel({
                    id: key,
                    label: property.label,
                    value: value,
                    displayName: property.displayName || key,
                    placeholder: property.displayName || key,
                    required: property.required,
                    minLength: property.minLength,
                    maxLength: property.maxLength,
                    min: property.min,
                    max: property.max,
                    inputType: 'text',
                    nativeType: discriminator,
                    validators: {
                        required: null,
                        minLength: property.minLength,
                        maxLength: property.maxLength
                    },
                    errorMessages: this.errorMessages
                }, property.style);
            case 'int':
            case 'decimal':
                return new DynamicInputModel({
                    id: key,
                    label: property.label,
                    value: value,
                    displayName: property.displayName || key,
                    placeholder: property.displayName || key,
                    required: property.required,
                    minLength: property.minLength,
                    maxLength: property.maxLength,
                    min: property.min,
                    max: property.max,
                    inputType: 'number',
                    nativeType: discriminator,
                    validators: {
                        required: null,
                        minLength: property.minLength,
                        maxLength: property.maxLength
                    },
                    errorMessages: this.errorMessages
                }, property.style);
            case 'boolean':
                return new DynamicCheckboxModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    value: value || false,
                    nativeType: discriminator
                });
            case 'object':
                let subProperties = [];

                for (let subProperty in property.type) {
                    subProperties.push(this.get(subProperty, property.type[subProperty], value ? value[subProperty] : null));
                }

                return new DynamicFormGroupModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    group: subProperties,
                    nativeType: discriminator,
                }, property.style);
            case 'option':
                return new DynamicSelectModel({
                    id: key,
                    label: property.label,
                    displayName: property.displayName || key,
                    value: value ? value : property.data[0],
                    nativeType: discriminator,
                    errorMessages: this.errorMessages,
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

    private static errorMessages: any = {
        required: "{{displayName}} is required.",
        minLength: 'Minimum length of {{minLength}} for {{displayName}}',
        min: '{{displayName}} cannot be less than {{min}}',
        max: '{{displayName}} cannot be greater than {{max}}',
        isInteger: '{{displayName}} is not a valid integer',
        greaterThanOrEqual: '{{displayName}} must be greater than or equal to {{min}}',
        lessThanOrEqual: '{{displayName}} must be less than or equal to {{max}}'
    }
}