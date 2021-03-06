
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { Invoice } from '../models/invoice';
import { CatalogeService } from '../services/cataloge.service';
import { InvoiceDetails } from '../models/invoice-details';
import { Product } from '../models/product';
import { SlsService } from '../services/sls.service';
import { Observable } from 'rxjs/Rx';
import { Component ,EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
   import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
   import{MaskedTextBoxModule}from '@progress/kendo-angular-inputs';

import { AngularFire } from 'angularfire2';
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

@Input() item:InvoiceDetails;

@Output() cleared = new EventEmitter();
itemValues : Product;
isAdd = true;
products:Product[];
items:InvoiceDetails[];
details:string[];
totalAmount : number = 0;
totalBp:number = 0 ;
totalQty:number = 0;
CurrentDate = new Date();
newHeader:Invoice;
uid:string;
user:Profile;
isSave:boolean;
data:Product[];
show:boolean;
showII:boolean;
noAdd:boolean;
  
   public autoCorrect: boolean = true;
   public min: number = 1;
    public max: number = 99;
    public valueN: number = 1;

   public includeLiterals: boolean = false;
  public mask: string = "0000";

  clearValid(){
    this.show=false;
    this.showII=false;
  
  }
disableAdd(){
  this.noAdd=true;
}
enableAdd(qty){
  if( this.showII == false)
 { this.noAdd=false;}
 else{
   this.noAdd=true;
 }
}
codeCheck(input:string){
  let x;
x= this.products.findIndex(i=>input==i.productId);

  if(x > 0 || x == "")
  {
    this.show=false;  
  }
  else{
    this.show=true;
  }
}

stockCheck(id:string, qty:number){
  if(this.show==false)
  {let y;
  y=this.products.find(i=>id==i.productId).stock;
 
  if(y<qty){
    this.showII=true;
  }
  else{
    this.showII=false;
    this.noAdd=false;
  }
  }

}




    constructor(private sls:SlsService,
  private catalogeService:CatalogeService,
   private af:AngularFire,
  ){
   
}

  handleFilter(value) {
        this.data = this.products.filter(P => P.productId.toString()
                        .includes(value))
    }

 

  ngOnInit(){
     this.catalogeService.getProducts()
                    .subscribe(cat=>this.products=cat);     
     this.totalAmount=this.sls.getTotalAmount();
     this.totalBp=this.sls.getTotalBp();
     this.totalQty = this.sls.getTotalQty();
   
    
   
    }

  ngOnChanges(changes){
   
      if(changes.item.currentValue === null){
        this.item = {itemId:' ', qty:1};
       
      this.isSaveable();
      }
       else{this.isAdd = false;  
      
            this.isSaveable()
      }  
  }

    onSubmit(invoiceDetails:InvoiceDetails){
if(this.show==false || this.showII==false)
      {
        this.itemValues= this.products.find(i=>invoiceDetails.itemId==i.productId)
  
                 const newItem = new InvoiceDetails(
                                          invoiceDetails.ref = this.itemValues.$key,
                                          invoiceDetails.itemId,
                                          invoiceDetails.price =this.itemValues.price,
                                          invoiceDetails.bp = this.itemValues.bp,
                                          invoiceDetails.qty
                                          )   
                                           console.log('itemKey',newItem);
                              
            if(!this.isAdd){
             
              this.sls.editItem(this.item,newItem);
              this.totalAmount=this.sls.getTotalAmount();
              this.totalBp=this.sls.getTotalBp();
              this.totalQty = this.sls.getTotalQty();
            this.item = {itemId:"", qty:1};
              this.isSaveable();
            }
              else{
                this.item = newItem;
                this.sls.addItem(this.item)
                 this.totalAmount=this.sls.getTotalAmount();
                 this.totalBp=this.sls.getTotalBp();   
                 this.totalQty = this.sls.getTotalQty();
                 this.item = {itemId:"", qty:1};
                 this.isSaveable();
                  
              }
              console.log('save',this.isSaveable());
           
      } else{
       
      }
    }

 

onSave(addDate:Date,memberId:string,
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
              /*this.sls.getBalance()*/
             
              
            }

getDetailsItems(invoice){
  for(var i in invoice.invoiceDetails){
    this.details.push(i)
  }
}

   onDelete(){
      this.sls.deleteItem(this.item);     
       this.totalAmount=this.sls.getTotalAmount();
                 this.totalBp=this.sls.getTotalBp();   
                 this.totalQty = this.sls.getTotalQty();   
      this.onClear();
    }
    
    onClear(){
      this.cleared.emit(null)
      this.isAdd = true;
    }
    
emptyInvoice(){
  this.totalAmount = 0;
  this.totalQty = 0;
  this.totalBp = 0;
}

 isSaveable(){
    if(this.sls.getItems().length==0){
      this.isSave = true;
    }
    else{
      this.isSave=false;
    }
    return this.isSave
  }
     
}