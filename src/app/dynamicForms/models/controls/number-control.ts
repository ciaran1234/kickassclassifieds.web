import { BaseControl } from './base-control';

export class NumberControl extends BaseControl<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = 'number';
    }
}