import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { Observable } from 'rxjs/observable';
import { Message } from '../../core/models/message.model';

@Component({
    selector: 'account-messages',
    templateUrl: './../views/my-messages.component.html'
})

export class MyMessagesComponent implements OnInit {
    messages: Observable<Message[]>;

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messages = this.messageService.getReceived().publish().refCount();
    }

    onTabChanged($event: any) {      
        switch ($event.nextId) {
            case 'received':
                this.messages = this.messageService.getReceived().publish().refCount();
                break;
            case 'sent':               
                this.messages = this.messageService.getSent().publish().refCount();
                break;
        }
    }  
}