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
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    selector: 'classified-details',
    templateUrl: '../views/classified-details.component.html'
})

export class ClassifiedDetailsComponent implements OnInit {
    id: string;
    classified: Classified;
    message: MessageForm = new MessageForm();
    user: User;
    subscription: Subscription;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private classifiedService: ClassifiedService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private userService: UserService) { }

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

        // this.galleryImages = [
        //     {
        //         small: 'assets/images/gallery/thumbs/thumb1.jpg',
        //         medium: 'assets/images/gallery/small/image1.jpg',
        //         big: 'assets/images/gallery/large/image1.jpg'
        //     },
        //     {
        //         small: 'assets/images/gallery/thumbs/thumb2.jpg',
        //         medium: 'assets/images/gallery/small/image2.jpg',
        //         big: 'assets/images/gallery/large/image2.jpg'
        //     },
        //     {
        //         small: 'assets/images/gallery/thumbs/thumb3.jpg',
        //         medium: 'assets/images/gallery/small/image3.jpg',
        //         big: 'assets/images/gallery/large/image3.jpg'
        //     }
        // ];

        this.subscription = this.userService
            .user.subscribe(user => this.user = user);

        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getClassifiedDetails();
            this.message.classifiedId = this.id;
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
            })
            .catch(error => alert('error.....'));
    }

    open(content) {
        this.modalService.open(content);
    }

    sendMessage() {
        if (this.message && this.message.body.length > 0 && this.message.subject.length > 0) {
            this.message.url = location.protocol + '//' + location.host + '/account/messages/details/{key}';
            this.messageService.send(this.message)
                .then(response => {
                    alert(response);
                })
                .catch(error => alert(error));
        }
    }
}
