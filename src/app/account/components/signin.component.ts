import { ApiConfiguration } from './../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidator } from '../../core/validation/customValidator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Signin } from '../models/signin';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './../views/signin.component.html'
})

export class SigninComponent implements OnInit {
    login: FormGroup;
    submitted: boolean = false;

    constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private apiConfiguration: ApiConfiguration,
    private router: Router) { }

    ngOnInit() {
        this.login = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), CustomValidator.validEmail()]],
            password: ['', [Validators.required, Validators.minLength(7)]]
        });
    }

    onLogin({ value, valid }: { value: Signin, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            this.userService.signin(value)
                .then(response => this.router.navigate(['/classifieds']))
                .catch(error => alert(error.message || 'invalid username or password'));
        }
    }

    onloginExternal(provider: string): void {
        var redirectUrl = location.protocol + '//' + location.host + '/account/externalSignin';
        var externalProviderUrl = this.apiConfiguration.openAuthEndpoint(provider, redirectUrl);
        window.location.href = externalProviderUrl;
    }
}