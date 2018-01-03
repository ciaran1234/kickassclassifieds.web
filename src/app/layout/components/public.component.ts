import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { User } from "app/core/models/user.model";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-public',
    templateUrl: '../views/public.component.html',
})

export class PublicComponent implements OnInit {
    newsletterForm: FormGroup;
    userDropDownIsOpen: boolean = false;
    isCollapsed: boolean = true;
    user: User;
    subscription: Subscription;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.newsletterForm = this.fb.group({});

        this.subscription = this.userService
            .user.subscribe((user: User) => {
                if(!user){
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
}