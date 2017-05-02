import { NgModule } from '@angular/core';
import { ClassifiedListComponent } from './components/classified-list.component';
import { ClassifiedDetailsComponent } from './components/classified-details.component';
import { CreateClassifiedComponent } from './components/create-classified.component';
import { ClassifiedDynamicComponent } from './components/classified-dynamic.component';
import {DynamicFormDetailsComponent} from './components/dynamic-form-details-conponent';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'classifieds', component: ClassifiedListComponent },
    { path: 'classifieds/details/:id', component: ClassifiedDetailsComponent },
    { path: 'classifieds/create', component: CreateClassifiedComponent },
    { path: 'classifieds/dynamic', component: ClassifiedDynamicComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class ClasifiedRoutingModule { }

export const routedComponents = [
    ClassifiedListComponent,
    ClassifiedDetailsComponent,
    CreateClassifiedComponent,
    ClassifiedDynamicComponent,
    DynamicFormDetailsComponent
]