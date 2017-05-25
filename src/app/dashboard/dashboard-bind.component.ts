import { Invoice } from '../models/invoice';
import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-dashboard-bind',
  template: `
     <div style="height:520px;width:320px;overflow:scroll;
                        color:white;scrollbar-base-color:gold;
                        font-family:sans-serif;padding:1px;">
              <app-dashboard-item
                *ngFor="let item of invoiceList" 
                [key]='item.$key'
                [invoice]='item'>
              </app-dashboard-item>
            </div>
            `,
  styles: []
})
export class DashboardBindComponent implements OnInit {

@Input() invoiceList:Invoice[];
  constructor() { }

  ngOnInit() {
  }

}
