import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin.component';
import { ConfirmAccountComponent } from './components/confirmAccount.component';
import { ConfirmResetPasswordComponent } from './components/confirmResetPassword.component';
import { ResetPasswordComponent } from './components/resetPassword.component';
import { RegistrationComponent } from './components/registration.component';
import { MeComponent } from './components/me.component';
import { ExternalSigninComponent } from './components/externalSignin.component';

const routes: Routes = [
    { path: 'account/signin', component: SigninComponent },
    { path: 'account/register', component: RegistrationComponent },
    { path: 'account/me', component: MeComponent },
    { path: 'account/externalSignin', component: ExternalSigninComponent },
    { path: 'account/confirm', component: ConfirmAccountComponent },
    { path: 'account/resetPassword', component: ResetPasswordComponent },
    { path: 'account/confirmResetPassword', component: ConfirmResetPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AccountRoutingModule { }

export const routedComponents = [SigninComponent,
    RegistrationComponent,
    MeComponent,
    ExternalSigninComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent];