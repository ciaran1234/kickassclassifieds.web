import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageForm } from '../../core/models/message-form.model';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { ClassifiedService } from 'app/core/services/classified.service';
import { Classified } from 'app/core/models/classified.model';
import { User } from 'app/core/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryAnimation } from 'ngx-gallery';
import { Router } from '@angular/router';
import { FormComponent } from 'app/core/components/form.component';

@Component({
    selector: 'classified-details',
    templateUrl: '../views/classified-details.component.html'
})

export class ClassifiedDetailsComponent extends FormComponent implements OnInit {
    id: string;
    classified: Classified;
    modalRef: any;
    messageForm: FormGroup;
    reportForm: FormGroup;
    user: User;
    subscription: Subscription;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    hidePhoneNumber: Boolean = true;

    safetyTips: Array<string> = ['Quis nostrud exeration ullamcos nisiutia aliq ex ea commodo coquat eaute irure dolor rolatem renderit.',
        'Quis nostrud exeration ullamcos nisiutia aliq ex ea commodo coquat eaute irure dolor rolatem renderit',
        'Quis nostrud exeration ullamcos nisiutia aliq ex ea commodo coquat eaute irure dolor rolatem renderit'];

    constructor(private classifiedService: ClassifiedService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private modalService: NgbModal,
        protected router: Router,
        private userService: UserService) {
        super(router);
    }

    ngOnInit() {
        this.galleryOptions = [
            {
                "thumbnailsColumns": 9,
                "thumbnailsPercent": 20,
                "imagePercent": 100,
                "thumbnailMargin": 1,
                "thumbnailsMargin": 1,
                "thumbnailsOrder": 2,
                width: "100%",
                imageArrows: false,
                thumbnailsArrows: false
            },
            { "breakpoint": 500, "width": "100%", "height": "300px", "thumbnailsColumns": 3 },
            { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
        ];

        this.galleryImages = [];
        this.subscription = this.userService.user.subscribe(user => this.user = user);

        this.messageForm = this.fb.group({
            key: [''],
            subject: ['', [Validators.required, Validators.max(40)]],
            body: ['', [Validators.required, Validators.max(2000)]],
            classifiedId: ['', [Validators.required]],
            url: [location.protocol + '//' + location.host + '/account/messages/details/{key}']
        });

        this.reportForm = this.fb.group({
            id: ['', Validators.required],
            reason: ['This is illegal/fraudulent', [Validators.required]],
            information: ['', [Validators.required, Validators.max(2000)]]
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getClassifiedDetails();
            this.messageForm.get('classifiedId').setValue(this.id);
            this.reportForm.get('id').setValue(this.id);
        });
    }

    private getClassifiedDetails() {
        return this.classifiedService.get(this.id)
            .then(classified => {
                this.classified = classified;
                this.galleryImages.length = 0;

                for (let i in classified.images) {
                    this.galleryImages.push({
                        small: classified.images[i].path,
                        medium: classified.images[i].path,
                        big: classified.images[i].path
                    });
                }
            }).catch(error => this.handleError(error));
    }

    open(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg', windowClass: 'tg-thememodal tg-categorymodal' });
    }

    onClassifiedReported({ value, valid }: { value: any, valid: boolean }) {
        this.markFormAsSubmitted(this.reportForm);

        if (valid === true) {
            this.classifiedService.report(value)
                .then(result => {
                    alert('Reported');
                    this.resetReportForm();
                })
                .catch(error => this.handleError(error));
        }
    }

    resetReportForm() {
        this.reportForm.reset({
            id: this.reportForm.get('id').value,
            reason: 'This is illegal/fraudulent'         
        })
    }

    onMessageSent({ value, valid }: { value: any, valid: boolean }, content) {
        this.markFormAsSubmitted(this.messageForm);


        console.log(this.messageForm.value);

        if (valid === true) {
            this.messageService.send(value as MessageForm)
                .then(response => {
                    this.messageForm.reset({
                        key: this.messageForm.get('key').value,
                        classifiedId: this.messageForm.get('classifiedId').value,
                        url: location.protocol + '//' + location.host + '/account/messages/details/{key}'
                    });
                    this.modalRef.close();
                }).catch(error => alert(error.messages ? error.messages[0] : 'Error'));
        }
    }
}
