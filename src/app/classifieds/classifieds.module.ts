import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagePreview } from '../core/directives/image-preview.directive';
import { ClasifiedRoutingModule, routedComponents } from './classifieds-routing.module';
import { ClassifiedService } from './services/classified.service';
import { ClassifiedDynamicDetailsComponent } from './components/classified-dynamic-details.component';
import { ClassifiedFormComponent } from './components/classified-form.component';
import { DynamicFormService } from '../dynamic-forms/services/dynamic-form.service';
import { DynamicFormControl } from '../dynamic-forms/directives/dynamic-form-control.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ClasifiedRoutingModule,
        CommonModule,      
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot()],
    declarations: [routedComponents,
        FileSelectDirective,
        FileDropDirective,
        ImagePreview,
        ClassifiedDynamicDetailsComponent,
        ClassifiedFormComponent,
        DynamicFormControl
    ],
    providers: [ClassifiedService,
        DynamicFormService
     ]
})

export class ClassifiedModule { }
