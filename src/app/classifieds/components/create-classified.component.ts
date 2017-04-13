import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/models/category';
import { Classified } from '../models/classified';
import { ClassifiedService } from '../services/classifieds.service';
import { CategoryService } from '../../core/services/category.service';
import { CurrencyService } from '../../core/services/currency.service';
import { CountryService } from '../../core/services/country.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Currency } from '../../core/models/currency';
import { Country } from '../../core/models/country';
import { Region } from '../../core/models/region';
import { State } from '../../core/models/state';
import { Observable } from 'rxjs/Rx';
import _ from 'lodash';
import { CustomFileUploader } from '../../core/extensions/customFileUploader';
import { HttpClient } from '../../core/extensions/httpClient';

@Component({
    selector: 'app-classified-create',
    templateUrl: '../views/create-classified.component.html'
})

export class CreateClassifiedComponent implements OnInit {
    classified: FormGroup;
    submitted: boolean = false;
    categories: Category[];
    subCategories: Category[];
    countries: Country[];
    regions: Region[];
    states: State[];

    uploader: CustomFileUploader = new CustomFileUploader({});
    private images: string[];

    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    constructor(private fb: FormBuilder,
        private classifiedService: ClassifiedService,
        private categoryService: CategoryService,
        private router: Router,
        private countryService: CountryService,
        private currencyService: CurrencyService) { }

    ngOnInit() {
        this.classified = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            parentCategory: [{}, [Validators.required]],
            category: ['', [Validators.required]],
            price: this.fb.group({
                value: [''],
                ccy: [''],
                ccyNbr: ['']
            }),
            country: [{}],
            region: [{}],
            state: [[]]
        });

        Observable.forkJoin( //need to refactor this into single service as the first http request is blocking the others
            this.categoryService.getParents().then(categories => {
                this.categories = categories;
                this.classified.get('parentCategory').setValue(categories.length ? categories[0]._id : '');

                this.categoryService.getSubCategories(this.categories[0]._id)
                    .then(subCategories => {
                        this.subCategories = subCategories;
                        this.classified.get('category').setValue(subCategories.length ? subCategories[0] : '');
                    });
            }),
            this.countryService.getAll()
                .then(countries => {
                    this.countries = countries;
                    this.classified.get('country').setValue(countries.length ? countries[0] : {});
                    this.onCountryChanged();
                })
        );
    }

    onSave({ value, valid }: { value: any, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            value.states = value.state && value.state.constructor === Array ? _.map(value.state, 'name') : [];

            this.classifiedService.create(value)
                .then(classified => {

                    if (this.uploader.queue.length) {
                        return this.uploader.uploadAllAsync({
                            fieldName: 'images',
                            url: 'http://localhost:3000/api/classifieds/' + classified._id + '/uploadImages'
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

    onCategoryChanged() {
        let id = this.classified.get('parentCategory').value;

        this.categoryService.getSubCategories(id)
            .then(subCategories => {
                this.subCategories = subCategories;
                this.classified.get('category').setValue(subCategories.length > 0 ? subCategories[0] : '');
            });
    }

    onCountryChanged() {
        let country = this.classified.get('country').value;

        if (country) {

            this.classified.get('price.ccy').setValue(country.currency.ccy);
            this.classified.get('price.ccyNbr').setValue(country.currency.ccyNbr);
        }

        let regions = country.regions;
        this.regions = regions;
        this.classified.get('region').setValue(regions[0]);
        this.onRegionChanged();
    }

    onRegionChanged() {
        this.states = this.classified.get('region').value.states;
        this.classified.get('state').setValue(this.states.length ? this.states[0] : {});
    }
}
