import { Component, OnInit } from '@angular/core';
import { Classified } from '../../classifieds/models/classified.model';
import { Category } from '../../core/models/category.model';
import { Country } from '../../core/models/country.model';
import { ClassifiedService } from '../../classifieds/services/classified.service';
import { CountryService } from '../../core/services/country.service';
import { CategoryService } from '../../core/services/category.service';
import { UserService } from '../../core/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../core/services/filter.service';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { ClassifiedFilter } from '../../core/models/filters/classified.filter';
import * as clean from 'lodash-clean';

@Component({
    selector: 'inner-banner',
    templateUrl: '../views/inner-banner.component.html'
})

export class InnerBannerComponent implements OnInit {
    classifieds: Classified[];
    countries: Country[];
    categories: Category[];
    searchForm: FormGroup;

    constructor(private classifiedService: ClassifiedService,
        private categoryService: CategoryService,
        private countryService: CountryService,
        private userService: UserService,
        private filterService: FilterService<ClassifiedFilter, Classified[]>,
        private apiConfiguration: ApiConfiguration,
        private fb: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.filterService.init();

        this.searchForm = this.fb.group({
            q: [''],
            category: [''],
            country: [''],
        });

        this.categoryService.getAllGrouped().then(categories => this.categories = categories);

        this.countryService.getAll().then(countries => this.countries = countries);

        this.classifiedService.getAll().toPromise()
            .then(classifieds => this.classifieds = classifieds)
            .catch(error => alert(error));
    }

    onSearch({ value, valid }: { value: any, valid: boolean }) {
        this.router.navigate(['/classifieds'], { queryParams: clean(value) });
    }
}