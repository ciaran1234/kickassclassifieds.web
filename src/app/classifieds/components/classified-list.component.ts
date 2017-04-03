import { Component, OnInit } from '@angular/core';
import { Classified } from '../models/classified';
import { ClassifiedService } from '../services/classifieds.service';

@Component({
  selector: 'app-classified-list',
  templateUrl: '../views/classified-list.component.html'
})

export class ClassifiedListComponent implements OnInit {

  classifieds: Classified[];

  constructor(private classifiedService: ClassifiedService) { }

  ngOnInit() {
    this.classifiedService.getAll()
      .then(classifieds => this.classifieds = classifieds)
      .catch(error => alert('error.....'));
  }
}
