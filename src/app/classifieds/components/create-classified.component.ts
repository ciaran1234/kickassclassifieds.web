import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { Classified } from '../models/classified.model';
import { ClassifiedService } from '../services/classified.service';
import { FormComponent } from '../../core/components/form.component';

@Component({
    selector: 'classified-create',
    templateUrl: '../views/create-classified.component.html'
})

export class CreateClassifiedComponent extends FormComponent {
    classified: Classified = new Classified();

    constructor(private classifiedService: ClassifiedService,
        protected router: Router,
        private apiConfiguration: ApiConfiguration) {
        super(router);
    }

    onSave(result: any) {
        this.classifiedService.create(result.classified)
            .then(classified => {

                if (result.uploader.queue.length) {
                    return result.uploader.uploadAllAsync({
                        fieldName: 'images',
                        url: this.apiConfiguration.classifiedImageUpload(classified._id)
                    })
                }

                return classified;
            })
            .then(response => {
                let classified = response as Classified;
                this.router.navigate(['/classifieds/details', classified._id]);
            })
            .catch(error => this.handleError(error));
    }
}
