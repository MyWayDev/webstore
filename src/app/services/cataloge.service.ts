import { ResultFunc } from 'rxjs/observable/GenerateObservable';
import { retry } from 'rxjs/operator/retry';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2'
import { Observable } from     'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/find';

@Injectable()
export class CatalogeService {

constructor(private af:AngularFire) { }


  

                                

  getProducts():Observable<Product[]>{
                                        return this.af.database.list('products')
                                        .map(Product.fromJsonProductList)
                                        .do(console.log);
                                      }



    getItem(id:string):Observable<Product>{
                                          return this.af.database.list
                                          ('products',{
                                                  query:{
                                                    orderByChild:'productId',
                                                    equalTo:id
                                                        }}).map(result=>
                                                 Product.fromJsonProduct(result[0])).do(console.log);
                                                        
                                         }


}