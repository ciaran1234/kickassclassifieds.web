import { Component, OnInit } from '@angular/core';
import { Classified } from '../models/classified';
import { ClassifiedService } from '../services/classifieds.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-classified-list',
  templateUrl: '../views/classified-list.component.html'
})

export class ClassifiedListComponent implements OnInit {

  classifieds: Observable<Classified[]>;

  constructor(private classifiedService: ClassifiedService) { }

  ngOnInit() {
    //this.classifieds = this.classifiedService.getAll();
  }
}
