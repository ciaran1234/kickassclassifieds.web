import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplexControl } from '../models/controls/complex-control';
import { BaseControl } from '../models/controls/base-control';

@Injectable()
export class DynamicFormBuilder {
    constructor() { }

    toFormGroup(details: BaseControl<any>[]) {
        let group: any = {};

        details.forEach(detail => {
            if (detail.controlType === 'complex') {
                let subGroup: any = {};
                let complexDetail = detail as ComplexControl;

                for (var i in complexDetail.controls) {
                    subGroup[complexDetail.controls[i].key] = this.toFormControl(complexDetail.controls[i]);
                }

                group[detail.key] = new FormGroup(subGroup);
            }
            else {
                group[detail.key] = this.toFormControl(detail);
            }
        });

        return new FormGroup(group);
    }

    private toFormControl(detail: BaseControl<any>) {
        return detail.required ?
            new FormControl(detail.value || '', Validators.required)
            : new FormControl(detail.value || '');
    }
}