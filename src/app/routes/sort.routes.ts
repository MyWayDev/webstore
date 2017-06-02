import { OrdersortDetailComponent } from '../ordersort/ordersort-detail.component';

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const sortRoutes:Routes=[

    {path:':id',component:OrdersortDetailComponent},
    {path:'sales',component:OrdersortDetailComponent}
];