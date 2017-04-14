import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasifiedRoutingModule, routedComponents } from './classifieds.routing';
import { ClassifiedService } from './services/classifieds.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective, FileDropDirective , FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ImagePreview } from '../core/directives/image-preview.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ClasifiedRoutingModule, CommonModule, ReactiveFormsModule,  NgbModule.forRoot()],
  declarations: [routedComponents, FileSelectDirective, FileDropDirective, ImagePreview],
  providers: [ClassifiedService]
})

export class ClassifiedModule { }
