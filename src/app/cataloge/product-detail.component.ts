
import { InvoiceDetails } from '../models/invoice-details';
import { SlsService } from '../services/sls.service';
import { AuthService } from '../services/auth.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AngularFire, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'
import { Product } from '../models/product';
import { CatalogeService } from '../services/cataloge.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [`
                .button {
                position: relative;
                padding: 8px 20px;
                margin: 20px 0 0 0;  
                color: #fff;
                font: bold 14px Arial, Helvetica;
                text-transform: uppercase;
                text-decoration: none;
                display: inline-block;       
                background-color: #a2a5a0;
                background-image: -moz-linear-gradient(#446e9b,#3399f3);
                background-image: -webkit-gradient(linear, left top, left bottom, from(#446e9b), to(#446e9b));    
                background-image: -webkit-linear-gradient(#446e9b,#3399f3);
                background-image: -o-linear-gradient(#446e9b,#3399f3);
                background-image: -ms-linear-gradient(#446e9b,#3399f3);
                background-image: linear-gradient(#446e9b,#3399f3);
                -moz-border-radius: 3px;
                -webkit-border-radius: 3px;
                border-radius: 3px;     
                text-shadow: 0 1px 0 rgba(0,0,0,.3);        
                -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, .5), 0 2px 0 rgba(0, 0, 0, .7);
                -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, .5), 0 2px 0 rgba(0, 0, 0, .7);
                box-shadow: 0 1px 0 rgba(255, 255, 255, .5), 0 2px 0 rgba(0, 0, 0, .7);
              }

              .button:hover {
                background-color:#b9bfb5;
                background-image: -moz-linear-gradient(#446e9b, #446e9b);
                background-image: -webkit-gradient(linear, left top, left bottom, from(#446e9b), to(#446e9b));      
                background-image: -webkit-linear-gradient(#446e9b, #446e9b);
                background-image: -o-linear-gradient(#446e9b, #446e9b);
                background-image: -ms-linear-gradient(#446e9b, #446e9b);
                background-image: linear-gradient(#446e9b, #446e9b); 
              }

              .button:active, .button:focus {
                background:#b9bfb5;       
                top: 2px;
                -moz-box-shadow: 0 0 3px rgba(0, 0, 0, .7) inset;
                -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, .7) inset;
                box-shadow: 0 0 3px rgba(0, 0, 0, .7) inset; 
              }

              /* --------------- */

             
              .container {
 
  padding: 1px;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
}
              .button {
  display: block;

  margin: 10px;
  padding: 20px
}

button.button {
  width: calc(100% - 20px);
}
            .flex1 {
                      display: flex;
                    }
                    .flex2 {
                       flex: 1;
                    }
            h2{
          
              -webkit-text-stroke-width: .25px;
              -webkit-text-stroke-color: black;
            }
                   #parent {
                    
                      position: relative;
                      top: 0;
                      left: 0;
                    }
                    #image1 {
                      float:left;
                      algin:left;
                      position: relative;
                      top: 0;
                      left: 0;
                    }
                    #image2 {
                      float:left;
                      position: absolute;
                      top:90px;
                      left: -10px;
                      opacity: 1;
                      filter: alpha(opacity=50); /* For IE8 and earlier */
                    }
                        #image3 {
                          float:left;
                      position: absolute;
                      top: 0px;
                      left: 40px;
                      opacity: 0.75;
                      filter: alpha(opacity=50); /* For IE8 and earlier */
                    }
          `]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public autoCorrect: boolean = true;
  public min: number = 1;
  public max: number = 10;


  show: boolean;
  showII: boolean = false;
  selected: InvoiceDetails = null;
  selectedItem: Product;
  itemIndex: string;
  products: Product[];
  invoiceItem: InvoiceDetails;
  subscription: Subscription;
  isq;
  q: number = 1;
  stock: number;
  invoiceDetails: InvoiceDetails[];
  totalBp: number = 0;
  totalAmount: number = 0;
  uid:string;
  user:Profile;
  duplicate: boolean;

  constructor(private catalogeService: CatalogeService,
    private af: AngularFire,
    private router: Router,
    private route: ActivatedRoute,
    private sls: SlsService,
    private authService:AuthService
     
    ) {
     this.uid=this.authService.authInfo$.value.$uid;
    this.invoiceDetails = this.sls.getItems();



  }


  ngOnInit() {

    this.subscription = this.route.params.subscribe((params: any) => {
      this.itemIndex = params['id']
      console.log('parma', this.itemIndex);

      this.selectedItem = this.catalogeService
        .getItem(this.itemIndex)
        .subscribe(product => this.selectedItem = product)
      this.catalogeService.getProducts()
        .subscribe(cat => this.products = cat);
    })
    this.totalBp = this.sls.getTotalBp();
    this.totalAmount = this.sls.getTotalAmount();
   
    this.user=this.sls.getUid(this.uid).subscribe(uid=>this.user=uid);
   
  }


  stockCheck(id: string, qty: number) {


    this.stock = this.products.find(i => id == i.productId).stock;
    if (this.stock < qty) {
      this.showII = true;
    }
    else {
      this.showII = false;
    }
    console.log('stock', this.stock);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*onAddToOrder(){

       this.sls.addToOrder(this.selectedItem,this.q)
             
    }*/

  onAddToInvoice() {
 
    this.stockCheck(this.selectedItem.productId, this.q)
    if (this.showII == false) {

      this.invoiceItem = {
        ref: this.selectedItem.$key,
        itemId: this.selectedItem.productId,
        price: this.selectedItem.price,
        bp: this.selectedItem.bp,
        qty: this.q

      };
      this.duplicate = false;
      for (var i = 0; i < this.invoiceDetails.length; i++) {

        if (this.invoiceItem.itemId === this.invoiceDetails[i].itemId) {
          this.duplicate = true;
          console.log('duplicate', this.duplicate);
          console.log("Idetails", this.invoiceDetails[i].itemId);
          console.log("Iitem", this.invoiceItem);

          this.sls.editItem(this.invoiceDetails[i], this.invoiceItem);
          this.totalBp = this.sls.getTotalBp();
          this.totalAmount = this.sls.getTotalAmount();
          this.q = 1;
        }



      }

      if (this.duplicate === false) {
        this.sls.addItem(this.invoiceItem)
        this.totalBp = this.sls.getTotalBp();
        this.totalAmount = this.sls.getTotalAmount();
        this.q = 1;
        console.log('after length', this.invoiceDetails)
      }

    }
  }

  itemRoute(input) {
    this.router.navigate(['cataloge/' + input])


  }

  toShopping() {
    this.router.navigate(['/order/']);
    this.sls.isShipFees(this.user.area)

  }
  onDelete(input) {
    this.sls.deleteItem(input);
    this.totalBp = this.sls.getTotalBp();
    this.totalAmount = this.sls.getTotalAmount();


  }
  onSelectItem(item: InvoiceDetails) {
    this.selected = item;
  }



  // this.sls.editItem(z,item);

}




