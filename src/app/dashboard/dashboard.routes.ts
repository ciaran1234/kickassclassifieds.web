import { Routes } from "@angular/router";
import { CreateClassifiedComponent } from "app/dashboard/components/create-classified.component";
import { EditClassifiedComponent } from "app/dashboard/components/edit-classified.component";
import { MeComponent } from "app/dashboard/components/me.component";
import { MyMessagesComponent } from "app/dashboard/components/my-messages.component";
import { MyClassifiedsComponent } from "app/dashboard/components/my-classifieds.component";
import { MessageDetailsComponent } from "app/dashboard/components/message-details.component";


export const DASHBOARD_ROUTES: Routes = [
    { path: 'classifieds/create', component: CreateClassifiedComponent },
    { path: 'classifieds/edit/:id', component: EditClassifiedComponent },
    { path: 'account/me', component: MeComponent },
    { path: 'account/messages', component: MyMessagesComponent, children: [{ path: 'details/:id', component: MessageDetailsComponent }] },
    { path: 'account/classifieds', component: MyClassifiedsComponent },

];