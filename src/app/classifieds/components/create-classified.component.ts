import { Component, OnInit } from '@angular/core';
import { Classified } from '../models/classified';
import { ClassifiedService } from '../services/classifieds.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-classified-create',
    templateUrl: '../views/create-classified.component.html'
})

export class CreateClassifiedComponent implements OnInit {
    classified: FormGroup;
    submitted: boolean = false;

    constructor(private fb: FormBuilder, private classifiedService: ClassifiedService, private router: Router) { }

    ngOnInit() {
        this.classified = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]]
        });
    }

    onSave({ value, valid }: { value: Classified, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            this.classifiedService.create(value)
            .then(classified => {
                this.router.navigate(['/classifieds/details', classified._id]);
            })
            .catch(error => alert(JSON.stringify(error)));
        }
    }
}
