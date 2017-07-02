import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin.component';
import { ConfirmAccountComponent } from './components/confirm-account.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password.component';
import { ResetPasswordComponent } from './components/reset-password.component';
import { RegistrationComponent } from './components/registration.component';
import { MeComponent } from './components/me.component';
import { MyClassifieds } from './components/my-classifieds.component';
import { MyMessages } from './components/my-messages.component';
import { MessageDetails } from './components/message-details.component';
import { MyWishList } from './components/my-wishlist.component';
import { ExternalSigninComponent } from './components/external-signin.component';

const routes: Routes = [
    { path: 'account/signin', component: SigninComponent },
    { path: 'account/register', component: RegistrationComponent },
    { path: 'account/externalSignin', component: ExternalSigninComponent },
    { path: 'account/confirm', component: ConfirmAccountComponent },
    { path: 'account/resetPassword', component: ResetPasswordComponent },
    { path: 'account/confirmResetPassword', component: ConfirmResetPasswordComponent },
    { path: 'account/me', component: MeComponent },
    { path: 'account/classifieds', component: MyClassifieds },
    { path: 'account/messages', component: MyMessages },
    { path: 'account/messages/details/:id', component: MessageDetails },
    { path: 'account/wishlist', component: MyWishList }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AccountRoutingModule { }

export const routedComponents = [
    SigninComponent,
    RegistrationComponent,
    MeComponent,
    MyClassifieds,
    MyMessages,
    MessageDetails,
    MyWishList,
    ExternalSigninComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent];