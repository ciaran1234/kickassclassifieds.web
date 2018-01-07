import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../core/models/country.model';
import { Category } from '../../core/models/category.model';
import { Currency } from '../../core/models/currency.model';
import { CountryService } from '../../core/services/country.service';
import { CategoryService } from '../../core/services/category.service';
import { CurrencyService } from '../../core/services/currency.service';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../core/services/filter.service';
import { ApiConfiguration } from '../../core/services/api-configuration.service';
import { ClassifiedFilter } from '../../core/models/filters/classified.filter';
import { Classified } from 'app/core/models/classified.model';
import { ClassifiedService } from 'app/core/services/classified.service';
import { PagedList } from 'app/core/models/paged-list';

@Component({
  selector: 'classified-list',
  templateUrl: '../views/classified-list.component.html'
})

export class ClassifiedListComponent implements OnInit {
  p: number = 1;
  classifieds: PagedList<Classified>;
  total: number;
  loading: boolean;
  countries: Country[];
  categories: Category[];
  currencies: Currency[];
  searchForm: FormGroup;
  private isPaginating: boolean = false;

  constructor(private classifiedService: ClassifiedService,
    private categoryService: CategoryService,
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private filterService: FilterService<ClassifiedFilter, PagedList<Classified>>,
    private apiConfiguration: ApiConfiguration,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.filterService.init();

    this.searchForm = this.fb.group({
      q: [this.filterService.filter.q],
      top: [this.filterService.filter.top || 12],
      skip: [this.filterService.filter.skip || 0],
      category: [this.filterService.filter.category || ''],
      country: [this.filterService.filter.country || ''],
      currency: [this.filterService.filter.currency || '840'],
      minPrice: [this.filterService.filter.minPrice],
      maxPrice: [this.filterService.filter.maxPrice],
      advertType: [this.filterService.filter.advertType],
    });

    this.categoryService.getAllGrouped().then(categories => this.categories = categories);
    this.countryService.getAll().then(countries => this.countries = countries);
    this.currencyService.getAll().then(currencies => this.currencies = currencies);

    this.searchForm.valueChanges
      .debounceTime(300).distinctUntilChanged().startWith(this.searchForm.value as ClassifiedFilter)
      .switchMap((filter: ClassifiedFilter) => {      
        this.p = this.searchForm.get('skip').value + 1;
        return this.filterService.query(filter, this.apiConfiguration.classifieds);
      }).subscribe(result => { this.classifieds = result });
  }

  getPage(page: number) {
    this.loading = true; 
    this.searchForm.get('skip').setValue(page - 1);
  }

  onFavourite(event, classified) {
    event.stopPropagation();

    this.userService.addToWishlist(classified._id)
      .then(user => { classified.favourite = true; })
      .catch(error => alert(error));

    return false;
  }

  clearSearch() {
    this.searchForm.reset({
      category: '',
      country: '',
      currency: '840',
      advertType: ''
    });
  }
}
