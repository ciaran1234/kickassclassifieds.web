import { Routes } from "@angular/router";
import { CreateClassifiedComponent } from "app/dashboard/components/create-classified.component";
import { EditClassifiedComponent } from "app/dashboard/components/edit-classified.component";
import { MeComponent } from "app/dashboard/components/me.component";
import { MyMessagesComponent } from "app/dashboard/components/my-messages.component";
import { MyClassifiedsComponent } from "app/dashboard/components/my-classifieds.component";
import { MessageDetailsComponent } from "app/dashboard/components/message-details.component";
import { MyWishListComponent } from "app/dashboard/components/my-wishlist.component";
import { MyPrivacySettingsComponent } from "app/dashboard/components/my-privacy-settings.component";


export const DASHBOARD_ROUTES: Routes = [
    { path: 'classifieds/create', component: CreateClassifiedComponent },
    { path: 'classifieds/edit/:id', component: EditClassifiedComponent },
    { path: 'account/me', component: MeComponent },
    { path: 'account/messages/:type', component: MyMessagesComponent },
    { path: 'account/classifieds', component: MyClassifiedsComponent },
    { path: 'account/favourites', component: MyWishListComponent },
    { path: 'account/privacy', component: MyPrivacySettingsComponent }

];