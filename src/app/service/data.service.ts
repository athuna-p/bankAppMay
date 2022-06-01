import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db: any = {
    1000: { "acno": 1000, "username": "athu", "password": 1000, "balance": 5000 },
    1001: { "acno": 1001, "username": "athu", "password": 1001, "balance": 5000 },
    1002: { "acno": 1002, "username": "athu", "password": 1002, "balance": 5000 }
  }



  constructor() { }
  login(acno: any, pswd: any) {
    var db = this.db
    if (acno in db) {
      if (pswd == db[acno]["password"]) {
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
        "balance": 0
      }
      return true
    }
  }
  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let db = this.db
    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] += amount
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





}
