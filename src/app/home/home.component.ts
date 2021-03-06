import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  acno=""
  pswd=""
  amount=""
  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })
  acno1=""
  pswd1=""
  amount1=""

  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })
  user:any
constructor(private ds:DataService,private fb:FormBuilder) {
  this.user=this.ds.currentUser

 }
  ngOnInit(): void {
  }
deposit()
{
  var acno=this.depositForm.value.acno
  var pswd=this.depositForm.value.pswd
  var amount=this.depositForm.value.amount
  if(this.depositForm.valid)
  {
    const result=this.ds.deposit(acno,pswd,amount)
    if(result)
    {
      alert(amount+" depositted successfully and new balance is: "+result)
    }
  
  }
  else
  {
    alert("invalid")
  }
}  
withdraw()
{
  var acno=this.withdrawForm.value.acno1
  var pswd=this.withdrawForm.value.pswd1
  var amount=this.withdrawForm.value.amount1
  if(this.withdrawForm.valid)
 {
  const result=this.ds.withdraw(acno,pswd,amount)
  if(result)
  
  {
    alert(amount+" debitted successfully and new balance is: "+result)
  }

}
else{
  alert("invalid")
}

}
}