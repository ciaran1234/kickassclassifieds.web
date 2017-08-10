import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Classified } from '../../classifieds/models/classified.model';
import { BaseComponent } from '../../core/components/base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'account-wishlist',
    templateUrl: './../views/my-wishlist.component.html'
})

export class MyWishList extends BaseComponent implements OnInit {
    user: User;
    subscription: Subscription;
    wishlist: Classified[];

    constructor(protected router: Router, private userService: UserService) {
        super(router);
     }

    ngOnInit() {
        this.subscription = this.userService
            .user.subscribe(user => this.user = user);

            this.userService.getWishlist()
                .then(wishlist => this.wishlist = wishlist)
                .catch(error => this.handleError(error));
    }
}