import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiConfiguration } from './services/api-configuration.service';
import { HttpClient } from './services/http-client.service';
import { UserService } from './services/user.service';
import { CurrencyService } from './services/currency.service';
import { CountryService } from './services/country.service';
import { FilterService } from './services/filter.service';
import { MessageService } from './services/message.service';
import { ClassifiedService } from './services/classified.service';
import { AuthorizationValidator } from 'app/core/validation/authorization.validator';

@NgModule({})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,    
      providers: [        
        AuthorizationValidator,
        ApiConfiguration,
        HttpClient,
        UserService,
        FilterService,        
        ClassifiedService,
        CurrencyService,
        CountryService,
        MessageService
      ]
    };
  }
}
