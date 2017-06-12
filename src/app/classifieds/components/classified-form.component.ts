import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { CurrencyService } from '../../core/services/currency.service';
import { CountryService } from '../../core/services/country.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { Classified } from '../models/classified.model';
import { Currency } from '../../core/models/currency.model';
import { Country } from '../../core/models/country.model';
import { Region } from '../../core/models/region.model';
import { State } from '../../core/models/state.model';
import { Image } from '../../core/models/image.model';
import { CustomFileUploader } from '../../core/services/custom-file-uploader.service';
import { HttpClient } from '../../core/services/http-client.service';
import { DynamicFormService } from "../../dynamic-forms/services/dynamic-form.service";
import { DynamicFormControlModel } from "../../dynamic-forms/models/dynamic-form-control.model";
import { Observable } from 'rxjs/Rx';
import _ from 'lodash';
import { FileItem, FileLikeObject } from 'ng2-file-upload';

@Component({
    selector: 'classified-form',
    templateUrl: '../views/classified-form.component.html'
})

export class ClassifiedFormComponent implements OnInit {
    @Input() classified: Classified;
    @Output() onSave = new EventEmitter();

    form: FormGroup;
    detailsFormGroup: FormGroup;
    submitted: boolean = false;
    categories: Category[];
    subCategories: Category[];
    countries: Country[];
    regions: Region[];
    states: State[];
    imagesToDelete: Image[] = [];
    formModel: DynamicFormControlModel[] = [];
    uploader: CustomFileUploader = new CustomFileUploader({});
    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;

    constructor(private fb: FormBuilder,
        private categoryService: CategoryService,
        private countryService: CountryService,
        private currencyService: CurrencyService,
        private formService: DynamicFormService) { }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    ngOnInit() {
        this.detailsFormGroup = this.formService.createFormGroup(this.formModel);
        this.form = this.fb.group({
            title: [this.classified.title, [Validators.required, Validators.maxLength(100)]],
            description: [this.classified.description, [Validators.required, Validators.maxLength(2000)]],
            parentCategory: [{}, [Validators.required]],
            category: [this.classified.category, [Validators.required]],
            advertType: [this.classified.advertType || 'sell'],
            details: this.detailsFormGroup,
            price: this.fb.group({
                value: [this.classified.price ? this.classified.price.value.$numberDecimal : ''],
                ccy: [this.classified.price ? this.classified.price.ccy : ''],
                ccyNbr: [this.classified.price ? this.classified.price.ccyNbr : ''],
            }),
            country: [this.classified.country, [Validators.required]],
            region: [this.classified.region, [Validators.required]],
            state: [this.classified.states || []]
        });

        Observable.forkJoin( //need to refactor this into single service as the first http request is blocking the others
            this.categoryService.getParents().then(categories => {
                this.categories = categories;
                var selectedParentCategory = this.categories[0];

                if (this.classified.category) {
                    for (let i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].children && this.categories[i].children.indexOf(this.classified.category._id) > -1) {
                            selectedParentCategory = this.categories[i];
                            break;
                        }
                    }
                }

                this.form.get('parentCategory').setValue(selectedParentCategory._id);

                this.categoryService.getSubCategories(selectedParentCategory._id)
                    .then(subCategories => {
                        this.subCategories = subCategories;
                        var selectedCategory;

                        this.form.get('category').setValue(this.classified.category ?
                            _.find(this.subCategories, { _id: this.classified.category._id }) :
                            subCategories[0]);
                        this.setDynamicForm(this.classified.details);
                    });
            }),
            this.countryService.getAll()
                .then(countries => {
                    this.countries = countries;
                    var selectedCountry;
                    var selectedRegion;

                    if (this.classified.country) {
                        selectedCountry = _.find(countries, { code: this.classified.country.code });
                    }
                    else {
                        selectedCountry = countries.length ? countries[0] : {}
                    }

                    if (selectedCountry) {
                        this.form.get('price.ccy').setValue(selectedCountry.currency.ccy);
                        this.form.get('price.ccyNbr').setValue(selectedCountry.currency.ccyNbr);
                    }

                    this.form.get('country').setValue(selectedCountry);

                    this.regions = selectedCountry.regions;
                    selectedRegion = this.classified.region ?
                        _.find(this.regions, { name: this.classified.region.name })
                        : this.regions[0];


                    this.form.get('region').setValue(selectedRegion);

                    this.states = selectedRegion.states;

                    this.form.get('state')
                        .setValue(_.map(this.classified.states, function (v) {
                            return _.find(selectedRegion.states, { name: v });
                        }));
                })
        );
    }

    onCategoryChanged() {
        let id = this.form.get('parentCategory').value;

        this.categoryService.getSubCategories(id)
            .then(subCategories => {
                this.subCategories = subCategories;
                this.form.get('category').setValue(subCategories.length > 0 ? subCategories[0] : '');
                this.setDynamicForm();
            });
    }

    onSubCategoryChanged() {
        this.setDynamicForm();
    }

    onCountryChanged() {
        let country = this.form.get('country').value;

        if (country) {
            this.form.get('price.ccy').setValue(country.currency.ccy);
            this.form.get('price.ccyNbr').setValue(country.currency.ccyNbr);
        }

        this.regions = country.regions;
        this.form.get('region').setValue(this.regions[0]);
        this.onRegionChanged();
    }

    onRegionChanged() {
        this.states = this.form.get('region').value.states;
        this.form.get('state').setValue(this.states.length ? this.states[0] : {});
    }


    removeImage(image: Image) {
        this.imagesToDelete.push(image);
        _.remove(this.classified.images, function (i) {
            return i === image;
        });
    }

    setDynamicForm(data?: any): void {
        this.formService.resetFormGroup(this.detailsFormGroup, this.formModel,
            this.form.get('category').value.details, data);
    }

    markFormAsSubmitted(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).map((controlName) => {
            let control = formGroup.get(controlName);

            if (control instanceof FormGroup) {
                this.markFormAsSubmitted(control as FormGroup);
            }
            else {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }

    onSubmitted({ value, valid }: { value: any, valid: boolean }) {
        this.markFormAsSubmitted(this.form);

        if (valid === true) {
            value.states = value.state && value.state.constructor === Array ? _.map(value.state, 'name') : [];
            this.onSave.emit({
                classified: value as Classified,
                uploader: this.uploader,
                imagesToDelete: this.imagesToDelete
            });
        }
    }
}
