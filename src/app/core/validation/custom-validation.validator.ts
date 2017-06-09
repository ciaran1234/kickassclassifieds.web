import { AbstractControl, ValidatorFn } from '@angular/forms';
import _ from 'lodash';

export class CustomValidator {

    static validEmail(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
            const value = control.value;
            if (!value) return null;

            return !EMAIL_REGEXP.test(value) ? { 'invalidEmail': { value } } : null;
        };
    }

    static equalTo(otherProperty: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            var valid = false;
            const value = control.value;
            if (!value) return null;

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
            if (!value) return null;

            if (control.parent) {
                var otherControl = control.parent.controls[otherProperty];

                if (otherControl) {
                    valid = value !== otherControl.value;
                }
            }

            return valid !== true ? { 'notEqualTo': { value } } : null;
        };
    }

    static greaterThan(minValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const value = control.value;
            if (!value) return null;

            return !(value > minValue) ? { 'greaterThan': { value } } : null;
        };
    }

    static greaterThanOrEqual(minValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let value = control.value;
            if (!value) return null;

            return !(value >= minValue) ? { 'greaterThanOrEqual': { value } } : null;
        };
    }

    static lessThan(maxValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {

            const value = control.value;
            return !(value < maxValue) ? { 'lessThan': { value } } : null;
        };
    }

    static lessThanOrEqual(maxValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const value = control.value;
            return !(value <= maxValue) ? { 'lessThanOrEqual': { value } } : null;
        };
    }

    static isInteger(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let value = control.value;

            if (_.isNull(value) || _.isUndefined(value) || (_.isString(value) && value === '')) return null;

            return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
                ? null : { 'isInteger': { value } };
        };
    }
}