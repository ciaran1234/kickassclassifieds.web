import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicFormGroupModel
} from "@ng2-dynamic-forms/core";
import { DynamicFormService } from "@ng2-dynamic-forms/core";
import _ from 'lodash';
import { FormGroup } from '@angular/forms';

export class DynamicFormControlFactory {
    static get(key: string, property: any): DynamicFormControlModel {
        let discriminator = property.data !== undefined ? 'option' : typeof property.type === 'object' ? 'object' : property.type;

        switch (discriminator) {
            case 'String':
            case 'string':
                return new DynamicInputModel({
                    id: key,
                    label: key,
                   // value: '',
                    placeholder: key,
                    //required: property.required,
                    inputType: 'text',
                    validators: {
                        required: null,
                        maxLength: 5
                    },
                    errorMessages: {
                        required: "{{label}} is required."
                    }
                }, {
                    element: {
                        container: "col-sm-6",
                        label: "control-label"
                    },
                    grid: {
                        // control: "col-sm-9",
                        //label: "col-sm-3"
                    }
                });
            case 'Number':
            case 'number':
                return new DynamicInputModel({
                    id: key,
                    label: key,
                    // value: '',
                    placeholder: key,
                    required: property.required,
                    inputType: 'number',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: "{{label}} is required."
                    }
                });
            case 'Boolean':
            case 'boolean':
                return new DynamicCheckboxModel({
                    id: key,
                    label: key,
                    value: false
                });
            case 'object':
                let subProperties = [];

                for (let subProperty in property.type) {
                    subProperties.push(this.get(subProperty, property.type[subProperty]));
                }

                return new DynamicFormGroupModel({ id: key, group: subProperties, label: key }, {
                    element: {
                        label: "control-label"
                    },
                    grid: {
                        control: "form-row",
                        label: "col-sm-3"
                    }
                });
            case 'option':
                return new DynamicSelectModel({
                    id: key,
                    label: key,
                    value: property.data[0],
                    errorMessages: {
                        required: "{{label}} is required."
                    },
                    options: _.map(property.data, function (value) {
                        return {
                            label: value,
                            value: value
                        };
                    })
                });
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