import { Invoice } from '../models/invoice';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-ordersort-bind',
  template: `
      <div style="height:520px;width:330px;overflow:scroll;
                        color:white;scrollbar-base-color:gold;
                        font-family:sans-serif;padding:1px;">
              <app-ordersort-item
                *ngFor="let item of invoiceList" 
                [key]='item.$key'
                [invoice]='item'>
              </app-ordersort-item>
            </div>
  `,
  styles: []
})
export class OrdersortBindComponent implements OnInit {
@Input() invoiceList:Invoice[];
  constructor() { }

  ngOnInit() {
  }

}
