import { ApiConfiguration } from './api-configuration.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Location } from './../models/location';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocationService {

    constructor(private http: Http, private apiConfiguration: ApiConfiguration) { }

    getLocationsByParentId(id: number): Promise<Location[]> {
        return this.http.get(this.apiConfiguration.locations + '?$filter= parent/id eq ' + id + '&$select=id,name')
            .toPromise()
            .then(response => response.json().value as Location[])
            .catch(this.handleError);
    }

    getLocations(): Promise<Location[]> {
        return this.http.get(this.apiConfiguration.locations)
            .toPromise()
            .then(response => response.json().value as Location[])
            .catch(this.handleError);
    }   

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}