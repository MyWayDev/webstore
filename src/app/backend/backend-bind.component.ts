import { Invoice } from '../models/invoice';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-backend-bind',
  template: `
      <div style="height:520px;width:330px;overflow:scroll;
                        color:white;scrollbar-base-color:gold;
                        font-family:sans-serif;padding:1px;">
              <app-backend-item
                *ngFor="let item of invoiceList" 
                [key]='item.$key'
                [invoice]='item'>
              </app-backend-item>
            </div>
  `,
  styles: []
})
export class BackendBindComponent implements OnInit {
@Input() invoiceList:Invoice[];
  constructor() { }

  ngOnInit() {
  }

}
