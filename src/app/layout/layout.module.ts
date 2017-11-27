import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InnerBannerComponent } from './components/inner-banner.component';
import { FooterLayoutComponent } from './components/footer-layout.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [InnerBannerComponent, FooterLayoutComponent],
    exports: [InnerBannerComponent, FooterLayoutComponent]
})

export class LayoutModule { }