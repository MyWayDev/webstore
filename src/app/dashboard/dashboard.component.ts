import { Observable } from 'rxjs/Rx';
import { SlsService } from '../services/sls.service';
import { SlsComponent } from '../sls/sls.component';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit } from '@angular/core';

import { AngularFire } from 'angularfire2';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {



  ngOnInit() {
          
  }
   
}
