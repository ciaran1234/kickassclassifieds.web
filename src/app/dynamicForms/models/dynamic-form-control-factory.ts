import { BaseControl } from './controls/base-control';
import { TextControl } from './controls/text-control';
import { OptionsControl } from './controls/options-control';
import { CheckboxControl } from './controls/checkbox-control';
import { ComplexControl } from './controls/complex-control';
import { NumberControl } from './controls/number-control';
import _ from 'lodash';

export class DynamicFormControlFactory {
    static get(key: string, property: any): BaseControl<any> {
        let discriminator = property.data !== undefined ? 'option' : typeof property.type === 'object' ? 'object' : property.type;

        switch (discriminator) {
            case 'String':
            case 'string':
                return new TextControl({
                    key: key,
                    label: key,
                    value: '',
                    required: true,
                    type: 'textbox'
                });
            case 'Number':
            case 'number':
                return new NumberControl({
                    key: key,
                    label: key,
                    value: '',
                    required: true
                });
            case 'Boolean':
            case 'boolean':
                return new CheckboxControl({
                    key: key,
                    label: key,
                    value: false                  
                });
            case 'object':
                let subProperties = [];

                for (let subProperty in property.type) {
                    subProperties.push(this.get(subProperty, property.type[subProperty]));
                }

                return new ComplexControl(subProperties, {
                    key: key,
                    label: key
                });
            case 'option':
                return new OptionsControl({
                    key: key,
                    label: key,
                    options: _.map(property.data, function (value) { return { key: value, value: value } })
                });
            default:
                throw new Error('Invalid control type provided');
        }
    }
}