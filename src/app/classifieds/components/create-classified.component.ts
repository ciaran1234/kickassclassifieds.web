import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { Classified } from '../models/classified.model';
import { ClassifiedService } from '../services/classified.service';

@Component({
    selector: 'classified-create',
    templateUrl: '../views/create-classified.component.html'
})

export class CreateClassifiedComponent {
    classified: Classified = new Classified();

    constructor(private classifiedService: ClassifiedService,
        private router: Router,
        private apiConfiguration: ApiConfiguration) { }

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
            .catch(error => alert(error));
    }
}
