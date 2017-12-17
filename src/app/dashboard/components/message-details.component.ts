import { Component, OnInit } from '@angular/core';
import { MessageForm } from '../../core/models/message-form.model';
import { MessageService } from '../../core/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormComponent } from '../../core/components/form.component';
import { Message } from '../../core/models/message.model';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/core/models/user.model';
import { UserService } from 'app/core/services/user.service';

@Component({
    selector: 'account-message-details',
    templateUrl: '../views/message-details.component.html'
})

export class MessageDetailsComponent extends FormComponent implements OnInit {
    id: string;
    messages: Message[];
    form: FormGroup;
    subscription: Subscription;
    user: User;

    constructor(private fb: FormBuilder,
        private messageService: MessageService,
        private activeRoute: ActivatedRoute,
        private route: Router,
        private userService: UserService) {
        super(route);
    }

    ngOnInit() {
        this.subscription = this.userService
        .user.subscribe((user: User) => {
            if (!user) {
                this.userService.checkIfUserLoggedIn();
            }

            this.user = user;        
        });

        this.activeRoute.params.subscribe(params => {
            this.id = params['id'];

            this.form = this.fb.group({
                key: [this.id],
                body: ['', Validators.required]
            });

            this.messageService.get(this.id)
                .then(messages => this.messages = messages)
                .catch(error => {
                    console.log(error);
                });

            this.messageService.markAsRead(this.id)
                .catch(error => console.log(error));

        });
    }

    onSubmitted({ value, valid }: { value: MessageForm, valid: boolean }) {
        this.markFormAsSubmitted(this.form);      
        if (valid === true) {
            value.url = location.protocol + '//' + location.host + '/account/messages/details/{key}';
            this.messageService.reply(value)
                .then(reply => {
                    this.form.reset();
                    this.form.get('key').setValue(this.id);
                    this.messages.push(reply);
                })
                .catch(error => this.handleError(error));
        }
    }
}