import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplexDetails } from '../models/details/complex-details';
import { DetailsBase } from '../models/details/details-base';

@Injectable()
export class ClassifiedDetailService {
    constructor() { }

    toFormGroup(details: DetailsBase<any>[]) {
        let group: any = {};

        details.forEach(detail => {
            if (detail.controlType === 'complex') {
                let subGroup: any = {};
                let complexDetail = detail as ComplexDetails;

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

    private toFormControl(detail: DetailsBase<any>) {
        return detail.required ?
            new FormControl(detail.value || '', Validators.required)
            : new FormControl(detail.value || '');
    }
}