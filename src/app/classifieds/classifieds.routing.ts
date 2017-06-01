import { NgModule } from '@angular/core';
import { ClassifiedListComponent } from './components/classified-list.component';
import { ClassifiedInfoComponent } from './components/classified-info.component';
import { CreateClassifiedComponent } from './components/create-classified.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'classifieds', component: ClassifiedListComponent },
    { path: 'classifieds/details/:id', component: ClassifiedInfoComponent },
    { path: 'classifieds/create', component: CreateClassifiedComponent } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class ClasifiedRoutingModule { }

export const routedComponents = [
    ClassifiedListComponent,
    ClassifiedInfoComponent,
    CreateClassifiedComponent   
]