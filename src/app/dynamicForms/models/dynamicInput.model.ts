import { DynamicFormControlConfiguration } from './dynamicFormControl.configuration';
import { DynamicFormControlStyle } from './style/dynamicFormControl.style';
import { DynamicFormControlModel } from './dynamicFormControl.model';
import { DynamicFormControlType } from './dynamicFormControl.types';

export class DynamicInputModel extends DynamicFormControlModel {
    public inputType: string;
    public min: number;
    public max: number;

    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        super(config, style);
        this.type = DynamicFormControlType.Input;
        this.inputType = config.inputType || 'text';
        this.min = config.min;

        if (config.max === 'currentYear') {        
            this.max = new Date().getFullYear()
        }
        else {
            this.max = config.max;
        }
    }
}