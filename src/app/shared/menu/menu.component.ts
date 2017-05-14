import { SlsService } from '../../services/sls.service';
import { AuthInfo } from '../../login/authinfo';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
authInfo:AuthInfo;


  constructor(private authService:AuthService,private sls:SlsService) {

  
    
   }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo=>this.authInfo=authInfo);
  
    
  }
logOut(){
  this.authService.logOut();
}
}
