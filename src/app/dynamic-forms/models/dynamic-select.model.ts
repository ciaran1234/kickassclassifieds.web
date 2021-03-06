﻿import { DynamicFormControlConfiguration } from './dynamic-form-configuration.model';
import { DynamicFormControlStyle } from './style/dynamic-form-control.style';
import { DynamicFormControlModel } from './dynamic-form-control.model';
import { DynamicFormControlType } from './dynamic-form-control-type.model';

export class DynamicSelectModel extends DynamicFormControlModel {
    public options: any[];


    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        super(config, style);
        this.type = DynamicFormControlType.Select;
        this.options = config.options || [];   

        this.value = config.value ? config.value : (this.options[0] ? this.options[0].value : null);        
    }
}