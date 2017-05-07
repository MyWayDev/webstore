import { NgModel } from '@angular/forms/src/directives';
import { CatalogeService } from '../services/cataloge.service';
import { InvoiceDetails } from '../models/invoice-details';
import { Product } from '../models/product';
import { SlsService } from '../services/sls.service';
import { Component, OnInit, style, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sls',
  template: `
   <div class="row">
  <!--"-->
  <div class="col-xs-10">
    <app-sls-add [item]="selectedItem" 
                (cleared)="onCleared()">
    </app-sls-add>
    <hr>
 
    <h5>{{desc}}</h5>
    <div class="bs-component">
<table class="table table-striped table-hover">
    <thead>
      <tr class="info">
          <th style="width:100px;">ID</th>
          <th style="width:80px;" >Price</th>
            <th style="width:80px;">qty</th>
         
          <th style="width:80px;">bp</th>    
          <th style="width:120px;">Total</th>
           <th style="width:110px;">Total Bp</th>
      </tr>
    </thead>
      <tbody>
          <tr  *ngFor="let item of items" (click)="onSelectItem(item)">
         
            <th scope="row">{{item.itemId}}</th>
            <td >{{item.price}}</td>
            <td>{{item.qty}}</td>
           
            <td>{{item.bp}}</td>
            <td>{{item.price*item.qty}}</td>
             <td>{{item.bp*item.qty}}</td>
             
    
          </tr>
      </tbody>
    </table>
  </div>
  
 </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-xs-12">
    		<div class="invoice-title">
    			<h2>Invoice</h2><h3 class="pull-right">Order # 12345</h3>
    		</div>
    		<hr>
    		<div class="row">
    			<div class="col-xs-6">
    				<address>
    				<strong>Billed To:</strong><br>
    					John Smith<br>
    					1234 Main<br>
    					Apt. 4B<br>
    					Springfield, ST 54321
    				</address>
    			</div>
    			<div class="col-xs-6 text-right">
    				<address>
        			<strong>Shipped To:</strong><br>
    					Jane Smith<br>
    					1234 Main<br>
    					Apt. 4B<br>
    					Springfield, ST 54321
    				</address>
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-xs-6">
    				<address>
    					<strong>Payment Method:</strong><br>
    					Visa ending **** 4242<br>
    					jsmith@email.com
    				</address>
    			</div>
    			<div class="col-xs-6 text-right">
    				<address>
    					<strong>Order Date:</strong><br>
    					March 7, 2014<br><br>
    				</address>
    			</div>
    		</div>
    	</div>
    </div>
    
    <div class="row">
    	<div class="col-md-12">
    		<div class="panel panel-default">
    			<div class="panel-heading">
    				<h3 class="panel-title"><strong>Order summary</strong></h3>
    			</div>
    			<div class="panel-body">
    				<div class="table-responsive">
    					<table class="table table-condensed">
    						<thead>
                                <tr>
        							<td><strong>Item</strong></td>
        							<td class="text-center"><strong>Price</strong></td>
        							<td class="text-center"><strong>Quantity</strong></td>
        							<td class="text-right"><strong>Totals</strong></td>
                                </tr>
    						</thead>
    						<tbody>
    							<!-- foreach ($order->lineItems as $line) or some such thing here -->
    							<tr>
    								<td>BS-200</td>
    								<td class="text-center">$10.99</td>
    								<td class="text-center">1</td>
    								<td class="text-right">$10.99</td>
    							</tr>
                                <tr>
        							<td>BS-400</td>
    								<td class="text-center">$20.00</td>
    								<td class="text-center">3</td>
    								<td class="text-right">$60.00</td>
    							</tr>
                                <tr>
            						<td>BS-1000</td>
    								<td class="text-center">$600.00</td>
    								<td class="text-center">1</td>
    								<td class="text-right">$600.00</td>
    							</tr>
    							<tr>
    								<td class="thick-line"></td>
    								<td class="thick-line"></td>
    								<td class="thick-line text-center"><strong>Subtotal</strong></td>
    								<td class="thick-line text-right">$670.99</td>
    							</tr>
    							<tr>
    								<td class="no-line"></td>
    								<td class="no-line"></td>
    								<td class="no-line text-center"><strong>Shipping</strong></td>
    								<td class="no-line text-right">$15</td>
    							</tr>
    							<tr>
    								<td class="no-line"></td>
    								<td class="no-line"></td>
    								<td class="no-line text-center"><strong>Total</strong></td>
    								<td class="no-line text-right">$685.99</td>
    							</tr>
    						</tbody>
    					</table>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
</div>
  `,
  styles: []
})
export class SlsComponent implements OnInit {

  items:InvoiceDetails[]=[];
  selectedItem:InvoiceDetails = null;
  products:Product[];
  desc:string;
  itemImg:Product;
 
  constructor(private catalogeService:CatalogeService ,private sls:SlsService) {}

  ngOnInit() {
      this.catalogeService.getProducts()
                    .subscribe(cat=>this.products=cat);   

    this.items = this.sls.getItems();
    console.log('getItems',this.items)  
  }
 
  onSelectItem(item:InvoiceDetails){
    this.selectedItem=item;
  }
  


  onCleared(){
    this.selectedItem = null;
  }

          
}