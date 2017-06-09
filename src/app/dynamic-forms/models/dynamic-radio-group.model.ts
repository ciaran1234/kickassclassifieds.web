import { DynamicFormControlConfiguration } from './dynamic-form-configuration.model';
import { DynamicFormControlStyle } from './style/dynamic-form-control.style';
import { DynamicFormControlModel } from './dynamic-form-control.model';
import { DynamicFormControlType } from './dynamic-form-control-type.model';


export class DynamicRadioGroupModel extends DynamicFormControlModel {
    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        super(config, style);
        this.type = DynamicFormControlType.RadioGroup;
    }
}