import { Routes } from "@angular/router";
import { LandingPageComponent } from "app/public/components/landing-page.component";
import { ClassifiedListComponent } from "app/public/components/classified-list.component";
import { ClassifiedDetailsComponent } from "app/public/components/classified-details.component";
import { SigninComponent } from "app/public/components/signin.component";
import { RegistrationComponent } from "app/public/components/registration.component";
import { ConfirmAccountComponent } from "app/public/components/confirm-account.component";
import { ExternalSigninComponent } from "app/public/components/external-signin.component";

export const PUBLIC_ROUTES: Routes = [
    { path: '', component: LandingPageComponent, pathMatch: 'full' },
    { path: 'classifieds', component: ClassifiedListComponent },
    { path: 'classifieds/details/:id', component: ClassifiedDetailsComponent },
    { path: 'account/signin', component: SigninComponent },
    { path: 'account/register', component: RegistrationComponent },
    { path: 'account/confirm', component: ConfirmAccountComponent },
    { path: 'account/externalSignin', component: ExternalSigninComponent }
];