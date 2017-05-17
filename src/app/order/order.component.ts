import { Component ,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { Invoice } from '../models/invoice';
import { CatalogeService } from '../services/cataloge.service';
import { InvoiceDetails } from '../models/invoice-details';
import { SlsService } from '../services/sls.service';
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [`
              .invoice-title h2, .invoice-title h3 {
                display: inline-block;
            }
            .table > tbody > tr > .no-line {
                border-top: none;
            }
            .table > thead > tr > .no-line {
                border-bottom: none;
            }
            .table > tbody > tr > .thick-line {
                border-top: 2px solid;
            }
`]

})

export class OrderComponent implements OnInit {

items:InvoiceDetails[]=[];
uid:string;
user:Profile;
shipFees:number=0;
adminFees:number =5;  
area:string = "";
totalAmount : number = 0;
totalBp:number = 0 ;
totalQty:number = 0;
CurrentDate = new Date();

  constructor(private sls:SlsService,
  private catalogeService:CatalogeService,
   private af:AngularFire,
   private router: Router,
  private authService:AuthService){
    this.uid=this.authService.authInfo$.value.$uid;
     this.user=this.sls.getUid(this.uid).subscribe(uid=>this.user=uid);
   
}
  ngOnInit() {
     this.items = this.sls.getItems();
       this.totalAmount=this.sls.getTotalAmount();
     this.totalBp=this.sls.getTotalBp();
     this.totalQty = this.sls.getTotalQty();
     this.shipFees = this.sls.getShipFees();
     
    

    
 
  }

onSave(addDate:Date,memberId:string,
          totalQty:number,totalBp:number,
          totalAmount:number,depositNumber:string,
          depositImg:string,pending:boolean,checked:boolean,adminFee:number,
          shippingFee:number,invoiceDetails:Invoice[]
          ){ var created_at= new Date().toString()
           
            var newInvoice = {
                                addDate:created_at,
                                uid:this.uid,
                                memberId:this.user.distrId,
                                totalQty:this.totalQty,
                                totalBp:this.totalBp,
                                totalAmount:this.totalAmount,
                                depositNumber:'',
                                depositImg:'',
                                pending:true,
                                checked:false,
                                adminFee:this.adminFees,
                                shippingFee:this.shipFees,                           
                                invoiceDetails:this.sls.getItems()
            }
            
              this.sls.saveInvoice(newInvoice);
              this.sls.deleteItems();
              this.emptyInvoice();
               this.router.navigate(['cataloge/'])
              /*this.sls.getBalance()*/
            }

            emptyInvoice(){
  this.totalAmount = 0;
  this.totalQty = 0;
  this.totalBp = 0;
  this.shipFees=0;
}

 backRoute() {
    this.router.navigate(['cataloge/' + '1092'])


  }
}
