import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form:FormGroup;

  constructor(private fb:FormBuilder, 
              private authService:AuthService,
              private router:Router)
               {
                  this.form = this.fb.group({
                  email:['',Validators.required],
                  password:['',Validators.required]
    })

   }

  ngOnInit() {
  }
login(){
const formValue = this.form.value;
              this.authService
              .login(formValue.email,formValue.password)
              .subscribe(
                  ()=>this.router.navigate(['/cataloge']),
                  alert

);
}
}

    
