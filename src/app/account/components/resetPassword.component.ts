import { ApiConfiguration } from './../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidator } from '../../core/validation/customValidator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResetPassword } from '../models/resetPassword';

@Component({
    selector: 'forgot-password',
    templateUrl: './../views/resetPassword.component.html'
})

export class ResetPasswordComponent implements OnInit {
    constructor(private userService: UserService, private apiConfiguration: ApiConfiguration, private fb: FormBuilder) { }

    resetPassword: FormGroup;
    submitted: boolean = false;
    success: boolean = false;

    ngOnInit() {
        this.resetPassword = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), CustomValidator.validEmail()]]
        });
    }

    onSubmit({ value, valid }: { value: ResetPassword, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            value.callbackUrl = location.protocol + '//' + location.host + '/account/confirmResetPassword';

            this.userService.resetPassword(value)
                .then(response => this.success = response)
                .catch(error => this.success = false);
        }
    }
}