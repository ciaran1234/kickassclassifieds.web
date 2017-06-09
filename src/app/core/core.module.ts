import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiConfiguration } from './services/api-configuration.service';
import { HttpClient } from './services/http-client.service';
import { UserService } from './services/user.service';
import { CurrencyService } from './services/currency.service';
import { CountryService } from './services/country.service';
import { FilterService } from './services/filter.service';

@NgModule({

})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ApiConfiguration,
        HttpClient,       
        UserService,
        FilterService,
        CurrencyService,
        CountryService
      ]
    };
  }
}
