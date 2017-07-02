import { FormGroup } from '@angular/forms';
import { BaseComponent } from './base.component';
import { Router } from '@angular/router';
import { BadRequestError } from '../../errors/models/http/bad-request-error.model';

export class FormComponent extends BaseComponent {

    serverValidationErrors: string[] = [];

    constructor(protected router: Router) {
        super(router);
    }

    handleError(error: any) {       
        super.handleError(error);

        if (error instanceof BadRequestError) {
            this.handleBadRequest(error);
        }
    }

    protected handleBadRequest(error: BadRequestError) {
        this.serverValidationErrors.length = 0;

        for (let i in error.validationMessages) {          
            this.serverValidationErrors.push(error.validationMessages[i]);
        }
    }

    protected markFormAsSubmitted(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).map((controlName) => {
            let control = formGroup.get(controlName);

            if (control instanceof FormGroup) {
                this.markFormAsSubmitted(control as FormGroup);
            }
            else {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }
}