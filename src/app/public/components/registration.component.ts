import { ApiConfiguration } from './../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CustomValidator } from '../../core/validation/custom-validation.validator';
import { FormComponent } from '../../core/components/form.component';
import { Router } from '@angular/router';
import { Registration } from 'app/core/models/registration.model';

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: './../views/registration.component.html'
})

export class RegistrationComponent extends FormComponent implements OnInit {
    registration: FormGroup;
    submitted: boolean = false;
    success: boolean = false;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private apiConfiguration: ApiConfiguration,
        protected router: Router) {
        super(router);
    }

    ngOnInit() {
        this.registration = this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.maxLength(40)]],
            email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), CustomValidator.validEmail()]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phoneNumber: ['', [Validators.minLength(4), Validators.maxLength(15)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6), CustomValidator.equalTo('password')]]
        });
    }

    onSubmit({ value, valid }: { value: Registration, valid: boolean }) {
        this.markFormAsSubmitted(this.registration);

        if (valid) {
            value.confirmationUrl = location.protocol + '//' + location.host + '/account/confirm';
            this.userService.register(value)
                .then(response => this.success = response)
                .catch(error => this.handleError(error));
        }
    }

    onRegisterExternal(provider: string): void {
        var redirectUrl = location.protocol + '//' + location.host + '/account/externalSignin';
        var externalProviderUrl = this.apiConfiguration.openAuthEndpoint(provider, redirectUrl);
        window.location.href = externalProviderUrl;
    }
}