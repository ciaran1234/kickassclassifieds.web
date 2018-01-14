import { ApiConfiguration } from './../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidator } from '../../core/validation/custom-validation.validator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Signin } from 'app/core/models/signin.model';

@Component({
    selector: 'account-signin',
    templateUrl: './../views/signin.component.html'
})

export class SigninComponent implements OnInit {
    login: FormGroup;
    submitted: boolean = false;
    private returnUrl: string;
    messages: Array<string> = [];


    constructor(private fb: FormBuilder,
        private userService: UserService,
        private apiConfiguration: ApiConfiguration,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => { this.returnUrl = params.returnUrl; })


        this.login = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), CustomValidator.validEmail()]],
            password: ['', [Validators.required, Validators.minLength(7)]]
        });
    }

    onLogin({ value, valid }: { value: Signin, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            this.userService.signin(value)
                .then(response => {
                    this.messages.length = 0;

                    if (this.returnUrl) {
                        this.router.navigate([this.returnUrl]);
                    }
                    else {
                        this.router.navigate(['/classifieds']);
                    }
                })
                .catch(error => { 
                    this.messages.length = 0;
                    this.messages = error.messages; 
                });
        }
    }

    onloginExternal(provider: string): void {
        var redirectUrl = location.protocol + '//' + location.host + '/account/externalSignin';
        var externalProviderUrl = this.apiConfiguration.openAuthEndpoint(provider, redirectUrl);
        window.location.href = externalProviderUrl;
    }
}