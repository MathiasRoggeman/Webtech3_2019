import { Component, OnInit } from '@angular/core';
import { Recept } from '../recept';
import { LocalStorageService } from 'angular-2-local-storage';
import { ReceptenServiceService } from '../recepten-service.service';
import { moduleProvideDef } from '@angular/core/src/view';


@Component({
  selector: 'recept-form',
  templateUrl: './recept-form.component.html',
  styleUrls: ['./recept-form.component.css']
})
export class ReceptFormComponent implements OnInit {
 model = new Recept('','','','')
 recepten: Recept[] = [];


  constructor() { }

  ngOnInit() {
  }
// inladen met naam als key en het hele recept object als json waarde zodat deze er kan uitgehaald worden
  OnSubmit(){
   localStorage.setItem(this.model.naam, JSON.stringify(this.model))
   this.recepten.push(this.model)

  }
  get currentRecept() { return JSON.stringify(this.model); }

}

