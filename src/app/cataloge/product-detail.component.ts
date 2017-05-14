import { NoInputRenameRule } from 'codelyzer';
import { InvoiceDetails } from '../models/invoice-details';
import { SlsService } from '../services/sls.service';
import { ResultFunc } from '@angular-cli/ast-tools/node_modules/rxjs/observable/GenerateObservable';

import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Subscription } from 'rxjs/Rx';
import {AngularFire,AngularFireDatabase, FirebaseListObservable} from 'angularfire2';
import { Observable } from 'rxjs/Observable'
import { Product } from '../models/product';
import { CatalogeService } from '../services/cataloge.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [` .flex1 {
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
                      opacity: 0.40;
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
export class ProductDetailComponent implements OnInit, OnDestroy, OnChanges {

  public autoCorrect: boolean = true;
   public min: number = 1;
    public max: number = 99;
    public valueN: number = 1;

    show:boolean;
   showII:boolean=false;
 
  selectedItem:Product;
  itemIndex:string;
products:Product[];
  invoiceItem:InvoiceDetails;
  subscription: Subscription;
  isq;
  q:number=1;
  stock:number;
  invoiceDetails:InvoiceDetails;
  totalBp:number=0;
  totalAmount:number=0;


  constructor(private catalogeService:CatalogeService,
              private af:AngularFire,
              private router:Router,
              private route:ActivatedRoute,
              private sls:SlsService){
                this.invoiceDetails = this.sls.getItems();
            

              }
              

  ngOnInit() {
    
     this.subscription= this.route.params.subscribe((params:any)=>{this.itemIndex=params['id']
                        console.log('parma',this.itemIndex);
                        
                        this.selectedItem = this.catalogeService
                                            .getItem(this.itemIndex)
                                            .subscribe(product=>this.selectedItem=product)
                           this.catalogeService.getProducts()
                                        .subscribe(cat=>this.products=cat);              
                                            })      
                 this.totalBp=this.sls.getTotalBp();
                 this.totalAmount=this.sls.getTotalAmount();          
            }

  ngOnChanges(){
  
  }
  stockCheck(id:string, qty:number){
  
 
  this.stock=this.products.find(i=>id==i.productId).stock;
  if(this.stock<qty){
    this.showII=true;
  }
  else{
    this.showII=false;
  }
  console.log('stock',this.stock);

}

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
 
  /*onAddToOrder(){

       this.sls.addToOrder(this.selectedItem,this.q)
             
    }*/

  onAddToInvoice(){

    this.stockCheck(this.selectedItem.productId,this.q)
if(this.showII==false){
  console.log('showii',this.showII)
       this.invoiceItem={
                ref:this.selectedItem.$key,
               itemId:this.selectedItem.productId,
               price:this.selectedItem.price,
               bp:this.selectedItem.bp,
               qty:this.q
               //add totals and ref
                          };
                console.log('INVO',this.invoiceItem);
       this.sls.addItem(this.invoiceItem)
          this.totalBp=this.sls.getTotalBp();
                 this.totalAmount=this.sls.getTotalAmount();
                   }}
      itemSelect(input){
        this.router.navigate(['cataloge/'+input])
        
      } 

      toShopping(){
          this.router.navigate(['/shopping-list/']);
      }

    

  }




