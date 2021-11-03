import { DataService } from './../data.service';
import { NutriRegistroComponent } from '../nutri-registro/nutri-registro.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url_nutricionistas = '/api/nutri'
  url_empleados = '/api/Empleado'
  url_cliente = '/api/cliente'
  lista_datos_recibidos: any = []
  correo: string;
  passw: string;


  ///////// EMPLEADOS //////////
  lista_empleados: any = []
  lista_empleados_contrasenas: any = []
  ///////// CLIENTES ////////////
  lista_clientes: any = []
  lista_clientes_contrasenas: any = []
  ///////// NUTRICIONISTAS ////////
  lista_nutris:any = []
  lista_nutris_contrasenas:any = []

  constructor(private API: APIService, private router: Router,private dataService:DataService) { }

  ngOnInit(): void {  //Crea una lista que toma todos los datos y los pasa a una lista que toma los correos
    this.API.GET(this.url_empleados)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        this.lista_empleados = []
        this.lista_empleados_contrasenas = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          this.lista_empleados.push(this.lista_datos_recibidos[i]['correo'])
          this.lista_empleados_contrasenas.push(this.lista_datos_recibidos[i]['passw'])
        }

      console.log('Empleados: ' + '['+ this.lista_empleados + ']')
      console.log('Empleados_passw: ' + '[' + this.lista_empleados_contrasenas + ']') 
      })

    this.API.GET(this.url_cliente)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        this.lista_clientes = []
        this.lista_clientes_contrasenas = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          this.lista_clientes.push(this.lista_datos_recibidos[i]['correo'])
          this.lista_clientes_contrasenas.push(this.lista_datos_recibidos[i]['passw'])
        }
      console.log('Clientes: ' + '[' + this.lista_clientes + ']')
      console.log('Clientes_passw: ' + '[' + this.lista_clientes_contrasenas + ']')
      })

      
    this.API.GET(this.url_nutricionistas)
    .subscribe(response => {
      this.lista_datos_recibidos = response
      console.log(this.lista_datos_recibidos)
      this.lista_nutris = []
      this.lista_nutris_contrasenas = []
      for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
        this.lista_nutris.push(this.lista_datos_recibidos[i]['correo'])
        this.lista_nutris_contrasenas.push(this.lista_datos_recibidos[i]['passw'])
      }

      console.log('Nutris: ' + '[' + this.lista_nutris + ']')
      console.log('Nutris_passw: ' + '[' + this.lista_nutris_contrasenas + ']')

    })



  }

  Autenticar() {
    const md5 = new Md5();
    const encrypt = md5.appendStr(this.passw).end();
    for (var i = 0; i < this.lista_empleados.length; i++) {
      if (this.correo == this.lista_empleados[i] && this.passw == this.lista_empleados_contrasenas[i]) {
        this.router.navigate(['/vista/admin'])
      }
    }
    for (var i = 0; i < this.lista_clientes.length; i++) {
      if (this.correo == this.lista_clientes[i] && encrypt == this.lista_clientes_contrasenas[i]) {
        this.router.navigate(['vista/cliente'])
      }
    }
    for (var i = 0; i < this.lista_nutris.length; i++) {
      if (this.correo == this.lista_nutris[i] && encrypt == this.lista_nutris_contrasenas[i]) {
        this.router.navigate(['vista/nutri'])
      }
    }
    localStorage.setItem('user',this.correo)
    const correo_almacenado = localStorage.getItem('user')
    this.dataService.correo = correo_almacenado
  }

  navToRegistroNutri() {
    this.router.navigate(['/registro/nutri'])
  }

  navToRegistroCliente() {
    this.router.navigate(['/registro/cliente'])
  }



}
