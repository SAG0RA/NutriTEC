import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Md5 } from 'ts-md5/dist/md5';
import { AgregadoComponent } from '../agregado/agregado.component';
@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {

  public lista_datos_recibidos: any = []
  private lista_usuarios: any = []
  url = 'https://6175c7c203178d00173da9e1.mockapi.io/clientes'

  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  edad: string;
  fecha_nacimiento: string;
  peso: string;
  imc: string;
  pais: string;
  cuello: string;
  cintura: string;
  caderas: string;
  musculo: string;
  grasa: string;
  csmcalorias: string;
  correo: string;
  contrasena: string;
  constructor(public dialog: MatDialog, private API: APIService) { }

  ngOnInit(): void {

    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        this.lista_usuarios = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          this.lista_usuarios.push(this.lista_datos_recibidos[i]['correo'])
          console.log(this.lista_usuarios)
        }
      })
  }

  Registrar() {

    if (this.lista_usuarios.includes(this.correo) || !this.cedula || !this.nombre || !this.apellido1 || !this.apellido2 || !this.edad || !this.fecha_nacimiento || !this.peso || !this.imc || !this.correo || !this.contrasena) {
      this.dialog.open(AlertaComponent)
      console.log(this.lista_usuarios)
    } else {

      const md5 = new Md5();
      const encrypt = md5.appendStr(this.contrasena).end();

      var lista_datos =
      {
        cedula: this.cedula,
        nombre: this.nombre,
        apellido1: this.apellido1,
        apellido2: this.apellido2,
        edad: this.edad,
        fecha_nacimiento: this.fecha_nacimiento,
        peso: this.peso,
        imc: this.imc,
        pais: this.pais,
        cuello:this.cuello,
        cintura:this.cintura,
        caderas:this.caderas,
        musculo:this.musculo,
        grasa:this.grasa,
        csmcalorias:this.csmcalorias,
        correo: this.correo,
        contrasena: encrypt
      }

      this.API.POST(this.url, lista_datos).subscribe(response => {

        this.API.GET(this.url)
          .subscribe(response => {
            this.lista_datos_recibidos = response
            console.log(this.lista_datos_recibidos)
            for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
              this.lista_usuarios.push(this.lista_datos_recibidos[i]['correo'])
              console.log(this.lista_usuarios)
            }
          })
        console.log(response)
      })

      this.dialog.open(AgregadoComponent)
    }
  }

}

