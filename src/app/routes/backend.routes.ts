import { BackendDetailComponent } from '../backend/backend-detail.component';
import { ProductStartComponent } from '../cataloge/product-start.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const backendRoutes:Routes=[

   
    {path:':id',component:BackendDetailComponent}
];