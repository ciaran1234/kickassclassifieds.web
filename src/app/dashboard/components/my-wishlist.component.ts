import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../core/components/base.component';
import { Router } from '@angular/router';
import { User } from 'app/core/models/user.model';
import { Classified } from 'app/core/models/classified.model';

@Component({
    selector: 'account-wishlist',
    templateUrl: './../views/my-wishlist.component.html'
})

export class MyWishListComponent extends BaseComponent implements OnInit {
    user: User;
    subscription: Subscription;
    wishlist: Classified[];

    constructor(protected router: Router, private userService: UserService) {
        super(router);
    }

    ngOnInit() {
        this.subscription = this.userService
            .user.subscribe(user => this.user = user);

        this.getWishlist();
    }

    onRemoveFromWishlist(classified: Classified) {
        this.userService.removeFromWishlist(classified._id)
            .then(user => { this.getWishlist(); })
            .catch(error => alert(error));
    }


    getWishlist() {
        this.userService.getWishlist()
            .then(wishlist => this.wishlist = wishlist)
            .catch(error => this.handleError(error));
    }
}