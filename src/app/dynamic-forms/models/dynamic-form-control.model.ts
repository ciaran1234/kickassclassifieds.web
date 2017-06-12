import { DynamicFormControlConfiguration } from './dynamic-form-configuration.model';
import { DynamicFormControlStyle } from './style/dynamic-form-control.style';
import { DynamicFormControlType } from './dynamic-form-control-type.model';

export abstract class DynamicFormControlModel {
    public id: string;
    public label: string;
    public value: any;
    public displayName: string;
    public placeholder: string;
    public type: number;
    public name: string;
    public required: boolean;
    public maxLength: number;
    public minLength: number;
    public validators: any;
    public errorMessages: any;
    public style: any;
    public nativeType: string;

    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        this.id = config.id;
        this.label = config.label;
        this.name = this.id;
        this.displayName = config.displayName;
        this.value = config.value;
        this.placeholder = config.placeholder || '';
        this.required = config.required == true ? true : false;
        this.maxLength = config.maxLength;
        this.minLength = config.minLength;
        this.validators = config.validators;
        this.nativeType = config.nativeType;
        this.errorMessages = config.errorMessages;
        this.style = style ? style : null;
    }
}