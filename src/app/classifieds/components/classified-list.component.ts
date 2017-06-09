import { Component, OnInit } from '@angular/core';
import { Classified } from '../models/classified.model';
import { Country } from '../../core/models/country.model';
import { Category } from '../../core/models/category.model';
import { Currency } from '../../core/models/currency.model';
import { ClassifiedService } from '../services/classified.service';
import { CountryService } from '../../core/services/country.service';
import { CategoryService } from '../../core/services/category.service';
import { CurrencyService } from '../../core/services/currency.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../core/services/filter.service';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { ClassifiedFilter } from '../../core/models/filters/classified.filter';

@Component({
  selector: 'classified-list',
  templateUrl: '../views/classified-list.component.html'
})

export class ClassifiedListComponent implements OnInit {

  classifieds: Observable<Classified[]>;
  countries: Country[];
  categories: Category[];
  currencies: Currency[];
  searchForm: FormGroup;

  constructor(private classifiedService: ClassifiedService,
    private categoryService: CategoryService,
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private filterService: FilterService<ClassifiedFilter, Classified[]>,
    private apiConfiguration: ApiConfiguration,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.filterService.init();

    this.searchForm = this.fb.group({
      q: [this.filterService.filter.q],
      category: [this.filterService.filter.category || ''],
      country: [this.filterService.filter.country || ''],
      currency: [this.filterService.filter.currency || '840'],
      minPrice: [this.filterService.filter.minPrice],
      maxPrice: [this.filterService.filter.maxPrice],
      advertType: [this.filterService.filter.advertType || 'sell'],
    });

    this.categoryService.getAllGrouped().then(categories => this.categories = categories);
    this.countryService.getAll().then(countries => this.countries = countries);
    this.currencyService.getAll().then(currencies => this.currencies = currencies);

    this.classifieds = this.searchForm.valueChanges
      .debounceTime(500).distinctUntilChanged().startWith(null)
      .switchMap((filter: ClassifiedFilter) => {
        return this.filterService.query(filter, this.apiConfiguration.classifieds);
      }).publish().refCount();
  }

  clearSearch() {
    this.searchForm.reset({
      category: '',
      country: '',
      currency: '840',
      advertType: 'sell'
    });
  }
}
