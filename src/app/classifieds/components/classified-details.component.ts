import { Component, OnInit } from '@angular/core';
import { Classified } from '../models/classified.model';
import { ClassifiedService } from '../services/classified.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'classified-details',
    templateUrl: '../views/classified-details.component.html'    
})

export class ClassifiedDetailsComponent implements OnInit {
    id: string;
    classified: Classified;

    constructor(private classifiedService: ClassifiedService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getClassifiedDetails();
        });
    }

    private getClassifiedDetails() {
        return this.classifiedService.get(this.id)
            .then(classified => this.classified = classified)
            .catch(error => alert('error.....'));
    }
}
