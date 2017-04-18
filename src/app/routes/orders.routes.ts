import { DashboardDetailComponent } from '../dashboard/dashboard-detail.component';
import { ProductStartComponent } from '../cataloge/product-start.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ordersRoutes:Routes=[

    {path:'',component:ProductStartComponent},
    {path:':id',component:DashboardDetailComponent}
];