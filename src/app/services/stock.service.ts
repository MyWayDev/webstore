import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StockService {

  constructor(private af:AngularFire) { }



  updateStock(key:string,product:Product){

       this.af.database.object('/products/'+key)
                  .update({
                    name:product.name,
                    price:product.price,
                    stock:product.stock
                   
                  });

  }

}
