import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasifiedRoutingModule, routedComponents } from './classifieds.routing';
import { ClassifiedService } from './services/classifieds.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ClasifiedRoutingModule, CommonModule, ReactiveFormsModule],
  declarations: [routedComponents],
  providers: [ClassifiedService]
})

export class ClassifiedModule { }
