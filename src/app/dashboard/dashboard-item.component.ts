
import { Invoice } from '../models/invoice';
import { Component, OnInit,Input } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';


@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
    styles: [`
             input.hidden {
                   position: absolute;
                  }

               #profile-image1 {
                      cursor: pointer;
                    }
                      `]

})

export class DashboardItemComponent implements OnInit {
  depositNumber:string;

  @Input() invoice:Invoice;
  @Input() key:string;


  constructor( private invoiceService:InvoiceService,
                ) { }



update(key:string=this.key,depositeNumber:string=this.depositNumber){
this.invoiceService.updateDeposit(key,depositeNumber)
}
remove(key:string=this.key){
  this.invoiceService.removeDeposit(key);
}

  ngOnInit() {
  }

}
