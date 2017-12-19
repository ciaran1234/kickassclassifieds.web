import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { FormComponent } from '../../core/components/form.component';


@Component({
    selector: 'app-privacy-settings',
    templateUrl: '../views/my-privacy-settings.component.html'
})

export class MyPrivacySettingsComponent extends FormComponent {

    constructor(protected router: Router) {
        super(router);
    }
     
}
