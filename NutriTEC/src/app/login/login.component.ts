import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  url_nutricionistas = '/api/nutri'

  constructor(private API:APIService,private router:Router) { }

  ngOnInit(): void {


  }


  navToRegistroNutri(){
    this.router.navigate(['/registro/nutri'])
  }

  navToRegistroCliente(){
    this.router.navigate(['/registro/cliente'])
  }

  

}
