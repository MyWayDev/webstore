import { InvoiceService } from './services/invoice.service';
import { AuthGuard } from './login/authguard';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './routes/app.routes';

import { MenuComponent } from './shared/menu/menu.component';
import { AppComponent } from './app.component';

import { AngularFireModule} from 'angularfire2/index';
import {firebaseConfig, authConfig} from '../environments/firebase.config';


import { CatalogeComponent } from './cataloge/cataloge.component';
import { ProductItemComponent } from './cataloge/product-item.component';
import { ProductListComponent } from './cataloge/product-list.component';
import { CatalogeService} from './services/cataloge.service';
import { SlsService } from './services/sls.service';
import { AuthService } from './services/auth.service';
import { ProductBindComponent } from './cataloge/product-bind.component';
import { ProductDetailComponent } from './cataloge/product-detail.component';
import { ProductStartComponent } from './cataloge/product-start.component';
import { SlsComponent } from './sls/sls.component';
import { SlsAddComponent } from './sls/sls-add.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartModule,ButtonModule,InputTextModule,AutoCompleteModule,
  DropdownModule,SelectItem,DataTableModule,SharedModule,Header,Footer} from 'primeng/primeng';
import { DashboardBindComponent } from './dashboard/dashboard-bind.component';
import { DashboardItemComponent } from './dashboard/dashboard-item.component';
import { DashboardDetailComponent } from './dashboard/dashboard-detail.component';
import { DashboardListComponent } from './dashboard/dashboard-list.component';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CatalogeComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductBindComponent,
    ProductDetailComponent,
    ProductStartComponent,
    SlsComponent,
    SlsAddComponent,
    LoginComponent,
    DashboardComponent,
    DashboardBindComponent,
    DashboardItemComponent,
    DashboardDetailComponent,
    DashboardListComponent

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    ChartModule,
    InputTextModule,
    AutoCompleteModule,
    DropdownModule,
    DataTableModule,
    SharedModule,
    ReactiveFormsModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig,authConfig)
  
  ],
  providers: [CatalogeService,SlsService,InvoiceService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
