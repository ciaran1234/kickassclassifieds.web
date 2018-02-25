import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InnerBannerComponent } from './components/inner-banner.component';
import { PublicComponent } from 'app/layout/components/public.component';
import { DashboardComponent } from 'app/layout/components/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleCarouselDirective } from 'app/layout/directives/simple-carousel.directive';
import { SimpleCarouselItemDirective } from 'app/layout/directives/simple-carousel-item.directive';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, NgbModule.forRoot(), RouterModule],
    declarations: [PublicComponent, DashboardComponent, InnerBannerComponent, SimpleCarouselDirective, SimpleCarouselItemDirective],
    exports: [InnerBannerComponent, SimpleCarouselDirective, SimpleCarouselItemDirective]
})

export class LayoutModule { }