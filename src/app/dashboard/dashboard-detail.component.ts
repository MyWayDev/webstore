import { InvoiceService } from '../services/invoice.service';
import { InvoiceDetails } from '../models/invoice-details';
import { AuthService } from '../services/auth.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router'; 


@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styles: [`
                 .invoice {
    position: relative;
    background: #fff;
    border: 1px solid #f4f4f4;
    padding: 20px;
    margin: 10px 25px;
}
.page-header {
    margin: 10px 0 20px 0;
    font-size: 16px;
}
  `]
})
export class DashboardDetailComponent implements OnInit {

  selectedItem:Invoice;
  uidIndex:string;
  key:string;
  invoiceItem:Invoice;
  subscription: Subscription;
   public value: Date = new Date();


  constructor(private router:Router,
              private route:ActivatedRoute,
              private authService:AuthService,
              private invoiceService:InvoiceService)
               {
                 this.uidIndex = this.authService.authInfo$.value.$uid;
               }

  ngOnInit() {
     this.subscription= this.route.params.subscribe((params:any)=>{this.key=params['id']
                        console.log('parma',this.key);
                          this.selectedItem = this.invoiceService
                                            .getKey(this.key).do(console.log)
                                            .subscribe(invoice=>this.selectedItem=invoice)
                     
  })
  
}



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}