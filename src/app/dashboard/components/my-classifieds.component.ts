import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Classified } from 'app/core/models/classified.model';
import { User } from 'app/core/models/user.model';

@Component({
    selector: 'account-classifieds',
    templateUrl: './../views/my-classifieds.component.html'
})

export class MyClassifiedsComponent implements OnInit {
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