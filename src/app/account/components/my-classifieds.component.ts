import { Component, OnInit } from '@angular/core';
import { Classified } from '../../classifieds/models/classified.model';
import { UserService } from '../../core/services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'account-classifieds',
    templateUrl: './../views/my-classifieds.component.html'
})

export class MyClassifieds implements OnInit {
    classifieds: Classified[];
    user: User;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.user.subscribe(user => {
            this.user = user;
        });

        this.userService.myClassifieds()
            .then(classifieds => this.classifieds = classifieds)
            .catch(error => alert(error));
    }
}