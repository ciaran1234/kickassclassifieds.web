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
import { Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'account-message-details',
    templateUrl: '../views/message-details.component.html'
})

export class MessageDetailsComponent extends FormComponent implements OnInit {
    id: string;
    form: FormGroup;
    subscription: Subscription;
    user: User;
    @Input() messages: Message[];
    @Input() key: String;

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

        this.form = this.fb.group({
            _id: [this.key],
            body: ['', Validators.required]
        });
    }

    ngOnChanges() {   
        if (this.form) {
            this.form.get('_id').setValue(this.key);
        }
    }

    onSubmitted({ value, valid }: { value: MessageForm, valid: boolean }) {
        this.markFormAsSubmitted(this.form);
        if (valid === true) {
            value.url = location.protocol + '//' + location.host + '/account/messages/details/{key}';
            this.messageService.reply(value)
                .then(reply => {
                    this.form.reset();
                    this.form.get('_id').setValue(this.key);                  
                    this.messages.push(reply.messages[reply.messages.length -1]);
                })
                .catch(error => this.handleError(error));
        }
    }
}