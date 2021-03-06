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
                (cleared)="onCleared()"
                 
                
                >
               
    </app-sls-add>
  
    <!--div class="bs-component">
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
</div-->
<div class="container">
  
    
    <div class="row">
    	<div class="col-xs-12">
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
                      <td class="text-center"><strong>BP</strong></td>
        							<td class="text-center"><strong>Quantity</strong></td>
                      <td class="text-center"><strong>Total Bp</strong></td>
        							<td class="text-right"><strong>Totals</strong></td>
                                </tr>
    						</thead>
    						<tbody>
    							
    							<tr #grid *ngFor="let item of items" (click)="onSelectItem(item)"
                    (click)="grid.style='background-color:pink;'"
                    
                  (mouseleave)="grid.style='background-color:white;'"
                

                  
                
                  
                  >
    								<td><strong>{{item.itemId}}</strong></td>
    								<td class="text-center">{{item.price}}</td>
                    <td class="text-center">{{item.bp}}</td>
    								<td class="text-center">{{item.qty}}</td>
                    	<td class="text-center">{{item.bp*item.qty}}</td>
    								<td class="text-right">{{item.price*item.qty}}</td>
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
  styleStatus:boolean=false;
  isAdded:boolean;
 
  constructor(private catalogeService:CatalogeService ,private sls:SlsService) {}

  ngOnInit() {
      this.catalogeService.getProducts()
                    .subscribe(cat=>this.products=cat);   

    this.items = this.sls.getItems();
    console.log('getItems',this.items)  
  }
 
  onSelectItem(item:InvoiceDetails){
    this.selectedItem=item;
    this.styleStatus=true;

  }
  


  onCleared(){
    this.selectedItem = null;
  
  }

          
}