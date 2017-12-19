import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from 'app/public/components/registration.component';
import { CreateClassifiedComponent } from 'app/dashboard/components/create-classified.component';
import { EditClassifiedComponent } from 'app/dashboard/components/edit-classified.component';
import { ClassifiedFormComponent } from 'app/dashboard/components/classified-form.component';
import { MeComponent } from 'app/dashboard/components/me.component';
import { MessageDetailsComponent } from 'app/dashboard/components/message-details.component';
import { MyClassifiedsComponent } from 'app/dashboard/components/my-classifieds.component';
import { MyMessagesComponent } from 'app/dashboard/components/my-messages.component';
import { MyWishListComponent } from 'app/dashboard/components/my-wishlist.component';
import { ImagePreview } from '../core/directives/image-preview.directive';
import { DynamicFormService } from '../dynamic-forms/services/dynamic-form.service';
import { DynamicFormControl } from '../dynamic-forms/directives/dynamic-form-control.directive';
import { FileUploadModule } from 'ng2-file-upload';
import { OwlModule } from 'ng2-owl-carousel';
import { MyPrivacySettingsComponent } from 'app/dashboard/components/my-privacy-settings.component';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule.forRoot(),
        OwlModule,
        FileUploadModule],
    declarations: [
        ImagePreview,
        DynamicFormControl,
        CreateClassifiedComponent,
        EditClassifiedComponent,
        ClassifiedFormComponent,
        MeComponent,
        MessageDetailsComponent,
        MyClassifiedsComponent,
        MyMessagesComponent,
        MyWishListComponent,
        MyPrivacySettingsComponent],
    exports: [],
    providers: [DynamicFormService]
})

export class DashboardModule { }