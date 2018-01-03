import { Component, OnInit } from '@angular/core';

import { Category } from '../../core/models/category.model';
import { Country } from '../../core/models/country.model';

import { CountryService } from '../../core/services/country.service';
import { CategoryService } from '../../core/services/category.service';
import { UserService } from '../../core/services/user.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../core/services/filter.service';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { ClassifiedFilter } from '../../core/models/filters/classified.filter';
import * as clean from 'lodash-clean';
import { Classified } from 'app/core/models/classified.model';
import { ClassifiedService } from 'app/core/services/classified.service';
import '../../../js/jquery.vide.min.js';
declare var vider: any;

@Component({
    selector: 'app-landing-page',
    templateUrl: '../views/landing-page.component.html',
})

export class LandingPageComponent implements OnInit {
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
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        if (vider) {
            vider.render();
        }
        
        this.filterService.init();

        this.searchForm = this.fb.group({
            q: [''],
            category: [''],
            country: [''],
        });

        this.categoryService.getAllGrouped().then(categories => this.categories = categories);

        this.countryService.getAll().then(countries => this.countries = countries);

        this.classifiedService.getAll(8, 0).toPromise()
            .then(result => this.classifieds = result.items)
            .catch(error => alert(error));
    }

    onSearch({ value, valid }: { value: any, valid: boolean }) {
        this.router.navigate(['/classifieds'], { queryParams: clean(value) });
    }

    onFavourite(event, classified) {
        event.stopPropagation();
        let favourite = !classified.favourite;

        if (favourite) {
            this.userService.addToWishlist(classified._id)
                .then(user => { classified.favourite = true; })
                .catch(error => alert(error));
        }
        else {
            this.userService.removeFromWishlist(classified._id)
                .then(user => { classified.favourite = false; })
                .catch(error => alert(error));
        }

        return false;
    }
}