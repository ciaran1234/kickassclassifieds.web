import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DetailsBase } from '../models/details/details-base';
import { ClassifiedDetailService } from '../services/classified-detail.service';
import { OptionDetails } from '../models/details/option-details';
import { TextDetails } from '../models/details/text-details';
import { ComplexDetails } from '../models/details/complex-details';
import { CategoryService } from '../../core/services/category.service';
import _ from 'lodash';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import {DynamicFormControlFactory} from '../../dynamicForms/models/dynamic-form-control-factory';

@Component({
    selector: 'dynamic-form',
    templateUrl: '../views/classified-dynamic.component.html',
    providers: [ClassifiedDetailService]
})

export class ClassifiedDynamicComponent implements OnInit {
    form: FormGroup;
    payLoad = '';
    questions: DetailsBase<any>[] = [];
    category: any;

    constructor(private detailsService: ClassifiedDetailService,
        private categoryService: CategoryService, private fb: FormBuilder) { }

    detailFactory(key: string, property: any): any {

        let discriminator = property.data !== undefined ? 'option' : typeof property.type === 'object' ? 'object' : property.type;

        switch (discriminator) {
            case 'String':
                return new TextDetails({
                    key: key,
                    label: key,
                    value: '',
                    required: true,
                    order: 1,
                    type: 'textbox'
                });
            case 'Number':
                return new TextDetails({
                    key: key,
                    label: key,
                    value: '',
                    required: true,
                    order: 1,
                    type: 'number'                  
                });
            case 'object':
                var subProperties = [];

                for (let subProperty in property.type) {
                    subProperties.push(this.detailFactory(subProperty, property.type[subProperty]));
                }

                return new ComplexDetails(subProperties, {
                    key: key,
                    label: key,
                    order: 1                    
                });            
            case 'option':
                return new OptionDetails({
                    key: key,
                    label: key,
                    options: _.map(property.data, function (value) { return { key: value, value: value } }),
                    order: 3
                });
            default:
                return null;
        }
    }

    getDynamicForm(): Promise<FormGroup> {
        return this.categoryService.getSubCategories('58f21b51b8dfe462d80db492')
            .then(categories => {

                this.category = _.find(categories, { 'name': 'Cars' });

                for (let property in this.category.details) {                 

                    var formControl = this.detailFactory(property, this.category.details[property]);

                    if (formControl) {
                        this.questions.push(formControl);
                    }
                }
                return this.detailsService.toFormGroup(this.questions);
            });
    }

    ngOnInit() {
        this.form = this.detailsService.toFormGroup([]);

        this.getDynamicForm().then(form => {       
            this.form = form;
        });     
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }
}
