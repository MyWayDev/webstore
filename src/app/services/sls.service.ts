import { relativeTimeRounding } from 'moment';
import { CatalogeService } from './cataloge.service';

import { Profile } from '../models/profile';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { InvoiceDetails } from '../models/invoice-details';
import { Invoice } from '../models/invoice';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SlsService {
  invoice: FirebaseListObservable<Invoice>;
  private items: InvoiceDetails[] = [];
  private products: Product[] = [];
  private header: Invoice[] = [];

  invoices: Observable<Invoice[]>
  itemStock: FirebaseObjectObservable<Product>;
  prod;
  S: number;
  sourceId: Observable<Product[]>
  data;
  user:Profile;
  shipFees:number=0;



  constructor(
    private af: AngularFire,
    private catalogeService: CatalogeService,
    
    ) {
     
    this.invoice = this.af.database.list('/invoices');
  }

  stock(key: string) {
    this.itemStock = this.af.database.object('products/' + key);

    return this.itemStock
  }

  getId() {
    this.sourceId = this.af.database.list
      ('/products').map(prods => {
        prods.map(prod => {
          this.data = []
          for (var i in prod.productId)
            this.data.push(this.af.database.object('/productId/' + i))
        });
        return this.data;
      })
  }
updateRemoved(oldInvoice) {

    for (var i = 0; i < oldInvoice.invoiceDetails.length; i++) {
      this.prod = this.af.database.object
        ('products/' + oldInvoice.invoiceDetails[i].ref + '/stock')

      this.prod.subscribe(x => {
        this.S = x.$value
        console.log('S', this.S)
      })

      this.stock(oldInvoice.invoiceDetails[i].ref)
        .update(
        {
          stock: this.S + oldInvoice.invoiceDetails[i].qty
        }

        )
    }
    console.log('updateRemoved', this.prod)
    
  }

  saveInvoice(newInvoice) {

    for (var i = 0; i < newInvoice.invoiceDetails.length; i++) {
      this.prod = this.af.database.object
        ('products/' + newInvoice.invoiceDetails[i].ref + '/stock')

      this.prod.subscribe(x => {
        this.S = x.$value
        console.log('S', this.S)
      })

      this.stock(newInvoice.invoiceDetails[i].ref)
        .update(
        {
          stock: this.S - newInvoice.invoiceDetails[i].qty
        
        }

        )
    }
    console.log('stockupdate', this.prod)

    this.invoice.push(newInvoice);
    /*newInvoice.invoiceDetails.forEach(d=>{

this.details = this.af.database.object('product/'+ d.key)
 
 this.af.database.object('/products/'+ d.ref).update({
    stock:  d.qty
  } )  
});*/
    console.log('savedInvoice', newInvoice)
  }

  getbalance(key: string): Observable<Product[]> {
    return this.af.database.list('invoices', {
      query: {
        orderByKey: true,
        equalTo: key
      }
    }).map(invos => {
      invos.map(invo => {
        invo.stock = [];
        for (var i = 0; i < invo.invoiceDetails.length; i++)
          invo.stock.push(this.af.database
            .object('products/' + invo.invoiceDetails[i].ref))


        console.log('invo', invo.stock);
      })

      return invos;
    })

  }

  addItem(item: InvoiceDetails) {
    this.items.push(item);
    console.log('list', this.items)
  }

  addItems(list: InvoiceDetails[]) {
    Array.prototype.push.apply(this.items);
  }



  getUid(id: string): Observable<Profile> {
    return this.af.database.list
      ('profile', {
        query: {
          orderByChild: 'id',
          equalTo: id
        }
      }).map(result =>
        Profile.fromJsonProfile(result[0])).do(console.log)
  }

  getItems() {
    return this.items
  }

  editItem(oldItem: InvoiceDetails, newItem: InvoiceDetails) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: InvoiceDetails) {
    this.items.splice(this.items.indexOf(item), 1)
  }

  deleteItems() {
    this.items.length = 0;
  }

  getTotalBp() {
    let total = 0;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]) {
        total += (this.items[i].qty) * (this.items[i].bp);
      }
    }
    return total;
  }

  getTotalAmount() {
    let total = 0;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]) {
        total += (this.items[i].qty) * (this.items[i].price);
      }
    }
    return total;
  }

  getTotalQty() {
    let total = 0;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]) {
        total += (this.items[i].qty);

      }
    }
    return total;
  }

  isShipFees(area){
  let shipFees
  
  if(this.getTotalBp() < 300 ||area ==="csa")
  
  {
    shipFees=30;
  
  }else{
    shipFees=0
   
  }
 this.shipFees =shipFees;
 console.log('feez',this.shipFees);
}
getShipFees(){
  return this.shipFees;
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
