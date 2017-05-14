import { StockService } from '../services/stock.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product';
import { CatalogeService } from '../services/cataloge.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from '../models/profile';
import { SlsService } from '../services/sls.service';



const formGroup = dataItem => new FormGroup({
    '$key': new FormControl(dataItem.$key),
    'productId': new FormControl(dataItem.productId),
    'name': new FormControl(dataItem.name, Validators.required),
    'price': new FormControl(dataItem.price),
    'stock': new FormControl(dataItem.stock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,4}')])),
   
});

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
   public gridData: any[];
   
    public formGroup: FormGroup;
    private editedRowIndex: number;
    filtered: Product[];
      prods:Product[];
      uid:string;
      user:Profile;

    constructor(private catalogeService: CatalogeService
               ,private authService:AuthService,private sls:SlsService,private stockService:StockService) {
        this.catalogeService.getProducts()
                    .subscribe(cat=>this.prods= this.filtered =cat);  
                    console.log('prods',this.prods)
                    this.uid=this.authService.authInfo$.value.$uid;
    }

    public ngOnInit() {
        this.gridData = this.prods;
        this.user=this.sls.getUid(this.uid).subscribe(uid=>this.user=uid);
    }

 search(search:string){
   
  
                        this.filtered=this.prods
                        .filter(item=>parseInt(item.productId).toString()
                        .includes(search)
                       
                        )
                       console.log('searchInput',search)
                      }



    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);

        this.formGroup = formGroup(dataItem);

        this.editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
        const product = formGroup.value;
      this.stockService.updateStock(product.$key,product)
      console.log('saved product',product)
       /* this.service.save(product, isNew);*/

        sender.closeRow(rowIndex);
    }

    public removeHandler({ dataItem }): void {
        /*this.service.remove(dataItem);*/
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }
}
