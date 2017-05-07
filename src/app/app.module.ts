
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
import { StockService} from './services/stock.service';
import { ProductBindComponent } from './cataloge/product-bind.component';
import { ProductDetailComponent } from './cataloge/product-detail.component';
import { ProductStartComponent } from './cataloge/product-start.component';
import { SlsComponent } from './sls/sls.component';
import { SlsAddComponent } from './sls/sls-add.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardBindComponent } from './dashboard/dashboard-bind.component';
import { DashboardItemComponent } from './dashboard/dashboard-item.component';
import { DashboardDetailComponent } from './dashboard/dashboard-detail.component';
import { DashboardListComponent } from './dashboard/dashboard-list.component';
// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
 import { InputsModule } from '@progress/kendo-angular-inputs';
import { PopupModule } from '@progress/kendo-angular-popup';
import { UploadModule } from '@progress/kendo-angular-upload';
import { StockComponent } from './stock/stock.component';
import { BackendComponent } from './backend/backend.component';




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
    DashboardListComponent,
    StockComponent,
    BackendComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DropDownsModule,
    GridModule,
    InputsModule,
    ReactiveFormsModule,
    routes,
    PopupModule,
    UploadModule,

    AngularFireModule.initializeApp(firebaseConfig,authConfig)
  
  ],
  providers: [CatalogeService,SlsService,InvoiceService,AuthService,AuthGuard,StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
