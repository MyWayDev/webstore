import { ordersRoutes } from './orders.routes';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../login/authguard';
import { productRoutes } from './product.routes';
import { ModuleWithProviders } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import {AppComponent} from '../app.component';
import { CatalogeComponent } from '../cataloge/cataloge.component';
import { SlsComponent } from '../sls/sls.component';
import { LoginComponent } from '../login/login.component';


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
        path:'login',
        component:LoginComponent
}
    
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);

/*canActivate:[AuthGuard]*/