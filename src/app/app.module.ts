import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppSearchComponent } from './layout/components/app-search.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LocationService } from './core/services/location.service';
import { UserService } from './core/services/user.service';
import { CategoryService } from './core/services/category.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountModule } from './account/account.module';
import { ClassifiedModule } from './classifieds/classifieds.module';


@NgModule({
  declarations: [
    AppComponent,
    AppSearchComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule,
    AccountModule,
    ClassifiedModule
  ],
  providers: [
    CategoryService,
    LocationService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
