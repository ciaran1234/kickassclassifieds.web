import { Component, OnInit } from '@angular/core';
import { Classified } from '../../classifieds/models/classified';
import { Category } from '../../core/models/category';
import { Country } from '../../core/models/country';
import { ClassifiedService } from '../../classifieds/services/classifieds.service';
import { CountryService } from '../../core/services/country.service';
import { CategoryService } from '../../core/services/category.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './../views/home.component.html',
})

export class HomeComponent implements OnInit {
    title: string = '';
    category: object = {};
    searchTermStream = new Subject<string>();
    classifieds: Observable<Classified[]>;
    countries: Country[];
    categories: Category[];
    searchForm: FormGroup;

    constructor(private classifiedService: ClassifiedService,
        private categoryService: CategoryService,
        private countryService: CountryService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            q: [''],
            category: [''],
            country: ['']
        });


        // this.router.navigate([], {
        //     queryParams: { q: 'query_here' },
        //     relativeTo: this.route
        // });

        this.categoryService.getAllGrouped().then(categories => this.categories = categories);
        this.countryService.getAll().then(countries => this.countries = countries);

        this.classifieds = this.searchForm.valueChanges
            .debounceTime(500).distinctUntilChanged().startWith(null)
            .switchMap((filter: any) => this.classifiedService.getAll(this.router, this.route, filter));
    }
}
