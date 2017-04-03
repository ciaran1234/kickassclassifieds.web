import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { User } from './account/models/user';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  user: User;
  subscription: Subscription;
  isNavbarCollapsed: Boolean = false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {   
    this.subscription = this.userService
      .user.subscribe(user => this.user = user);

    this.userService.checkIfUserLoggedIn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSignout() {
    this.userService.signout();
    this.router.navigateByUrl('/home')
  }
}
