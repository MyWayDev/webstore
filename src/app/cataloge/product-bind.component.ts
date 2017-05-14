import { Product } from '../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-bind',
  template: `  
            <div style="height:610px;width:320px;overflow:auto;
                        color:white;scrollbar-base-color:gold;
                        font-family:sans-serif;padding:1px;">
              <app-product-item
                *ngFor="let item of productList" 
                [productId]='item.productId'
                [product]='item'>
              </app-product-item>
            </div>
            `,
    styles: []
            })
export class ProductBindComponent implements OnInit {

@Input() productList:Product[];

  constructor() { }

  ngOnInit() {
  }

}
