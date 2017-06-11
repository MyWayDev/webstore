import { SlsService } from '../services/sls.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit,Input,ViewContainerRef } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap'

@Component({
  selector: 'app-ordersort-item',
  templateUrl: './ordersort-item.component.html',
  styles: [` 
  
  
hr.style2 {
	border-top: 3px double #8c8b8b;
}
  
  input.hidden {
                   position: absolute;
                  }

               #profile-image1 {
                      cursor: pointer;
                    }
            
                    `]
})

export class OrdersortItemComponent implements OnInit {
  
  invoiceId:number;
  depositNumber:string;

  @Input() invoice:Invoice;
  @Input() key:string;

  public includeLiterals: boolean = false;
  public mask: string = "0000000000";

  constructor( private invoiceService:InvoiceService,
                private sls:SlsService,
                       overlay: Overlay, 
                       vcRef: ViewContainerRef,
                       public modal: Modal
               ) {  overlay.defaultViewContainer = vcRef; }
               
 onClick() {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .dialogClass('modal-dialog')
   
    .body('<div class="pull-right">!!!هل تريد حذف الطلبية</div>')
    .okBtnClass('btn btn-danger')
    .open().then( (resultPromise) => {
        resultPromise.result.then( (result) => {
         this.remove();
        }, 
        () => {
          //TODO - SAVE TEMP
        } );
    });
    
  }
 
 onChecked(key:string,check:boolean,invoiceId:string){

   this.invoiceService.updateCheck( key,
                                    check,
                                    invoiceId);
 }


 onOn(key:string,check:boolean){

   this.invoiceService.updateOn(key,check);
 }

remove(order:Invoice=this.invoice,key:string=this.key){

  this.invoiceService.removeDeposit(key);

}

  ngOnInit() {
  }

}
