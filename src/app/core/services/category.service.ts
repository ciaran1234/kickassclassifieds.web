import { ApiConfiguration } from './api-configuration.service';
import { HttpClient } from './http-client.service';
import { Injectable } from '@angular/core';
import { Category } from './../models/category.model';
import 'rxjs/add/operator/toPromise';
import _ from 'lodash';

@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) { }

    get(id: string): Promise<Category> {
        return this.httpClient.get(this.apiConfiguration.categoryDetails(id))
            .toPromise()
            .then(response => response.json() as Category)
            .catch(error => this.handleError(error));
    }

    getAll(): Promise<Category[]> {
        return this.httpClient.get(this.apiConfiguration.categories)
            .toPromise()
            .then(response => response.json() as Category[])
            .catch(error => this.handleError(error));
    }

    getAllGrouped(): Promise<Category[]> {
        return this.getAll()
            .then(response => {  

                var groupedData = _.groupBy(response, "parent");
                return _.map(groupedData["undefined"], function (item) {
                    return _.defaults(item, { "children": groupedData[item._id] });
                });   

            }).catch(error => this.handleError(error));
    }

    getParents(): Promise<Category[]> {
        return this.httpClient.get(this.apiConfiguration.parentCategories)
            .toPromise()
            .then(response => response.json() as Category[])
            .catch(error => this.handleError(error));
    }

    getSubCategories(id: string): Promise<Category[]> {
        return this.httpClient.get(this.apiConfiguration.subCategories(id))
            .toPromise()
            .then(response => response.json() as Category[])
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json() || error);
    }
}