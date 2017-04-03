import { Injectable } from '@angular/core';

@Injectable()
export class ApiConfiguration {
    private schema = 'http://';
    private host = 'localhost:3000/';
    private hostApi = this.host + 'api/';
    private accountUrl = 'auth/';
    private locationsUrl = 'locations/';
    private classifiedUrl = 'classifieds/'
    private users = 'users/';

    //account urls
    readonly confirmResetPassword = this.schema + this.hostApi + this.accountUrl + 'confirmResetPassword';
    readonly resetPassword = this.schema + this.hostApi + this.accountUrl + 'resetPassword';
    readonly login = this.schema + this.hostApi + this.accountUrl + 'signin';
    readonly me = this.schema + this.hostApi + this.users + 'me';
    readonly register = this.schema + this.hostApi + this.accountUrl + 'signup';
    readonly locations = this.schema + this.hostApi + this.locationsUrl;
    readonly exchangeExternalToken = this.schema + this.hostApi + this.accountUrl + 'exchange';
    readonly confirmAccount = this.schema + this.hostApi + this.accountUrl + 'confirm';
    readonly removeExternalLogin = this.schema + this.hostApi + this.accountUrl + 'social';
    readonly uploadProfilePicture = this.schema + this.hostApi + this.users + 'picture';

    //classified urls
    readonly getAllClassifieds =  this.schema + this.hostApi + this.classifiedUrl;

    openAuthEndpoint(provider: string, redirectUrl: string, token?: string): string {
        return this.schema + this.hostApi + this.accountUrl + provider + '?redirectUrl=' + redirectUrl + (token ? '&local_token=' + token : '');
    }
}