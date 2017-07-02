import { Injectable } from '@angular/core';
import { HttpClient } from './http-client.service';
import { BaseService } from './base.service';
import { ApiConfiguration } from './api-configuration.service';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/observable';
import { MessageForm } from '../models/message-form.model';

@Injectable()
export class MessageService extends BaseService {
    constructor(private httpClient: HttpClient,
        private apiConfiguration: ApiConfiguration) {
        super();
    }

    get(key: string): Promise<any> {
        return this.httpClient.get(this.apiConfiguration.messageDetails(key))
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => this.handleError(error));
    }

    getSent(): Observable<any> {
        return this.httpClient.get(this.apiConfiguration.messagesSent)
            .map(response => response.json() as any)
            .catch(error => this.handleError(error));
    }

    getReceived(): Observable<any> {
        return this.httpClient.get(this.apiConfiguration.messagesReceived)
            .map(response => response.json() as any)
            .catch(error => this.handleError(error));
    }

    send(message: MessageForm): Promise<boolean> {
        return this.httpClient.post(this.apiConfiguration.messages, message)
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }

    reply(message: MessageForm): Promise<any> {
        return this.httpClient.post(this.apiConfiguration.messageReply, message)
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => this.handleError(error));
    }

    markAsRead(key: string): Promise<boolean> {
        return this.httpClient.patch(this.apiConfiguration.markMessageAsRead(key), null)
            .toPromise()
            .then(response => true)
            .catch(error => this.handleError(error));
    }
}