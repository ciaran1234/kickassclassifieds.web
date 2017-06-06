import { DynamicFormControlConfiguration } from './dynamicFormControl.configuration';
import { DynamicFormControlStyle } from './style/dynamicFormControl.style';
import { DynamicFormControlModel } from './dynamicFormControl.model';
import { DynamicFormControlType } from './dynamicFormControl.types';

export class DynamicFormGroupModel extends DynamicFormControlModel {

    public group: DynamicFormControlModel[];

    constructor(config: DynamicFormControlConfiguration, style?: DynamicFormControlStyle) {
        super(config, style);
        this.type = DynamicFormControlType.Group;
        this.group = config.group || [];
    }

    public get(index: number): DynamicFormControlModel {
        return this.group[index];
    }

    public set(index: number, controlModel: DynamicFormControlModel, ): void {
        this.group[index] = controlModel;
    }

    public add(controlModel: DynamicFormControlModel): void {
        this.group.push(controlModel);
    }

    public insert(index: number, controlModel: DynamicFormControlModel): void {
        this.group.splice(index, 0, controlModel);
    }

    public move(index: number, step: number): void {
        this.group.splice(index + step, 0, ...this.group.splice(index, 1));
    }

    public remove(index: number) {
        this.group.splice(index, 1);
    }

    public size(): number {
        return this.group.length;
    }
}