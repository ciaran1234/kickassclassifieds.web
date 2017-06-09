import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { Classified } from '../models/classified.model';
import { ClassifiedService } from '../services/classified.service';

@Component({
    selector: 'classified-edit',
    templateUrl: '../views/edit-classified.component.html'
})

export class EditClassifiedComponent implements OnInit {
    classified: Classified;

    constructor(private classifiedService: ClassifiedService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apiConfiguration: ApiConfiguration) { }

    ngOnInit() {
        let id = this.activatedRoute.snapshot.params['id'];
        this.classifiedService.get(id)
            .then(classified => this.classified = classified)
            .catch(error => alert('error.....'));
    }

    onSave(result: any) {
        alert(JSON.stringify(result.classified));
    }
}
