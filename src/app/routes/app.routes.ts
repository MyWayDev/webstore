import { ordersRoutes } from './orders.routes';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../login/authguard';
import { productRoutes } from './product.routes';
import { ModuleWithProviders } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { CatalogeComponent } from '../cataloge/cataloge.component';
import { SlsComponent } from '../sls/sls.component';
import { StockComponent } from '../stock/stock.component'
import { LoginComponent } from '../login/login.component';
import { BackendComponent } from '../backend/backend.component';
import { backendRoutes } from './backend.routes';
import { sortRoutes } from './sort.routes';
import { OrderComponent } from'../order/order.component';
import { OrdersortComponent } from '../ordersort/ordersort.component';


export const router:Routes = [

    { 
        path:'',
        redirectTo:'/cataloge',
        pathMatch:'full',
        
    },
    { 
        path:'cataloge', 
        component:CatalogeComponent,
        children:productRoutes,
         canActivate:[AuthGuard]
        
      
    },
        { 
        path:'order', 
        component:OrderComponent,
        canActivate:[AuthGuard]
        
    },
    { 
        path:'shopping-list', 
        component:SlsComponent,
        canActivate:[AuthGuard]
    },
      { 
        path:'dashboard', 
        component:DashboardComponent,
        children:ordersRoutes,
         canActivate:[AuthGuard]
    },
  
       { 
        path:'stock', 
        component:StockComponent,
        canActivate:[AuthGuard]
    },
       { 
        path:'backend', 
        component:BackendComponent,
        children:backendRoutes,
         canActivate:[AuthGuard]
    },
    {
        path:'ordersort',
        component:OrdersortComponent,
        children:sortRoutes,
        canActivate:[AuthGuard]

    },
    { 
        path:'login',
        component:LoginComponent
}
    
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);

/*canActivate:[AuthGuard]*/