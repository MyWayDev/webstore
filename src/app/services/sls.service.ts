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
 


  constructor(private af:AngularFire) {
    this.invoice=this.af.database.list('/invoices');
   }

   

  saveInvoice(newInvoice){
  this.invoice.push(newInvoice)
     console.log('saved',newInvoice)
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
    return this.items;
  }

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
