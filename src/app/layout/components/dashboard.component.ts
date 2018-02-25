import { Component, OnInit } from "@angular/core";
import { User } from "app/core/models/user.model";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/core/services/user.service';
import { Router } from '@angular/router';

// import * as $ from 'jquery';

@Component({
    selector: 'app-dashboard',
    templateUrl: '../views/dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    user: User;
    subscription: Subscription;
    isCollapsed: boolean = true;
    isSidebarCollapsed: boolean = false;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
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
        this.router.navigateByUrl('/');
    }

    onSideMenuToggled() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        this.isCollapsed = true;
    }

    onTopMenuToggled() {
        this.isCollapsed = !this.isCollapsed;

        if (this.isCollapsed === false) {
            this.isSidebarCollapsed = false;
        }
    }

    onToggleSideMenuItem(event: Event) {
        let listItem;

        if (event.srcElement.tagName === 'LI') {
            listItem = event.srcElement;
        }
        else if (event.srcElement.parentElement.tagName === 'LI') {
            listItem = event.srcElement.parentElement;
        }
        else if (event.srcElement.parentElement.parentElement.tagName === 'LI') {
            listItem = event.srcElement.parentElement.parentElement;
        }

        if (!listItem) return false;

        let elementClass = listItem.getAttribute('class') || '';

        if (elementClass.indexOf('menu-item-has-children') != -1) {
            let isOpen = elementClass.indexOf('tg-open') != -1;

            if (isOpen) {
                listItem.setAttribute('class', 'menu-item-has-children')
            }
            else {
                listItem.setAttribute('class', 'tg-open menu-item-has-children');
            }

            for (let idx in listItem.children) {
                if (listItem.children[idx].tagName === 'UL') {
                    if (isOpen) {
                        listItem.children[idx].setAttribute('style', '');
                    }
                    else {
                        listItem.children[idx].setAttribute('style', 'display: block;');
                    }
                    break;
                }
            }
        }
    }  
}