import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseControl } from '../models/controls/base-control';

@Component({
    selector: 'dynamic-form',
    templateUrl: '../views/dynamic-form.component.html'
})

export class DynamicFormComponent {
    @Input() control: BaseControl<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.control.key].valid; }
}
