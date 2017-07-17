import { InvoiceService } from '../services/invoice.service';
import { InvoiceDetails } from '../models/invoice-details';
import { AuthService } from '../services/auth.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-backend-detail',
  templateUrl: './backend-detail.component.html',
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
export class BackendDetailComponent implements OnInit {

 selectedItem:Invoice;
  uidIndex:string;
  key:string;
  invoiceItem:Invoice;
  subscription: Subscription;

 


  constructor(private router:Router,
              private route:ActivatedRoute,
              private authService:AuthService,
              private invoiceService:InvoiceService,
              overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal)
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