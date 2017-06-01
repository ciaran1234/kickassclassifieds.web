import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Filter } from '../models/filters/filter';
import { FilterBuilder } from '../models/filters/filterBuilder';
import { ActivatedRoute, Router } from '@angular/router';

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

    getFiltered<T>(url: string, filter: Filter<T>,  router :Router, activeRoute: ActivatedRoute, options?: RequestOptionsArgs) {
        options = this.addAuthorizationHeader(options);
        let filteredUrl = new FilterBuilder<T>(router, activeRoute).buildQuery(filter, url);
        return this.http.get(filteredUrl, options);
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