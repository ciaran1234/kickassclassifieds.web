import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { HttpClient } from './http-client.service';

import { ResetPassword } from '../models/reset-password.model';
import { Injectable } from '@angular/core';
import { Signin } from '../models/signin.model';
import { Registration } from '../models/registration.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { ExternalLogin } from '../models/external-login.model';
import { User } from '../models/user.model';
import { Classified } from '../models/classified.model';
import { BaseService } from './base.service';
import { ConfirmResetPassword } from '../models/confirm-reset-password.model';

@Injectable()
export class UserService extends BaseService {

    constructor(private httpClient: HttpClient,
        private apiConfiguration: ApiConfiguration) {
        super();
    }

    private _user = new BehaviorSubject<User>(null); //globally available observable
    user = this._user.asObservable();

    onUserChanged(user: User) {
        this._user.next(user);
    }

    update(user: User): Promise<User> {
        return this.httpClient.put(this.apiConfiguration.users, user)
            .toPromise()
            .then(response => response.json() as User)
            .catch(error => this.handleError(error));
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

    deleteAccount(): Promise<boolean> {
        return this.httpClient.delete(this.apiConfiguration.users)
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
            this.me()
                .then(user => this.onUserChanged(user))
                .catch(error => localStorage.removeItem('accessToken')); //token expired. clear it from storage
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

    myClassifieds(): Promise<Classified[]> {
        return this.httpClient.get(this.apiConfiguration.myClassifieds)
            .toPromise()
            .then(response => {
                return response.json() as Classified[];
            })
            .catch(error => this.handleError(error));
    }

    uploadProfileImage(formData: FormData): Promise<User> {
        return this.httpClient.post(this.apiConfiguration.uploadProfilePicture, formData)
            .toPromise()
            .then(response => response.json() as User)
            .catch(error => this.handleError(error));
    }

    getWishlist(): Promise<Classified[]> {
        return this.httpClient.get(this.apiConfiguration.userWishlist)
            .toPromise()
            .then(response => response.json() as Classified[])
            .catch(error => this.handleError(error));
    }

    addToWishlist(classifiedId: string): Promise<User> {
        return this.httpClient.post(this.apiConfiguration.userWishlist + classifiedId, null)
            .toPromise()
            .then(response => response.json() as User)
            .catch(error => this.handleError(error));
    }

    removeFromWishlist(classifiedId: string): Promise<User> {
        return this.httpClient.delete(this.apiConfiguration.userWishlist + classifiedId, null)
            .toPromise()
            .then(response => response.json() as User)
            .catch(error => this.handleError(error));
    }

    private storeToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
}