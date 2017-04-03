import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppSearchComponent } from './layout/components/app-search.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LocationService } from './core/services/location.service';
import { UserService } from './core/services/user.service';
import { HomeComponent } from './layout/components/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AppSearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    LocationService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
