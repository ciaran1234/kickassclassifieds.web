import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedListComponent } from './components/classified-list.component';
import { ClassifiedDetailsComponent } from './components/classified-details.component';
import { CreateClassifiedComponent } from './components/create-classified.component';
import { RouterModule } from '@angular/router';
import { ClassifiedService } from './services/classifieds.service';
import { ReactiveFormsModule } from '@angular/forms';

export const routerConfig = [{
  path: '',
  component: ClassifiedListComponent
}, {
  path: 'details/:id',
  component: ClassifiedDetailsComponent
}, {
  path: 'create',
  component: CreateClassifiedComponent
}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [ClassifiedListComponent, ClassifiedDetailsComponent, CreateClassifiedComponent],
  exports: [ClassifiedListComponent, ClassifiedDetailsComponent, CreateClassifiedComponent],
  providers: [ClassifiedService]
})

export default class ClassifiedModule { }
