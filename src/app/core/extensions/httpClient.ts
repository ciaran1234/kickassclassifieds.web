import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class HttpClient {
    constructor(private http: Http) { }

    addAuthorizationHeader(options: RequestOptionsArgs) {
        options = options || {};
        options.headers = options.headers || new Headers();
        let token = localStorage.getItem('accessToken');

        if (token) {
            options.headers.append('Authorization', token);
        }

        return options;
    }

    get(url: string, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.get(url, options);
    }

    delete(url: string, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.delete(url, options);
    }

    head(url: string, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.head(url, options);
    }

    patch(url: string, data: any, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.patch(url, data, options);
    }

    post(url: string, data: any, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.post(url, data, options);
    }

    put(url: string, data: any, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.put(url, data, options);
    }

    options(url: string, data: any, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.put(url, data, options);
    }

    request(url: string, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        return this.http.request(url, options);
    }
}