import { Component, OnInit, Input } from '@angular/core';
import { Classified } from '../models/classified';

@Component({
    selector: 'classified-details',
    templateUrl: '../views/classified-details.component.html'
})

export class ClassifiedDetailsComponent {
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
