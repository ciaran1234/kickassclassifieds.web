import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../core/components/base.component';
import { Router } from '@angular/router';
import { User } from 'app/core/models/user.model';
import { Classified } from 'app/core/models/classified.model';
import { PagedList } from 'app/core/models/paged-list';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiConfiguration } from 'app/core/services/api-configuration.service';
import { FilterService } from 'app/core/services/filter.service';
import { ClassifiedFilter } from 'app/core/models/filters/classified.filter';

@Component({
    selector: 'account-wishlist',
    templateUrl: './../views/my-wishlist.component.html'
})

export class MyWishListComponent extends BaseComponent implements OnInit {
    user: User;
    subscription: Subscription;
    wishlist: PagedList<Classified>;
    p: number = 1;
    total: number;
    loading: boolean;
    form: FormGroup;

    constructor(protected router: Router,
        private userService: UserService,
        private apiConfiguration: ApiConfiguration,
        private fb: FormBuilder,
        private filterService: FilterService<ClassifiedFilter, PagedList<Classified>>) {
        super(router);
    }

    ngOnInit() {
        this.subscription = this.userService
            .user.subscribe(user => this.user = user);

        this.filterService.init();

        this.form = this.fb.group({
            q: [this.filterService.filter.q],
            top: [this.filterService.filter.top || 10],
            skip: [this.filterService.filter.skip || 0],
            sort: [this.filterService.filter.sort || 'created']
        });

        this.form.valueChanges
        .debounceTime(100).distinctUntilChanged().startWith(this.form.value as ClassifiedFilter)
        .switchMap((filter: ClassifiedFilter) => {      
          this.p = this.form.get('skip').value + 1;
          return this.filterService.query(filter, this.apiConfiguration.userWishlist);
        }).subscribe(result => { this.wishlist = result });      
    }

    getPage(page: number) {
        this.loading = true;
        this.form.get('skip').setValue(page - 1);
    }

    onRemoveFromWishlist(classified: Classified) {       
        this.userService.removeFromWishlist(classified._id)
            .then(user => {  this.form.updateValueAndValidity(); })
            .catch(error => alert(error));
    }
}