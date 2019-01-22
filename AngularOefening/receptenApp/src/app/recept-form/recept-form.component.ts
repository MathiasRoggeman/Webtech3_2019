import { Component, OnInit } from '@angular/core';
import { Recept } from '../recept';

@Component({
  selector: 'recept-form',
  templateUrl: './recept-form.component.html',
  styleUrls: ['./recept-form.component.css']
})
export class ReceptFormComponent implements OnInit {
 model = new Recept('','','','')
  constructor() { }

  ngOnInit() {
  }
  get currentRecept() { return JSON.stringify(this.model); }
}
