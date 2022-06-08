import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any
  currentAcno:any
  db: any = {
    1000: { "acno": 1000, "username": "athu", "password": 1000, "balance": 5000,transaction:[] },
    1001: { "acno": 1001, "username": "ammu", "password": 1001, "balance": 5000,transaction:[] },
    1002: { "acno": 1002, "username": "anu", "password": 1002, "balance": 5000,transaction:[] }
  }



  constructor() {
     this.getDetails()
   }
  getDetails()
  {
    if(localStorage.getItem("database"))
    {
      this.db=JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("currentUser"))
    {
      this.currentUser=JSON.parse(localStorage.getItem("currentUser")||'')
  
    }
    if(localStorage.getItem("currentAcno"))
    {
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
  
    }

  }
  saveDetails()
  {
    if(this.db)
    {
      localStorage.setItem("database",JSON.stringify(this.db))
    }
    if(this.currentUser)
    {
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
    if(this.currentAcno)
    {
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }

  }
  login(acno: any, pswd: any) {
    var db = this.db
    if (acno in db) {
      if (pswd == db[acno]["password"]) {
        this.currentUser=db[acno]["username"]
        this.currentAcno=acno
        this.saveDetails()
        return true
      }
      else
        alert("incorrect password")
      return false

    }
    else
      alert("use does't exist")
    return false
  }
  //register
  register(username: any, acno: any, password: any,) {
    let db = this.db
    if (acno in db) {
      return false
    }
    else {
      db[acno] = {
        acno,
        password,
        username,
        "balance": 0,
        transaction:[]
      }
      this.saveDetails()
      return true
    }
  }
  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let db = this.db
    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] += amount
        db[acno].transaction.push({
          type:"credit",
          amount:amount
        })
        this.saveDetails()
        return db[acno]["balance"]
      }
      else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("use doesnot exist......")
      return false
    }

  }

  withdraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let db = this.db
    if (acno in db) {
      if (password == db[acno]["password"]) {
        if (db[acno]["balance"] > amount) {
          db[acno]["balance"] -= amount
          db[acno].transaction.push({
            type:"debit",
            amount:amount
          })
  
          this.saveDetails()
          return db[acno]["balance"]
        }
        else {
          alert("insufficient balnce")
          return false

        }
      }
      else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("use doesnot exist......")
      return false
    }

  }
getTransaction(acno:any)
{
  return this.db[acno].transaction
}




}
