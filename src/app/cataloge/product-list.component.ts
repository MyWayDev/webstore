import { CatalogeService } from '../services/cataloge.service';
import { Product } from '../models/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`
          
              #search-input {
                padding-left: 43px;
                padding-right: 43px;
                border-radius: 23px;
                            }
            .errspan {
                float: left;
                margin-left: 15px;
                margin-top: -25px;
                position: relative;
                z-index: 2;
                color: gray;
                    }
          `]
})

export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[];
  product: Product = new Product();
  filtered: Product[];

  constructor(private catalogeService: CatalogeService) { }

  ngOnInit() {
    this.catalogeService.getProducts()
      .subscribe(items =>
        this.products = this.filtered = items);

  }

  search(search: string) {


    this.filtered = this.products
      .filter(item => parseInt(item.productId).toString()
        .includes(search)

      )

  }

}
