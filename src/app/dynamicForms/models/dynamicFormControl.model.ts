import { DynamicFormControlConfiguration } from './dynamicFormControl.configuration';
import { DynamicFormControlStyle } from './style/dynamicFormControl.style';
import { DynamicFormControlType } from './dynamicFormControl.types';

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

    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        this.id = config.id;
        this.label = config.label;
        this.name = this.id;
        this.displayName = config.displayName;
        this.value = config.value || null;
        this.placeholder = config.placeholder || '';
        this.required = config.required == true ? true : false;
        this.maxLength = config.maxLength;
        this.minLength = config.minLength;       
        this.validators = config.validators;
        this.errorMessages = config.errorMessages;
        this.style = style ? style : null;       
    }
}