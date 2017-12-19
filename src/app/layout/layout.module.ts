import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InnerBannerComponent } from './components/inner-banner.component';
import { PublicComponent } from 'app/layout/components/public.component';
import { DashboardComponent } from 'app/layout/components/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, NgbModule.forRoot(), RouterModule],
    declarations: [PublicComponent, DashboardComponent, InnerBannerComponent],
    exports: [InnerBannerComponent]
})

export class LayoutModule { }