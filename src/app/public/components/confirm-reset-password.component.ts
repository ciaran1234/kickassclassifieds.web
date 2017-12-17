import { ApiConfiguration } from './../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidator } from '../../core/validation/custom-validation.validator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmResetPassword } from 'app/core/models/confirm-reset-password.model';

@Component({
    selector: 'account-confirm-reset-password',
    templateUrl: './../views/confirm-reset-password.component.html'
})

export class ConfirmResetPasswordComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private apiConfiguration: ApiConfiguration, private fb: FormBuilder) { }

    resetPassword: FormGroup;
    submitted: boolean = false;
    success: boolean = false;

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {   
            this.resetPassword = this.fb.group({
                token: [params['token']],
                userId: [params['uid']],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(6), CustomValidator.equalTo('password')]]
            });
        });
    }

    onSubmit({ value, valid }: { value: ConfirmResetPassword, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            this.userService.confirmResetPassword(value)
                .then(response => this.success = response)
                .catch(error => alert(JSON.stringify(error))); //need to display errors in a summary type thing....
        }
    }
}