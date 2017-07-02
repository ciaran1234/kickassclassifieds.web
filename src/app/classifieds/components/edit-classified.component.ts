import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { Classified } from '../models/classified.model';
import { ClassifiedService } from '../services/classified.service';
import { FormComponent } from '../../core/components/form.component';

@Component({
    selector: 'classified-edit',
    templateUrl: '../views/edit-classified.component.html'
})

export class EditClassifiedComponent extends FormComponent implements OnInit {
    classified: Classified;

    constructor(private classifiedService: ClassifiedService,
        protected router: Router,
        private activatedRoute: ActivatedRoute,
        private apiConfiguration: ApiConfiguration) {
        super(router);
    }

    ngOnInit() {
        let id = this.activatedRoute.snapshot.params['id'];
        this.classifiedService.get(id)
            .then(classified => this.classified = classified)
            .catch(error => alert('error.....'));
    }

    onSave(result: any) {
        result.classified._id = this.classified._id;

        this.classifiedService.edit(result.classified)
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
                return this.classifiedService.deleteImages(this.classified._id, result.imagesToDelete)
            })
            .then(response => {
                this.router.navigate(['/classifieds/details', this.classified._id]);
            })
            .catch(error => this.handleError(error));
    }
}
