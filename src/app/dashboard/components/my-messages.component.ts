import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { Observable } from 'rxjs/Rx';
import { Message } from '../../core/models/message.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'account-messages',
    templateUrl: './../views/my-messages.component.html'
})

export class MyMessagesComponent implements OnInit {
    messages: Observable<Message[]>;
    messageOpened: Boolean = false;
    selectedMessage: Message[];
    selectedMessageKey: String;

    constructor(private messageService: MessageService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            let type = params['type'];

            if (type === 'sent') {
                this.messages = this.messageService.getSent().publish().refCount();
            }
            else {
                this.messages = this.messageService.getReceived().publish().refCount();
            }

            this.messageOpened = false;
        });
    }

    onOpenMessage(message: Message) {
        this.messageOpened = true;

        this.selectedMessageKey = message.key;

        this.messageService.get(message.key)
            .then(messages => this.selectedMessage = messages)
            .catch(error => {
                console.log(error);
            });

        this.messageService.markAsRead(message.key)
            .then(() => { message.read = true; })
            .catch(error => console.log(error));
    }
}