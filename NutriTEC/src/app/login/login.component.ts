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
  url_empleados = '/api/Empleado'
  url_cliente = '/api/cliente'
  lista_datos_recibidos:any = []
  lista_empleados:any = []
  lista_empleados_contrasenas:any = []
  correo:string;
  passw:string;

  constructor(private API:APIService,private router:Router) { }

  ngOnInit(): void {  //Crea una lista que toma todos los datos y los pasa a una lista que toma los correos
    this.API.GET(this.url_empleados)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        //console.log(this.lista_datos_recibidos)
        this.lista_empleados = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          this.lista_empleados.push(this.lista_datos_recibidos[i]['correo'])
          this.lista_empleados_contrasenas.push(this.lista_datos_recibidos[i]['passw'])
          //console.log(this.lista_empleados)
        }
      })

      console.log(this.lista_empleados_contrasenas)
  }

  Autenticar(){
    for(var i = 0; i < this.lista_empleados.length; i++){
      if(this.correo == this.lista_empleados[i] && this.passw == this.lista_empleados_contrasenas[i]){
        this.router.navigate(['/vista/admin'])
      }
      //else{
      //  alert("Datos incorrectos")
      //}
    }
  }

  navToRegistroNutri(){
    this.router.navigate(['/registro/nutri'])
  }

  navToRegistroCliente(){
    this.router.navigate(['/registro/cliente'])
  }



}
