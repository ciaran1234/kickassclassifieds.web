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
    private usersUrl = 'users/';
    private currenciesUrl = 'currencies/';
    private countriesUrl = 'countries/';
    private messagesUrl = 'messages/';

    //account urls
    readonly confirmResetPassword = this.schema + this.hostApi + this.accountUrl + 'confirmResetPassword/';
    readonly resetPassword = this.schema + this.hostApi + this.accountUrl + 'resetPassword/';
    readonly login = this.schema + this.hostApi + this.accountUrl + 'signin/';
    readonly me = this.schema + this.hostApi + this.usersUrl + 'me/';
    readonly myClassifieds = this.me + 'classifieds/';
    readonly register = this.schema + this.hostApi + this.accountUrl + 'signup/';
    readonly locations = this.schema + this.hostApi + this.locationsUrl;
    readonly exchangeExternalToken = this.schema + this.hostApi + this.accountUrl + 'exchange/';
    readonly confirmAccount = this.schema + this.hostApi + this.accountUrl + 'confirm/';
    readonly removeExternalLogin = this.schema + this.hostApi + this.accountUrl + 'social/';
    readonly uploadProfilePicture = this.schema + this.hostApi + this.usersUrl + 'picture/';
    readonly userWishlist = this.schema + this.hostApi + this.usersUrl + 'wishlist/'
    readonly users = this.schema + this.hostApi + this.usersUrl;
    readonly currencies = this.schema + this.hostApi + this.currenciesUrl;
    readonly countries = this.schema + this.hostApi + this.countriesUrl;

    //messages
    readonly messages = this.schema + this.hostApi + this.messagesUrl;
    readonly messageReply = this.messages + 'reply';
    readonly messagesReceived = this.messages + 'received/';
    readonly messagesSent = this.messages + 'sent/';

    messageDetails(key: string) {
        return this.messages + key;
    }

    markMessageAsRead(key: string) {
        return this.messages + 'markasread/' + key;
    }

    //classified
    readonly classifieds = this.schema + this.hostApi + this.classifiedUrl;

    classifiedDetails(id: string) {
        return this.classifieds + id;
    }

    classifiedImageUpload(id: string) {
        return this.classifieds + id + '/images';
    }

    //categories
    readonly categories = this.schema + this.hostApi + this.categoriesUrl;
    readonly parentCategories = this.categories + 'parents/'
    categoryDetails(id: string) {
        return this.categories + id;
    }
    
    subCategories(id: string) {
        return this.categories + id + '/subcategories';
    }

    //external authentication
    openAuthEndpoint(provider: string, redirectUrl: string, token?: string): string {
        return this.schema + this.hostApi + this.accountUrl + provider + '?redirectUrl=' + redirectUrl + (token ? '&local_token=' + token : '');
    }
}