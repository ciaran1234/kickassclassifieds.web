import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailsBase } from '../models/details/details-base';

@Component({
    selector: 'df-question',
    templateUrl: '../views/dynamic-form.component.html'
})

export class DynamicFormDetailsComponent {
    @Input() question: DetailsBase<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.question.key].valid; }
}
