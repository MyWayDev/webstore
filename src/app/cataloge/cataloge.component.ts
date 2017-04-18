import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cataloge',
  template: `<div class="row">
                <div class="col-md-5">
                  <app-product-list></app-product-list>
                </div>
                <div class="col-md-7">
                  <router-outlet></router-outlet>
                </div>
              </div>`,
  styles: [``]
})

export class CatalogeComponent implements OnInit {

  constructor(){}

  ngOnInit(){}

}
