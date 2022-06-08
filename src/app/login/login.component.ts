import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="perfect banking partner"
  accno="Account number please"
  acno=""
  pswd=""
  //database
  // bd:any={
  //   1000:{"acno":1000,"username":"athu","password":1000,"balance":5000},
  //   1001:{"acno":1001,"username":"athu","password":1001,"balance":5000},
  //   1002:{"acno":1002,"username":"athu","password":1002,"balance":5000}
  //   }
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }
  

  ngOnInit(): void {
  }
  //user defined function=>we can change automatically consist the passwrd and accno 
  accnochange(event:any)
  {
    this.acno=event.target.value
    console.log(this.acno);
    
  }
  pswdchange(event:any)
  {
    this.pswd=event.target.value
    console.log(this.pswd);
  }
// to check the valid accno and passwrd
  login(){
    var acno= this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
    if(this.loginForm.valid)
    {
      const result=this.ds.login(acno,pswd)
      if(result)
      {
        alert("login successfully")
        this.router.navigateByUrl('home')
      }
  
    }
    else
    {
      alert("invalid")
    }
  }
}
