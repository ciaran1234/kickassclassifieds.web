import { Component, OnInit } from "@angular/core";
import { User } from "app/core/models/user.model";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/core/services/user.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'app-dashboard',
    templateUrl: '../views/dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    user: User;
    subscription: Subscription;
    isCollapsed: boolean = false;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.collapseMenu();

        this.subscription = this.userService
            .user.subscribe((user: User) => {
                if (!user) {
                    this.userService.checkIfUserLoggedIn();
                }

                this.user = user;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSignout() {
        this.userService.signout();
        this.router.navigateByUrl('/')
    }

    collapseMenu() {      
        $('.tg-navigation ul li.menu-item-has-children, .tg-navdashboard ul li.menu-item-has-children, .tg-navigation ul li.menu-item-has-mega-menu').on('click', function () {
            $(this).toggleClass('tg-open');
            $(this).children('span').next().next().slideToggle(150);
        });
    }
}