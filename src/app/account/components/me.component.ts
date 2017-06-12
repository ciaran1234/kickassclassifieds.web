import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ExternalLogin } from '../models/external-login.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'account-me',
    templateUrl: './../views/me.component.html'
})

export class MeComponent implements OnInit {
    user: User;
    form: FormGroup;

    externalLogins: ExternalLogin[];

    constructor(private fb: FormBuilder,
        private apiConfiguration: ApiConfiguration,
        private userService: UserService) { }

    ngOnInit() {
        this.userService.me().then(user => {
            this.user = user;
            this.mapExternalProviders(user);

            this.form = this.fb.group({
                firstName: [this.user.firstName, [Validators.required, Validators.maxLength(30)]],
                lastName: [this.user.lastName, [Validators.required, Validators.maxLength(40)]],
                email: [{ value: this.user.email, disabled: true }],
                phoneNumber: [this.user.phoneNumber, [Validators.maxLength(15)]]
            });
        }).catch(error => console.log(JSON.stringify(error)));
    }

    private mapExternalProviders(user: User) {
        this.externalLogins = [new ExternalLogin('facebook'), new ExternalLogin('google')];

        for (let i in this.externalLogins) {
            for (let j in user.externalLogins) {
                if (this.externalLogins[i].loginProvider === user.externalLogins[j].loginProvider) {
                    this.externalLogins[i].providerKey = user.externalLogins[j].providerKey;
                }
            }
        }
    }

    onFileChange(event) {
        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            let formData: FormData = new FormData();
            formData.append('image', fileList[0], fileList[0].name);

            this.userService.uploadProfileImage(formData)
                .then(user => {
                    this.user = user;
                    this.userService.onUserChanged(user);
                })
                .catch(error => { alert(error.errors.message); });
        }
    }

    onAddExternalLogin(externalLogin: ExternalLogin) {
        var redirectUrl = location.href.split('?')[0];
        var externalProviderUrl = this.apiConfiguration
            .openAuthEndpoint(externalLogin.loginProvider, redirectUrl, localStorage.getItem('accessToken'));
        window.location.href = externalProviderUrl;
    }

    onRemoveExternalLogin(externalLogin: ExternalLogin) {
        this.userService.removeExternalLogin(externalLogin)
            .then(response => {
                externalLogin.providerKey = '';
            })
            .catch(error => alert(error));
    }   

    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        if (valid) {
            this.userService.update(value)
                .then(user => {
                    this.user = user;
                    this.userService.onUserChanged(user);
                })
                .catch(error => alert(error));
        }
    }
}