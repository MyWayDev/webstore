import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { Invoice } from '../models/invoice';
import { CatalogeService } from '../services/cataloge.service';
import { InvoiceDetails } from '../models/invoice-details';
import { Product } from '../models/product';
import { SlsService } from '../services/sls.service';
import { Observable } from 'rxjs/Rx';


import { Component ,EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sls-add',
  templateUrl: './sls-add.component.html',
  styles: [`
            .profile
{
    font-family: 'Lato', 'sans-serif';
}
figure{
margin-top:10px;
cursor:pointer;
}
.text-center{
text-align:center;
}
.text-right{
text-align:right;
}
.text-left{
text-align:left;
}
.margin-top{
margin-top:1px;
}
.divider{
color:lightgray;
background:lightgray;
}
.pressItemHover{
display:none;
}
.pressItemHover button{
background:transparent;
}
  `]
})
export class SlsAddComponent implements OnInit, OnChanges {



    constructor(private sls:SlsService,
  private catalogeService:CatalogeService,
  private authService:AuthService,

  ){
   
    
    this.uid=this.authService.authInfo$.value.$uid;
  }

@Input() item:InvoiceDetails;
@Output() cleared = new EventEmitter();
itemValues : Product;
isAdd = true;
products:Product[];
items:InvoiceDetails[];

totalAmount : number = 0;
totalBp:number = 0 ;
totalQty:number = 0;
CurrentDate = new Date();
newHeader:Invoice;
uid:string;
user:Profile;
isSave:boolean;

/*Primeng Structure*/
 
   



  ngOnInit(){
     this.catalogeService.getProducts()
                    .subscribe(cat=>this.products=cat);     
     this.totalAmount=this.sls.getTotalAmount();
     this.totalBp=this.sls.getTotalBp();
     this.totalQty = this.sls.getTotalQty();
     this.user=this.sls.getUid(this.uid).subscribe(uid=>this.user=uid)
     console.log('user',this.user)
            }



  ngOnChanges(changes){
      if(changes.item.currentValue === null){
        this.item = {itemId:null, qty:null};
      this.isSaveable();
      
      }
       else{this.isAdd = false;  
            this.isSaveable()
      }
   
     
  }

 

    onSubmit(invoiceDetails:InvoiceDetails){

      this.itemValues= this.products.find(i=>invoiceDetails.itemId==i.productId)
      const newItem = new InvoiceDetails(invoiceDetails.itemId,
                                          invoiceDetails.price =this.itemValues.price,
                                          invoiceDetails.bp = this.itemValues.bp,
                                          invoiceDetails.qty)   
                              
            if(!this.isAdd){
              this.sls.editItem(this.item,newItem);
              this.totalAmount=this.sls.getTotalAmount();
              this.totalBp=this.sls.getTotalBp();
              this.totalQty = this.sls.getTotalQty();
              this.item = {itemId:null,qty:null};
              this.isSaveable();
              
            }
              else{
                this.item = newItem;
                this.sls.addItem(this.item)
                 this.totalAmount=this.sls.getTotalAmount();
                 this.totalBp=this.sls.getTotalBp();   
                 this.totalQty = this.sls.getTotalQty();
                 this.isSaveable();
                
                  
              }
              console.log('save',this.isSaveable()); 
    }

    onDelete(){
      this.sls.deleteItem(this.item);
      this.onClear();
    }
    
    onClear(){
      this.cleared.emit(null)
      this.isAdd = true;
    }

addHeader(addDate:Date,memberId:string,
          totalQty:number,totalBp:number,
          totalAmount:number,depositNumber:string,
          depositImg:string,pending:boolean,checked:boolean,invoiceDetails:Invoice[]
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
                                invoiceDetails:this.sls.getItems()

            }
              this.sls.saveInvoice(newInvoice);
              this.sls.deleteItems();
              this.emptyInvoice();

}

emptyInvoice(){
  this.totalAmount = 0;
  this.totalQty = 0
  this.totalBp = 0
}
 isSaveable(){
    if(this.totalQty > 0){
      this.isSave = true;
    }else{
      this.isSave=false;
    }
    return this.isSave
  }
    
}
