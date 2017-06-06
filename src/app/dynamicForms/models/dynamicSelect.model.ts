import { DynamicFormControlConfiguration } from './dynamicFormControl.configuration';
import { DynamicFormControlStyle } from './style/dynamicFormControl.style';
import { DynamicFormControlModel } from './dynamicFormControl.model';
import { DynamicFormControlType } from './dynamicFormControl.types';

export class DynamicSelectModel extends DynamicFormControlModel {
    public options: any[];


    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        super(config, style);
        this.type = DynamicFormControlType.Select;
        this.options = config.options || [];   

        this.value = config.value ? config.value : (this.options[0] ? this.options[0].value : null);        
    }
}