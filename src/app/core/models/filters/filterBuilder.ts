import { Filter } from './filter';
import { ActivatedRoute, Router } from '@angular/router';

export class FilterBuilder<T> {

    constructor(private router: Router, private activeRoute: ActivatedRoute) {
        console.log(this.router.url);
    }

    buildQuery(filter: Filter<T>, url: string) {
        let filteredUrl = url.endsWith('?') ? url : url + '?';      

        this.router.navigate([], {
            queryParams: filter,
            relativeTo: this.activeRoute
        });

        return filteredUrl + this.buildQueryString(filter);
    }

    private buildQueryString(filter: Filter<T>) {
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