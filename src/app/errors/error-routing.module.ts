import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class ErrorRoutingModule { }

export const errorRoutedComponents = [
    NotFoundComponent
]