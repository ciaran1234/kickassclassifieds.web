import { Injectable } from '@angular/core';

@Injectable()
export class ApiConfiguration {
    private schema = 'http://';
    private host = 'localhost:3000/';
    private hostApi = this.host + 'api/';
    private accountUrl = 'auth/';
    private locationsUrl = 'locations/';
    private classifiedUrl = 'classifieds/';
    private categoriesUrl = 'categories/';
    private users = 'users/';
    private currenciesUrl = 'currencies/';
    private countriesUrl = 'countries/';

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
    readonly currencies = this.schema + this.hostApi + this.currenciesUrl;
    readonly countries = this.schema + this.hostApi + this.countriesUrl;

    //classified urls
    readonly classifieds = this.schema + this.hostApi + this.classifiedUrl;
    classifiedDetails(id: string) {
        return this.classifieds + id;
    }

    classifiedImageUpload(id: string) {
        return this.classifieds + id + '/uploadImages';
    }

    //categories urls
    readonly categories = this.schema + this.hostApi + this.categoriesUrl;
    readonly parentCategories = this.categories + 'parents/'
    categoryDetails(id: string) {
        return this.categories + id;
    }
    subCategories(id: string) {
        return this.categories + id + '/subcategories';
    }

    openAuthEndpoint(provider: string, redirectUrl: string, token?: string): string {
        return this.schema + this.hostApi + this.accountUrl + provider + '?redirectUrl=' + redirectUrl + (token ? '&local_token=' + token : '');
    }
}