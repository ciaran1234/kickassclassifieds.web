import { Component, OnInit, Input } from '@angular/core';
import { Classified } from '../models/classified.model';

@Component({
    selector: 'classified-dynamic-details',
    templateUrl: '../views/classified-dynamic-details.html'
})

export class ClassifiedDynamicDetailsComponent {
    @Input() data: any
    details: any[] = [];

    constructor() { }

    ngOnChanges() {
        if (this.data) {
            for (let property in this.data) {

                if (typeof (this.data[property]) === 'object') {
                    let value = '';

                    for(let subProperty in this.data[property]){
                        value += this.data[property][subProperty] + ' ';
                    }

                    this.details.push({ key: property, value: value });
                }
                else {
                    this.details.push({ key: property, value: this.data[property] });
                }
            }
        }
    }
}
