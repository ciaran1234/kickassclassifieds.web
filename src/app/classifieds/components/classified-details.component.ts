import { Component, OnInit } from '@angular/core';
import { Classified } from '../models/classified.model';
import { ClassifiedService } from '../services/classified.service';
import { MessageService } from '../../core/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageForm } from '../../core/models/message-form.model';

@Component({
    selector: 'classified-details',
    templateUrl: '../views/classified-details.component.html'
})

export class ClassifiedDetailsComponent implements OnInit {
    id: string;
    classified: Classified;
    message: MessageForm = new MessageForm();

    constructor(private classifiedService: ClassifiedService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getClassifiedDetails();
            this.message.classifiedId = this.id;
        });
    }

    private getClassifiedDetails() {
        return this.classifiedService.get(this.id)
            .then(classified => this.classified = classified)
            .catch(error => alert('error.....'));
    }

    open(content) {
        this.modalService.open(content);
    }

    sendMessage() {
        if (this.message && this.message.body.length > 0 && this.message.subject.length > 0) {
            this.messageService.send(this.message)
                .then(response => {
                    alert(response);
                })
                .catch(error => alert(error));
        }
    }
}
