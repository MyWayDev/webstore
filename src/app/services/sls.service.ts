import { isPrimitive } from 'angular-cli/node_modules/@angular/compiler/testing/facade/lang';
import { CatalogeService } from './cataloge.service';
import { isObservable } from 'angular-cli/node_modules/@angular/core/src/util/lang';
import { forEach } from '@angular/router/src/utils/collection';
import { Profile } from '../models/profile';
import { FirebaseListObservable } from 'angularfire2/database';
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
  itemStock: FirebaseListObservable<Product[]>;
  
 
  constructor(
    private af:AngularFire, 
    private catalogeService:CatalogeService) {

    this.invoice=this.af.database.list('/invoices');
   
}

 
 itemsbalance(key:string){
      return this.af.database.list('invoices/'+ key)
          .map(invos=>{
                invos.map(invo=>{
                    invo.stock=[];
                        for(var d in invo.invoiceDetails)
                            invo.stock
                                .push(this.af.database
                                .object('/invoiceDetails/'+d))
              });
              return invos;
        })

 }
   

  saveInvoice(newInvoice){
  this.invoice.push(newInvoice);
            /*newInvoice.invoiceDetails.forEach(d=>{

        this.details = this.af.database.object('product/'+ d.key)
        
         this.af.database.object('/products/'+ d.ref).update({
            stock:  d.qty
          } )  
  });*/
     console.log('savedInvoice',newInvoice)
  }

    getBalance(itemId:string[]):Observable<Product[]>{
      return this.af.database.list('products',{
            query:{
              orderByKey:true,
              equalTo:'itemId'
            }
          }).map(result=>Product.fromJsonProductList(result)).do(console.log)
    }////test code



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
