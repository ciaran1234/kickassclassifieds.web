import { ApiConfiguration } from './api-configuration.service';
import { HttpClient } from '../extensions/httpClient';
import { Injectable } from '@angular/core';
import { Category } from './../models/category';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) { }

    get(id: string): Promise<Category> {
        return this.httpClient.get(this.apiConfiguration.categoryDetails(id))
            .toPromise()
            .then(response => response.json() as Category)
            .catch(error => this.handleError(error));
    }

    getParents(): Promise<Category[]> {
        return this.httpClient.get(this.apiConfiguration.categories)
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