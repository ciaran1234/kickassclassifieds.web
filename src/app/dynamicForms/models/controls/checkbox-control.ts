import { BaseControl } from './base-control';

export class CheckboxControl extends BaseControl<string> {
    controlType = 'checkbox';
  
    constructor(options: {} = {}) {
        super(options);       
    }
}