import { BaseControl } from './base-control';

export class ComplexControl extends BaseControl<any> {
    controlType = 'complex';
    controls: BaseControl<any>[];

    constructor(controls: BaseControl<any>[], options: {} = {}) {
        super(options);
        this.controls = controls || [];
        options['required'] = false;
    }
}