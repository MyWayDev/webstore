import { ProductDetailComponent } from '../cataloge/product-detail.component';
import { ProductStartComponent } from '../cataloge/product-start.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const productRoutes:Routes=[

    {path:'',component:ProductStartComponent},
    {path:':id',component:ProductDetailComponent}
];

