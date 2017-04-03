import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { HttpClient } from '../../core/extensions/httpClient';
import { Injectable } from '@angular/core';
import { Classified } from '../models/classified';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClassifiedService {

    constructor(private httpClient: HttpClient,
        private apiConfiguration: ApiConfiguration) { }

    get(id: string): Promise<Classified> {
        return this.httpClient.get(this.apiConfiguration.classifiedDetails(id))
            .toPromise()
            .then(res => res.json() as Classified)
            .catch(error => this.handleError(error));
    }

    getAll(): Promise<Classified[]> {
        return this.httpClient.get(this.apiConfiguration.classifieds)
            .toPromise()
            .then(res => res.json() as Classified[])
            .catch(error => this.handleError(error));
    }

    create(classified: Classified): Promise<Classified> {
        return this.httpClient.post(this.apiConfiguration.classifieds, classified)
            .toPromise()
            .then(response => response.json() as Classified)
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json() || error);
    }
}