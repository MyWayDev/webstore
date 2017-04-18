import { Product } from '../models/product';
import { Component, Input, Output,EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles:[`
            a{
                background-color:whitesmoke;
              }
           h5{
          
              -webkit-text-stroke-width: 0.35px;
              -webkit-text-stroke-color: black;
             }
          `]
})
export class ProductItemComponent implements OnInit {
 
  @Input() product:Product;
  @Input() productId:number;

  constructor() { }

  ngOnInit(){}


}
