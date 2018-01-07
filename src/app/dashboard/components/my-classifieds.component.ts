import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { Classified } from 'app/core/models/classified.model';
import { User } from 'app/core/models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagedList } from 'app/core/models/paged-list';
import { FilterService } from 'app/core/services/filter.service';
import { ClassifiedFilter } from 'app/core/models/filters/classified.filter';
import { ApiConfiguration } from 'app/core/services/api-configuration.service';
import { ClassifiedService } from 'app/core/services/classified.service';
import { BaseComponent } from 'app/core/components/base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'account-classifieds',
    templateUrl: './../views/my-classifieds.component.html'
})

export class MyClassifiedsComponent extends BaseComponent implements OnInit {
    classifieds: PagedList<Classified>;
    user: User;
    p: number = 1;
    total: number;
    loading: boolean;
    form: FormGroup;

    constructor(
        protected router: Router,
        private apiConfiguration: ApiConfiguration,
        private userService: UserService,
        private fb: FormBuilder,
        private classifiedService: ClassifiedService,
        private filterService: FilterService<ClassifiedFilter, PagedList<Classified>>) {
        super(router);
    }

    ngOnInit() {
        this.userService.user.subscribe(user => {
            this.user = user;
        });

        this.filterService.init();

        this.form = this.fb.group({
            q: [this.filterService.filter.q],
            top: [this.filterService.filter.top || 10],
            skip: [this.filterService.filter.skip || 0],
            sort: [this.filterService.filter.sort || 'created']
        });

        this.form.valueChanges
            .debounceTime(500).distinctUntilChanged().startWith(this.form.value as ClassifiedFilter)
            .switchMap((filter: ClassifiedFilter) => {
                this.p = this.form.get('skip').value + 1;
                return this.filterService.query(filter, this.apiConfiguration.myClassifieds);
            }).subscribe(result => { this.classifieds = result });
    }

    

    onPageChanged(page: number) {
        this.loading = true;
        this.form.get('skip').setValue(page - 1);
    }

    onRemoveClassified(id: String) {
        this.classifiedService.delete(id)
            .then(() => {
                this.form.updateValueAndValidity();
            })
            .catch(error => this.handleError(error));
    }
}