import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule, routedComponents } from './account-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [AccountRoutingModule,
        CoreModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule.forRoot()],
    declarations: [routedComponents]
})

export class AccountModule { }
