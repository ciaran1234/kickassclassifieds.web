import { Component, LOCALE_ID, OnInit, Inject } from '@angular/core';
import { UserService } from './core/services/user.service';
import { User } from 'app/core/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import '../js/main.js';
declare var websiteTemplate: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
 

  languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' }
  ];

  constructor( @Inject(LOCALE_ID) protected localeId: string,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    $(function () {
      websiteTemplate.initializeTemplate();
    });

   
  }

 
}
