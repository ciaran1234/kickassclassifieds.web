import { UserService } from '../../core/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'confirm-account',
    templateUrl: './../views/confirmAccount.component.html'
})

export class ConfirmAccountComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

    success: Boolean = false;
    error: Boolean = false;

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            var token = params['token'];
            var userId = params['uid'];

            this.userService.confirmAccount(token, userId)
                .then(res => this.success = true)
                .catch(err => this.error = true);
        });
    }
}