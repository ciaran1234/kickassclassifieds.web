import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ExternalLogin } from '../models/external-login.model';

@Component({
    selector: 'account-me',
    templateUrl: './../views/me.component.html'
})

export class MeComponent implements OnInit {
    user: User;

    externalLogins: ExternalLogin[];

    constructor(private apiConfiguration: ApiConfiguration,
        private userService: UserService) { }

    ngOnInit() {
        this.userService.me().then(user => {
            this.externalLogins = [new ExternalLogin('facebook'), new ExternalLogin('google')];

            for (let i in this.externalLogins) {
                for (let j in user.externalLogins) {
                    if (this.externalLogins[i].loginProvider === user.externalLogins[j].loginProvider) {
                        this.externalLogins[i].providerKey = user.externalLogins[j].providerKey;
                    }
                }
            }

            this.user = user;
        }).catch(error => console.log(JSON.stringify(error)));
    }

    onFileChange(event) {
        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            let formData: FormData = new FormData();
            formData.append('image', fileList[0], fileList[0].name);

            this.userService.uploadProfileImage(formData)
                .then(user => this.user = user)
                .catch(error => { alert(error.errors.message); });
        }
    }

    onAddExternalLogin(externalLogin: ExternalLogin) {
        var redirectUrl = location.href.split('?')[0];
        var externalProviderUrl = this.apiConfiguration.openAuthEndpoint(externalLogin.loginProvider, redirectUrl, localStorage.getItem('accessToken'));
        window.location.href = externalProviderUrl;
    }

    onRemoveExternalLogin(externalLogin: ExternalLogin) {
        this.userService.removeExternalLogin(externalLogin)
            .then(response => {
                externalLogin.providerKey = '';
            })
            .catch(error => alert(error));
    }
}