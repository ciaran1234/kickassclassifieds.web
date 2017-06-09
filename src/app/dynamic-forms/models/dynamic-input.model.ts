import { DynamicFormControlConfiguration } from './dynamic-form-configuration.model';
import { DynamicFormControlStyle } from './style/dynamic-form-control.style';
import { DynamicFormControlModel } from './dynamic-form-control.model';
import { DynamicFormControlType } from './dynamic-form-control-type.model';


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