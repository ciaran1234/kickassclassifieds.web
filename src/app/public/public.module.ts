import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from 'app/public/components/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedListComponent } from 'app/public/components/classified-list.component';
import { ClassifiedDetailsComponent } from 'app/public/components/classified-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassifiedDynamicDetailsComponent } from 'app/public/components/classified-dynamic-details.component';
import { SigninComponent } from 'app/public/components/signin.component';
import { RegistrationComponent } from 'app/public/components/registration.component';
import { OwlModule } from 'ng2-owl-carousel';
import { ConfirmAccountComponent } from 'app/public/components/confirm-account.component';
import { ConfirmResetPasswordComponent } from 'app/public/components/confirm-reset-password.component';
import { ExternalSigninComponent } from 'app/public/components/external-signin.component';
import { ResetPasswordComponent } from 'app/public/components/reset-password.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from 'app/layout/layout.module';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        OwlModule,
        NgbModule.forRoot(),
        NgxGalleryModule,
        NgxPaginationModule],
    declarations: [LandingPageComponent,
        ClassifiedListComponent,
        ClassifiedDetailsComponent,
        ClassifiedDynamicDetailsComponent,
        ConfirmAccountComponent,
        ConfirmResetPasswordComponent,
        ExternalSigninComponent,
        RegistrationComponent,
        ResetPasswordComponent,
        SigninComponent,
        RegistrationComponent],
    exports: [LandingPageComponent]
})

export class PublicModule { }