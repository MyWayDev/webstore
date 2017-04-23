import {
    NgTools_InternalApi_NG2_ListLazyRoutes_Options
} from 'angular-cli/node_modules/@angular/compiler-cli/src/ngtools_api';
import { ResultFunc } from 'rxjs/observable/GenerateObservable';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { isPrimitive } from 'angular-cli/node_modules/@angular/compiler/testing/facade/lang';
import { CatalogeService } from './cataloge.service';
import { isObservable } from 'angular-cli/node_modules/@angular/core/src/util/lang';
import { forEach } from '@angular/router/src/utils/collection';
import { Profile } from '../models/profile';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { InvoiceDetails } from '../models/invoice-details';
import { Invoice } from '../models/invoice';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFire } from 'angularfire2';
import { Observable } from     'rxjs/Rx';

@Injectable()
 export class SlsService {
  invoice:FirebaseListObservable<Invoice>;
  private items:InvoiceDetails[]=[];
  private products:Product[]=[];
  private header:Invoice[]=[];

  invoices:Observable<Invoice[]>
  itemStock: FirebaseObjectObservable<Product>;
  prod;
  S:number;
  
 
  constructor(
    private af:AngularFire, 
    private catalogeService:CatalogeService) {
    
    this.invoice=this.af.database.list('/invoices');
   
}

stock(key:string){
  this.itemStock = this.af.database.object('products/' + key);

  return this.itemStock
}
getStock(key:String){
  return this.af.database.object('/products/'+key)
    
     
}

 saveInvoice(newInvoice){

 for(var i=0; i < newInvoice.invoiceDetails.length; i++){
 this.prod = this.af.database.object
                    ('products/' + newInvoice.invoiceDetails[i].ref +'/stock')

  this.prod.subscribe(x=>{
    this.S=x.$value
   console.log('S',this.S)
  })

   this.stock(newInvoice.invoiceDetails[i].ref)
                        .update(
                          {
      stock: (this.S - newInvoice.invoiceDetails[i].qty)
    }
  
    )}
    console.log('stockupdate',this.prod)

  this.invoice.push(newInvoice);
            /*newInvoice.invoiceDetails.forEach(d=>{

        this.details = this.af.database.object('product/'+ d.key)
        
         this.af.database.object('/products/'+ d.ref).update({
            stock:  d.qty
          } )  
  });*/
     console.log('savedInvoice',newInvoice)
  

  }

getbalance(key:string):Observable<Product[]>{
  return this.af.database.list('invoices',{
    query:{
      orderByKey:true,
      equalTo:key
    }
  }).map(invos=>{invos.map(invo=>{
    invo.stock=[];
    for(var i=0; i < invo.invoiceDetails.length; i++)
    invo.stock.push(this.af.database
    .object('products/'+invo.invoiceDetails[i].ref))
    
  
     console.log('invo',invo.stock);
  })
   
    return invos;
  })
   
}


 



    addItem(item:InvoiceDetails){
              this.items.push(item);
        console.log('list',this.items)              
  }
   addItems(list:InvoiceDetails[]){
            Array.prototype.push.apply(this.items);
  }
 
  getUid(id:string):Observable<Profile>{
    return this.af.database.list 
    ('profile',{
      query:{
        orderByChild :'id',
        equalTo: id
        }}).map(result=>
          Profile.fromJsonProfile(result[0])).do(console.log)
    }
    
   getItems(){
     return this.items}

  editItem(oldItem:InvoiceDetails,newItem:InvoiceDetails){
    this.items[this.items.indexOf(oldItem)]=newItem;
  }

  deleteItem(item:InvoiceDetails){
    this.items.splice(this.items.indexOf(item),1)

  }
  deleteItems(){
   this.items.length=0;
  }

  getTotalBp(){
     let total = 0;
    for(var i=0; i < this.items.length; i++){
      if(this.items[i]){
        total += (this.items[i].qty)*(this.items[i].bp);
      }
    }
   return total;
  }

  getTotalAmount(){
     let total = 0;
    for(var i=0; i < this.items.length; i++){
      if(this.items[i]){
        total += (this.items[i].qty)*(this.items[i].price);
      }
    }
   return total;
  }

    getTotalQty(){
     let total = 0;
    for(var i=0; i < this.items.length; i++){
      if(this.items[i]){
        total += (parseInt(this.items[i].qty.toString()));
        
      }
    }
   return total;
  }
  /*addToOrder(item:Product,qty:number){
    this.items.push(item.productId,
                    item.name,
                    item.price,
                    item.bp,
                    item.stock,
                    qty);               
  }*/
}
