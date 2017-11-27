import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'footer-layout',
    templateUrl: '../views/footer-layout.component.html'
})

export class FooterLayoutComponent implements OnInit {
    form: FormGroup;


    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({});
    }
}