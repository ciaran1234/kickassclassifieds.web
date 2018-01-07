import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { FormComponent } from '../../core/components/form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { UserService } from 'app/core/services/user.service';
import { User } from 'app/core/models/user.model';
import { Settings } from 'app/core/models/settings.model';

@Component({
    selector: 'app-privacy-settings',
    templateUrl: '../views/my-privacy-settings.component.html'
})

export class MyPrivacySettingsComponent extends FormComponent implements OnInit {
    deleteForm: FormGroup;
    settingsForm: FormGroup;
    modalRef: any;
    reasons: String[] = ['Abuse', 'Lost Interested', 'Prefer Not To Say'];
    user: User;

    constructor(protected router: Router,
        private modalService: NgbModal,
        private userService: UserService,
        private fb: FormBuilder) {
        super(router);
    }

    ngOnInit() {
        this.deleteForm = this.fb.group({
            reason: ['', [Validators.required]],
            description: ['', [Validators.required, Validators.maxLength(2000)]]
        });

        this.userService.me().then(user => {
            this.user = user;

            this.settingsForm = this.fb.group({
                publicProfilePicture: [this.user.settings.publicProfilePicture],
                receiveNewsletter: [this.user.settings.receiveNewsletter],
                receiveEmailNotifications: [this.user.settings.receiveEmailNotifications]
            });
        }).catch(error => this.handleError(error));
    }

    onDeleteFormSubmitted({ value, valid }: { value: any, valid: boolean }, content: any) {
        this.markFormAsSubmitted(this.deleteForm);

        if (valid === true) {
            this.onModalOpened(content);
        }
    }

    onSettingsSubmitted({ value, valid }: { value: Settings, valid: boolean }) {
        if (valid) {
            this.user.settings = value;
            this.userService.update(this.user)
                .then(user => {
                    this.user = user;
                    this.userService.onUserChanged(user);
                })
                .catch(error => this.handleError(error));
        }
    }

    onModalOpened(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg', windowClass: 'tg-thememodal tg-modaldeleteconfirmation' });
    }

    onAccountDeleted() {
        this.userService.deleteAccount().then(result => {
            this.userService.signout();
            this.modalRef.close();
            this.router.navigateByUrl('/');
        }).catch(error => this.handleError(error));
    }
}
