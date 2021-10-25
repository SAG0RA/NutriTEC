import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private API:APIService,private router:Router) { }

  ngOnInit(): void {

  }

  getData(){
    this.API.GET('http://192.168.18.4/api/cliente')
    .subscribe(response =>{
      console.log(response)
    })
  }

  navToRegistroNutri(){
    this.router.navigate(['/registro/nutri'])
  }

  navToRegistroCliente(){
    this.router.navigate(['/registro/cliente'])
  }

  

}
