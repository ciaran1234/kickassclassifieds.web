import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidator {

    static validEmail(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
            const value = control.value;
            return !EMAIL_REGEXP.test(value) ? { 'invalidEmail': { value } } : null;
        };
    }

    static equalTo(otherProperty: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            var valid = false;
            const value = control.value;

            if (control.parent) {
                var otherControl = control.parent.controls[otherProperty];

                if (otherControl) {
                    valid = value === otherControl.value;
                }
            }

            return valid !== true ? { 'equalTo': { value } } : null;
        };
    }

    static notEqualTo(otherProperty: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            var valid = false;
            const value = control.value;

            if (control.parent) {
                var otherControl = control.parent.controls[otherProperty];

                if (otherControl) {
                    valid = value !== otherControl.value;
                }
            }

            return valid !== true ? { 'notEqualTo': { value } } : null;
        };
    }
}