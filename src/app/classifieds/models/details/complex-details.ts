import { DetailsBase } from './details-base';

export class ComplexDetails extends DetailsBase<any> {
    controlType = 'complex';
    controls: DetailsBase<any>[];

    constructor(controls: DetailsBase<any>[], options: {} = {}) {
        super(options);
        this.controls = controls || [];
        options['required'] = false;
    }
}