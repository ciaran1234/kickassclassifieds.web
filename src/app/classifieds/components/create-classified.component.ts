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

@Component({
    selector: 'app-classified-create',
    templateUrl: '../views/create-classified.component.html'
})

export class CreateClassifiedComponent implements OnInit {
    classified: FormGroup;
    submitted: boolean = false;    
    categories: Category[];
    subCategories: Category[];
    currencies: Currency[];
    countries: Country[];
    regions: Region[];
    states: State[];   

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
                currency: { value: '', disabled: true }
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
            this.currencyService.getAll().then(currencies => {
                this.currencies = currencies;
                this.countryService.getAll()
                    .then(countries => {
                        this.countries = countries;
                        this.classified.get('country').setValue(countries.length ? countries[0] : {});
                        this.onCountryChanged();
                    })
            })
        );
    }

    onSave({ value, valid }: { value: any, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            value.states = value.state && value.state.constructor === Array ? _.map(value.state, 'name') : [];
            value.price = value.price && value.price.value ? {
                value: value.price.value.toString(),
                ccy: this.classified.get('price.currency').value.ccy,
                ccyNbr: this.classified.get('price.currency').value.ccyNbr
            } : undefined;

            this.classifiedService.create(value)
                .then(classified => {
                    this.router.navigate(['/classifieds/details', classified._id]);
                })
                .catch(error => alert(JSON.stringify(error)));
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
        let countryCode = this.classified.get('country').value.countryCode;

        if (countryCode) {
            let currency = _.find(this.currencies, { 'ccyNbr': countryCode });
            this.classified.get('price.currency').setValue(currency);
        }

        let regions = this.classified.get('country').value.regions;
        this.regions = regions;
        this.classified.get('region').setValue(regions[0]);
        this.onRegionChanged()
    }

    onRegionChanged() {
        this.states = this.classified.get('region').value.states;
        this.classified.get('state').setValue(this.states.length ? this.states[0] : {});
    }
}
