import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { CurrencyService } from '../../core/services/currency.service';
import { CountryService } from '../../core/services/country.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { Currency } from '../../core/models/currency.model';
import { Country } from '../../core/models/country.model';
import { Region } from '../../core/models/region.model';
import { Image } from '../../core/models/image.model';
import { CustomFileUploader } from '../../core/services/custom-file-uploader.service';
import { HttpClient } from '../../core/services/http-client.service';
import { DynamicFormService } from "../../dynamic-forms/services/dynamic-form.service";
import { DynamicFormControlModel } from "../../dynamic-forms/models/dynamic-form-control.model";
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { FileItem, FileLikeObject } from 'ng2-file-upload';
import { FormComponent } from '../../core/components/form.component';
import { Router } from '@angular/router';
import { Classified } from 'app/core/models/classified.model';
import { User } from 'app/core/models/user.model';
import { UserService } from 'app/core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { CustomValidator } from 'app/core/validation/custom-validation.validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
    selector: 'classified-form',
    templateUrl: '../views/classified-form.component.html'
})

export class ClassifiedFormComponent extends FormComponent implements OnInit {
    @Input() classified: Classified;
    @Input() validationErrors: string[];
    @Output() onSave = new EventEmitter();

    form: FormGroup;
    detailsFormGroup: FormGroup;
    submitted: boolean = false;
    categories: Category[];
    subCategories: Category[];
    countries: Country[];
    regions: Region[];
    states: String[];
    imagesToDelete: Image[] = [];
    formModel: DynamicFormControlModel[] = [];
    uploader: CustomFileUploader = new CustomFileUploader({});
    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;
    subscription: Subscription;
    user: User;
    modalRef: any;

    constructor(private fb: FormBuilder,
        private categoryService: CategoryService,
        private countryService: CountryService,
        private currencyService: CurrencyService,
        private formService: DynamicFormService,
        private modalService: NgbModal,
        protected router: Router,
        private userService: UserService) {
        super(router);
    }

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
            advertiser: this.fb.group({
                userType: ['same'],
                firstName: [{
                    value: this.classified.advertiser ? this.classified.advertiser.firstName : '',
                }, [Validators.required, Validators.maxLength(40)]],
                lastName: [{
                    value: this.classified.advertiser ? this.classified.advertiser.lastName : '',
                }, [Validators.required, Validators.maxLength(40)]],
                email: [{
                    value: this.classified.advertiser ? this.classified.advertiser.email : '',
                }, [Validators.required, Validators.minLength(6), Validators.maxLength(256), CustomValidator.validEmail()]],
                phoneNumber: [{ value: this.classified.advertiser ? this.classified.advertiser.phoneNumber : '' },
                [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
                ]
            }),
            price: this.fb.group({
                value: [this.classified.price ? this.classified.price.value.$numberDecimal : ''],
                ccy: [this.classified.price ? this.classified.price.ccy : ''],
                ccyNbr: [this.classified.price ? this.classified.price.ccyNbr : ''],
            }),
            hidePrice: [this.classified.hidePrice],
            allowMessages: [this.classified.allowMessages == null ? true : this.classified.allowMessages],
            country: [this.classified.country, [Validators.required]],
            region: [this.classified.region, [Validators.required]],
            state: [this.classified.state || '']
        });

        this.subscription = this.userService
            .user.subscribe((user: User) => {
                if (!user) {
                    this.userService.checkIfUserLoggedIn();
                }

                this.user = user;

                if (this.form.get('advertiser').get('userType').value === 'same' && user) {
                    this.form.get('advertiser').get('firstName').setValue(user.firstName);
                    this.form.get('advertiser').get('lastName').setValue(user.lastName);
                    this.form.get('advertiser').get('email').setValue(user.email);
                    this.form.get('advertiser').get('phoneNumber').setValue(user.phoneNumber);
                }
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

                this.form.get('parentCategory').setValue(selectedParentCategory);

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
                        .setValue(this.classified.state || this.states[0]);
                })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onCategoryChanged(category: Category) {
        let id = category._id;
        this.form.get('parentCategory').setValue(category);

        this.categoryService.getSubCategories(id)
            .then(subCategories => {
                this.subCategories = subCategories;
                this.form.get('category').setValue(subCategories.length > 0 ? subCategories[0] : '');
                this.setDynamicForm();
            });
    }

    onSubCategoryChanged(subCategory: Category) {
        this.form.get('category').setValue(subCategory);
        this.setDynamicForm();
        this.modalRef.close();
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
        this.form.get('state').setValue(this.states.length ? this.states[0] : '');
    }

    onUserTypeChanged(userType: string) {
        if (userType === 'different') {
            this.form.get('advertiser').get('firstName').setValue('');
            this.form.get('advertiser').get('lastName').setValue('');
            this.form.get('advertiser').get('email').setValue('');
            this.form.get('advertiser').get('phoneNumber').setValue('');
        }
        else {
            this.form.get('advertiser').get('firstName').setValue(this.user.firstName);
            this.form.get('advertiser').get('lastName').setValue(this.user.lastName);
            this.form.get('advertiser').get('email').setValue(this.user.email);
            this.form.get('advertiser').get('phoneNumber').setValue(this.user.phoneNumber);
        }
    }

    removeImage(image: Image) {
        this.imagesToDelete.push(image);
        _.remove(this.classified.images, function (i) {
            return i === image;
        });
    }

    setDynamicForm(data?: any): void {
        this.formService.resetFormGroup(this.detailsFormGroup, this.formModel,
            this.form.get('category') && this.form.get('category').value ? this.form.get('category').value.details : {}, data);
    }

    open(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg', windowClass: 'tg-thememodal tg-categorymodal' });
    }

    onSubmitted({ value, valid }: { value: any, valid: boolean }) {
        this.markFormAsSubmitted(this.form);

        if (valid === true) {            
            this.onSave.emit({
                classified: value as Classified,
                uploader: this.uploader,
                imagesToDelete: this.imagesToDelete
            });
        }
    }
}
