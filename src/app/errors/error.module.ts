import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core'

 export class AppErrorHandler implements ErrorHandler {
    handleError(error: any) {
        throw error;
    }
}

@NgModule({
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }]
})

export class ErrorModule {
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: ErrorModule,
    //         providers: [{ provide: ErrorHandler, useClass: AppErrorHandler },
    //             ServerErrorService]
    //     }
    // }
}