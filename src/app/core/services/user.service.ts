import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { HttpClient } from '../../core/extensions/httpClient';
import { ConfirmResetPassword } from '../../account/models/confirmResetPassword';
import { ResetPassword } from '../../account/models/resetPassword';
import { Injectable } from '@angular/core';
import { Signin } from '../../account/models/signin';
import { Registration } from '../../account/models/registration';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { ExternalLogin } from '../../account/models/externalLogin';
import { User } from '../../account/models/user';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient,
        private apiConfiguration: ApiConfiguration) { }

    private _user = new BehaviorSubject<User>(null); //globally available observable

    user = this._user.asObservable();

    onUserChanged(user: User) {
        this._user.next(user);
    }

    confirmResetPassword(resetPassword: ConfirmResetPassword): Promise<boolean> {
        return this.httpClient.post(this.apiConfiguration.confirmResetPassword, resetPassword)
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }

    resetPassword(resetPassword: ResetPassword): Promise<boolean> {
        return this.httpClient.post(this.apiConfiguration.resetPassword, resetPassword)
            .toPromise()
            .then(response => true)
            .catch(error => false);
    }

    signin(signin: Signin): Promise<void> {
        return this.httpClient.post(this.apiConfiguration.login, signin)
            .toPromise()
            .then(response => {
                this.onUserChanged(response.json().user as User);
                this.storeToken(response.json().token)
            })
            .catch(error => this.handleError(error));
    }

    register(registration: Registration): Promise<boolean> {
        return this.httpClient.post(this.apiConfiguration.register, registration)
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }

    confirmAccount(token: string, userId: string): Promise<boolean> {
        return this.httpClient.post(this.apiConfiguration.confirmAccount, { token: token, userId: userId })
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }

    removeExternalLogin(externalLogin: ExternalLogin): Promise<boolean> {
        return this.httpClient.delete(this.apiConfiguration.removeExternalLogin, { body: externalLogin })
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }

    exchangeExternalToken(provider: String, accessToken: String): Promise<void> {
        return this.httpClient.get(this.apiConfiguration.exchangeExternalToken + '?provider=' + provider + '&access_token=' + accessToken)
            .toPromise()
            .then(response => {
                this.onUserChanged(response.json().user as User);
                this.storeToken(response.json().token)
            })
            .catch(error => this.handleError(error));
    }

    checkIfUserLoggedIn(): Promise<void> {
        if (localStorage.getItem('accessToken')) {

            this.me().then(user => {
                this.onUserChanged(user);
            });
        }

        return null;
    }

    signout(): void {
        localStorage.removeItem('accessToken');
        this.onUserChanged(null);
    }

    me(): Promise<User> {
        return this.httpClient.get(this.apiConfiguration.me)
            .toPromise()
            .then(response => {
                return response.json() as User;
            })
            .catch(error => this.handleError(error));
    }

    uploadProfileImage(formData: FormData): Promise<User> {
        return this.httpClient.post(this.apiConfiguration.uploadProfilePicture, formData)
            .toPromise()
            .then(response => response.json() as User)
            .catch(error => this.handleError(error));
    }

    private storeToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json() || error);
    }
}