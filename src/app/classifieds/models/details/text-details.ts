import { DetailsBase } from './details-base';

export class TextDetails extends DetailsBase<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'];
    }
}