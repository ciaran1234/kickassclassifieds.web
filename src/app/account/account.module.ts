import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule, routedComponents } from './account.routing';

@NgModule({
    imports: [AccountRoutingModule, CoreModule, CommonModule, ReactiveFormsModule],
    declarations: [routedComponents]
})

export class AccountModule { }
