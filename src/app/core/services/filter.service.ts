import { Filter } from '../models/filters/filter';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from './http-client.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import clean from 'lodash-clean';

@Injectable()
export class FilterService<TFilter extends Filter, TResponse> {
    filter: TFilter;
    querySubscription: Subscription;

    constructor(private router: Router,
        private activedRoute: ActivatedRoute,
        private httpClient: HttpClient
    ) { }

    init() {
        this.filter = new Filter() as TFilter;

        this.querySubscription = this.activedRoute
            .queryParams
            .subscribe(params => {
                for (let property in params) {
                    this.filter[property] = params[property];
                }
            });
    }

    query(filter: TFilter, url: string): Observable<TResponse> {
        if (filter) {
            this.filter = filter;
        }

        let filteredUrl = url.endsWith('?') ? url : url + '?';
        let cleanFilter = clean(this.filter);

        this.router.navigate([], {
            queryParams: cleanFilter,
            relativeTo: this.activedRoute
        });

        let queryString = this.buildQueryString(cleanFilter);

        return this.httpClient.get(filteredUrl + queryString).map(response => response.json() as TResponse);
    }

    private buildQueryString(filter: any) {
        let queryString = '';

        for (let property in filter) {
            if (filter[property]) {
                if (typeof (filter[property]) === 'object') {
                    let subQuery = this.buildQueryString(filter[property]);

                    if (subQuery) {
                        queryString += property + '.' + subQuery;
                    }
                }
                else {
                    queryString += property + '=' + filter[property] + '&';
                }
            }
        }

        return queryString;
    }
}