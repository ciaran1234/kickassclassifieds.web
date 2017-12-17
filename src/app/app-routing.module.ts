import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/components/home.component';
import { PublicComponent } from 'app/layout/components/public.component';
import { DashboardComponent } from 'app/layout/components/dashboard.component';
import { PUBLIC_ROUTES } from 'app/public/public.routes';
import { DASHBOARD_ROUTES } from 'app/dashboard/dashboard.routes';
import { AuthorizationValidator } from 'app/core/validation/authorization.validator';


const routes: Routes = [
    //{ path: '', pathMatch: 'full', component: HomeComponent },
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: 'dashboard', canActivate: [AuthorizationValidator], component: DashboardComponent, data: { title: 'Secure Views' }, children: DASHBOARD_ROUTES }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [HomeComponent];