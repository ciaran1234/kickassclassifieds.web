import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { HttpClient } from '../../core/services/http-client.service';
import { Injectable } from '@angular/core';
import { Classified } from '../models/classified.model';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

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

    getAll(): Observable<Classified[]> {
        return this.httpClient.get(this.apiConfiguration.classifieds)
            .map(res => res.json() as Classified[])
            .catch(err => this.handleError(err));
    }

    create(classified: Classified): Promise<Classified> {
        return this.httpClient.post(this.apiConfiguration.classifieds, classified)
            .toPromise()
            .then(response => response.json() as Classified)
            .catch(error => this.handleError(error));
    }

    edit(classified: Classified): Promise<Classified> {
        return this.httpClient.put(this.apiConfiguration.classifieds, classified)
            .toPromise()
            .then(response => response.json() as Classified)
            .catch(error => this.handleError(error));
    }

    deleteImages(id: string, images: string[]): Promise<boolean> {
        return this.httpClient.delete(this.apiConfiguration.classifiedImageUpload(id), { body: images })
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json() || error);
    }
}