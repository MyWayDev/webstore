
import { InvoiceDetails } from './invoice-details';

export class Invoice {
   
    constructor(
public $key?:string,
public addDate?:Date,
public uid?:string,
public memberId?:string,
public totalQty?:number,
public totalBp?:number,
public totalAmount?:number,
public depositNumber?:string,
public depositImg?:string,
public pending?:boolean,
public checked?:boolean,
public invoiceDetails?:InvoiceDetails[]

    ){}

    static fromJsonInvoice({$key,addDate,uid,memberId,
                        totalQty,totalBp,totalAmount,
                        depositNumber,depositImg,pending,checked,
                        invoiceDetails
                    }):Invoice{
                         return new Invoice(
                        $key,addDate,uid,memberId,
                        totalQty,totalBp,totalAmount,
                        depositNumber,depositImg,pending,checked,
                        invoiceDetails
                    );
                 }
   static fromJsonInvoiceList(invoiceList:any[]):Invoice[]{
       return invoiceList.map(Invoice.fromJsonInvoice);
   }              
                   
}

