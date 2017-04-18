import { Observable } from 'rxjs/Rx';
import { SlsService } from '../services/sls.service';
import { SlsComponent } from '../sls/sls.component';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit } from '@angular/core';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {Header,Footer} from 'primeng/primeng';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
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
          `]
})
export class DashboardListComponent implements OnInit {

  invoices:Invoice[];
myOrders:Invoice[] ;
uid:string;
user:Profile;

  constructor(private invoiceService:InvoiceService,
  private authService:AuthService,
  private sls:SlsService) 
  { 
    this.uid = this.authService.authInfo$.value.$uid;
    this.user=this.sls.getUid(this.uid).subscribe(uid=>this.user=uid);
  
  }

  ngOnInit() {
          this.filterOrders(this.uid)
   /*this.invoiceService.getUserOrders()
                        .subscribe(orders=>
                                     this.invoices = this.myOrders = orders )*/
  }
   search(input:string){
                        this.myOrders=this.invoices
                        .filter(P => P.$key
                        .includes(input))
                      }

 filterOrders(uid){
   this.invoiceService.getOrder(uid).subscribe(
     orders=>{
       this.myOrders=orders
     })
 }

}
