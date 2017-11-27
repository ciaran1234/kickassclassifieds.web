import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { UserService } from './core/services/user.service';
import { CategoryService } from './core/services/category.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountModule } from './account/account.module';
import { ClassifiedModule } from './classifieds/classifieds.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorRoutingModule, errorRoutedComponents } from './errors/error-routing.module';
import { OwlModule } from 'ng2-owl-carousel';

@NgModule({
  declarations: [
    AppComponent,    
    routingComponents,
    errorRoutedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule.forRoot(),  
    NgbModule.forRoot(),
    AppRoutingModule,
    AccountModule,
    ClassifiedModule,
    ReactiveFormsModule,
    ErrorRoutingModule,
    OwlModule,
    LayoutModule
  ],  
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
