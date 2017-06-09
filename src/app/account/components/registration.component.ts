import { ApiConfiguration } from './../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Registration } from './../models/registration.model';
import { CustomValidator } from '../../core/validation/custom-validation.validator';

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: './../views/registration.component.html'
})

export class RegistrationComponent implements OnInit {
    registration: FormGroup;
    submitted: boolean = false;
    success: boolean = false;

    constructor(private fb: FormBuilder, private userService: UserService, private apiConfiguration: ApiConfiguration) { }

    ngOnInit() {
        this.registration = this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.maxLength(40)]],
            email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), CustomValidator.validEmail()]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6), CustomValidator.equalTo('password')]]
        });
    }

    onSubmit({ value, valid }: { value: Registration, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            value.confirmationUrl = location.protocol + '//' + location.host + '/account/confirm';
            this.userService.register(value)
                .then(response => this.success = response)
                .catch(error => console.log(error));
        }
    }

    onRegisterExternal(provider: string): void {
        var redirectUrl = location.protocol + '//' + location.host + '/account/externalSignin';
        var externalProviderUrl = this.apiConfiguration.openAuthEndpoint(provider, redirectUrl);
        window.location.href = externalProviderUrl;
    }
}