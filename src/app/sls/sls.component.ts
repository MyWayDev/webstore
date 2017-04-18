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
    <!--ul class="list-group">
      <a  class="list-group-item"
          style="cursor: pointer" 
          *ngFor="let item of items" 
          (click)="onSelectItem(item)">
      {{item.itemId}} || {{item.price}} || {{item.bp}} || {{item.qty}}</a>
    </ul-->
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
