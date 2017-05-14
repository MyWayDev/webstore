import { ordersRoutes } from './orders.routes';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../login/authguard';
import { productRoutes } from './product.routes';
import { ModuleWithProviders } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import {AppComponent} from '../app.component';
import { CatalogeComponent } from '../cataloge/cataloge.component';
import { SlsComponent } from '../sls/sls.component';
import {StockComponent} from '../stock/stock.component'
import { LoginComponent } from '../login/login.component';
import {BackendComponent} from '../backend/backend.component';
import {backendRoutes} from './backend.routes';


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
        path:'login',
        component:LoginComponent
}
    
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);

/*canActivate:[AuthGuard]*/