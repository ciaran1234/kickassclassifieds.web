import { ApiConfiguration } from './api-configuration.service';
import { HttpClient } from '../extensions/httpClient';
import { Injectable } from '@angular/core';
import { Country } from './../models/country';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountryService {

    constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) { }

    get(id: string): Promise<Country> {
        return this.httpClient.get(this.apiConfiguration.countries + id)
            .toPromise()
            .then(response => response.json() as Country)
            .catch(error => this.handleError(error));
    }

    getAll(): Promise<Country[]> {
        return this.httpClient.get(this.apiConfiguration.countries)
            .toPromise()
            .then(response => response.json() as Country[])
            .catch(error => this.handleError(error));
    }
  

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json() || error);
    }
}