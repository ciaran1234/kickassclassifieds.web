import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasifiedRoutingModule, routedComponents } from './classifieds.routing';
import { ClassifiedService } from './services/classifieds.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ImagePreview } from '../core/directives/image-preview.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
// import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";
import { ClassifiedDynamicDetailsComponent } from './components/classified-dynamic-details.component';
import { DynamicFormService } from '../dynamicForms/services/dynamicForm.service';
import { DynamicFormControl } from '../dynamicForms/directives/dynamicFormControl.directive';

@NgModule({
    imports: [ClasifiedRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        //  DynamicFormsCoreModule.forRoot(),
        //  DynamicFormsBootstrapUIModule,
        NgbModule.forRoot()],
    declarations:
    [routedComponents,
        FileSelectDirective,
        FileDropDirective,
        ImagePreview,
        ClassifiedDynamicDetailsComponent,
        DynamicFormControl
    ],
    providers: [ClassifiedService, DynamicFormService]
})

export class ClassifiedModule { }
