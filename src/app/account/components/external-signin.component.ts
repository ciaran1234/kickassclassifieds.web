import { UserService } from '../../core/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'account-external-signin',
    templateUrl: './../views/external-signin.component.html'
})

export class ExternalSigninComponent implements OnInit {
    errorMessage: String;

    constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            var provider = params['provider'];
            var accessToken = params['access_token'];

            if (provider && accessToken) {
                this.userService.exchangeExternalToken(provider, accessToken)
                    .then(response => this.router.navigateByUrl('/home'))
                    .catch(err => this.errorMessage = 'Something went wrong. Please try again');  //some generic 'something went wrong response''
            }
            else {                
                var errorCode = params['error'];
                var email = params['email'];

                if (errorCode.length) {
                    this.errorMessage = errorCode; //need client side translation for this code into something meaningful
                }                    
                else {
                    this.errorMessage = 'Something went wrong. Please try again'; //some generic 'something went wrong response''
                }
            }
        });
    }
}