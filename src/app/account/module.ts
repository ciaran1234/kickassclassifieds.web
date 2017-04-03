import { UserService } from '../core/services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAccountComponent } from './components/confirmAccount.component';
import { ConfirmResetPasswordComponent } from './components/confirmResetPassword.component';
import { ResetPasswordComponent } from './components/resetPassword.component';
import { SigninComponent } from './components/signin.component';
import { RegistrationComponent } from './components/registration.component';
import { MeComponent } from './components/me.component';
import { ExternalSigninComponent } from './components/externalSignin.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

export const routerConfig = [{
  path: '',
  children: [{
    path: 'login',
    component: SigninComponent
  }, {
    path: 'register',
    component: RegistrationComponent
  }, {
    path: 'me',
    component: MeComponent
  }, {
    path: 'externalSignin',
    component: ExternalSigninComponent
  }, {
    path: 'confirm',
    component: ConfirmAccountComponent
  }, {
    path: 'resetPassword',
    component: ResetPasswordComponent
  }, {
    path: 'confirmResetPassword',
    component: ConfirmResetPasswordComponent
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [ConfirmAccountComponent,
    SigninComponent,
    RegistrationComponent,
    MeComponent,
    ExternalSigninComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent],
  exports: [ConfirmAccountComponent,
    SigninComponent,
    RegistrationComponent,
    MeComponent,
    ExternalSigninComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent],
})

export default class AccountModule { }
