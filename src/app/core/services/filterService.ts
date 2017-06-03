import { Filter } from '../models/filters/filter';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '../extensions/httpClient';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

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

        this.router.navigate([], {
            queryParams: this.filter,
            relativeTo: this.activedRoute
        });

        let queryString = this.buildQueryString(this.filter);

        return this.httpClient.get(filteredUrl + queryString)
            .map(res => res.json() as TResponse);
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