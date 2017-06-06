import { DynamicFormControlConfiguration } from './dynamicFormControl.configuration';
import { DynamicFormControlStyle } from './style/dynamicFormControl.style';
import { DynamicFormControlModel } from './dynamicFormControl.model';
import { DynamicFormControlType} from './dynamicFormControl.types';

export class DynamicCheckboxModel extends DynamicFormControlModel {
    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        super(config, style);
        this.type = DynamicFormControlType.Checkbox;      
    }
}