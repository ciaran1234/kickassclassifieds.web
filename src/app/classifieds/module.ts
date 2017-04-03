import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedListComponent } from './components/classified-list.component';
import { RouterModule } from '@angular/router';
import { ClassifiedService } from './services/classifieds.service';

export const routerConfig = [{
  path: '',
  component: ClassifiedListComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig)
  ],
  declarations: [ClassifiedListComponent],
  exports: [ClassifiedListComponent],
  providers: [ClassifiedService]
})

export default class ClassifiedModule { }
