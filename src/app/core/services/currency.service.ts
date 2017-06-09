import { ApiConfiguration } from './api-configuration.service';
import { HttpClient } from './http-client.service';
import { Injectable } from '@angular/core';
import { Currency } from './../models/currency.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CurrencyService {

    constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) { }

    get(id: string): Promise<Currency> {
        return this.httpClient.get(this.apiConfiguration.currencies + id)
            .toPromise()
            .then(response => response.json() as Currency)
            .catch(error => this.handleError(error));
    }

    getAll(): Promise<Currency[]> {
        return this.httpClient.get(this.apiConfiguration.currencies)
            .toPromise()
            .then(response => response.json() as Currency[])
            .catch(error => this.handleError(error));
    }
  

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json() || error);
    }
}