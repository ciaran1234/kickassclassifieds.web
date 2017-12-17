import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InnerBannerComponent } from './components/inner-banner.component';
import { PublicComponent } from 'app/layout/components/public.component';
import { DashboardComponent } from 'app/layout/components/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    declarations: [PublicComponent, DashboardComponent, InnerBannerComponent],
    exports: [InnerBannerComponent]
})

export class LayoutModule { }