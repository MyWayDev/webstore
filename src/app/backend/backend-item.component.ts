import { Invoice } from '../models/invoice';
import { Component, OnInit,Input } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';


@Component({
  selector: 'app-backend-item',
  templateUrl: './backend-item.component.html',
  styles: [` input.hidden {
                   position: absolute;
                  }

               #profile-image1 {
                      cursor: pointer;
                    }`]
})
export class BackendItemComponent implements OnInit {

  depositNumber:string;
  public checked: boolean 
  @Input() invoice:Invoice;
  @Input() key:string;


  constructor( private invoiceService:InvoiceService,
                ) { 
                
                }

 onChecked(key:string,check:boolean){
   this.invoiceService.updateCheck(key,check);
 }
 onOn(key:string,check:boolean){
   this.invoiceService.updateOn(key,check);
 }

update(key:string=this.key,depositeNumber:string=this.depositNumber){
this.invoiceService.updateDeposit(key,depositeNumber)
}
remove(key:string=this.key){
  this.invoiceService.removeDeposit(key);
}

  ngOnInit() {
  }

}
