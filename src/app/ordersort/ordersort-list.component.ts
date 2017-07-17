import { Observable } from 'rxjs/Rx';
import { SlsService } from '../services/sls.service';
import { SlsComponent } from '../sls/sls.component';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-ordersort-list',
  templateUrl: './ordersort-list.component.html',
  styles: [`
             #search-input {
                padding-left: 43px;
                padding-right: 43px;
                border-radius: 23px;
                            }
            .errspan {
                float: left;
                margin-left: 15px;
                margin-top: -25px;
                position: relative;
                z-index: 2;
                color: gray;
                    }
  `],
  providers: [ ]
})
export class OrdersortListComponent implements OnInit {
 
    invoices:Invoice[];
    pendingOrders:Invoice[] ;
    checkedOrders:Invoice[]; 
    filtered:Invoice[];
    uid:string;
    user:Profile;
    count:number;

  constructor(private invoiceService:InvoiceService,
  private authService:AuthService, private sls:SlsService) 
  { 
    this.uid = this.authService.authInfo$.value.$uid;
    this.user=this.sls.getUid(this.uid).subscribe(uid=>this.user=uid);
  
  }
             
  ngOnInit() {                   
   /*this.invoiceService.getUserOrders()
                        .subscribe(orders=>
                                     this.invoices = this.myOrders = orders )

                                     this.filtered=this.products
                        .filter(item=>parseInt(item.productId).toString()
                        .includes(search)
                                     */
  }
   search(input:string){
                        /*this.pendingOrders = this.checkedOrders =*/
                        this.filtered = this.invoices
                         .filter(P =>parseInt(P.memberId)
                         .toString()
                         .includes(input))

                        
                      }
  getPending(){
        this.invoiceService.getPendingOrders().subscribe(pending=>{
                  this.invoices = this.pendingOrders  = this.filtered = pending;

                                });     
                                               
}

getChecked(){

     this.invoiceService.getCheckedOrders().subscribe(checked =>{
              this.invoices = this.checkedOrders=  this.filtered = checked;
            });
                    
}


}