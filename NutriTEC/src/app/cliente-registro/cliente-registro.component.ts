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
  url = '/api/cliente'

  edad:number
  data:any
  fecha_nacimiento:any

  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
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

  constructor(public dialog: MatDialog, private API: APIService) {
    this.data = {}
    this.data.edad = ''
   }

  ngOnInit(): void {

    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        this.lista_usuarios = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          this.lista_usuarios.push(this.lista_datos_recibidos[i]['correo'])
        }
      })
  }

  getEdad(lbl:any){
    const timeDiff =  Math.abs(Date.now() - new Date(this.fecha_nacimiento).getTime());
    this.data.edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    if(!this.data.edad){
      alert('Registra bien tu fecha de nacimiento')
    }else{
       document.getElementById(lbl)!.innerHTML = "Edad: " + this.data.edad.toString();
    }
    
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
        IMC: this.imc,
        caderas: this.caderas,
        cedula: this.cedula,
        cintura: this.cintura,
        correo: this.correo,
        cuello: this.cuello,
        edad: this.data.edad,
        fecha_nac: this.fecha_nacimiento,
        meta_calorica: [],
        nombre: this.nombre,
        p_apellido: this.apellido1,
        pais: this.pais,
        passw: encrypt,
        peso: this.peso,
        porc_grasa: this.grasa,
        porc_musculo: this.musculo,
        s_apellido: this.apellido2,

      }

      this.API.POST(this.url, lista_datos).subscribe(response => {

        this.API.GET(this.url)
          .subscribe(response => {
            this.lista_datos_recibidos = response
            console.log(this.lista_datos_recibidos)
            for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
              this.lista_usuarios.push(this.lista_datos_recibidos[i]['correo'])
            }
          })
        console.log(response)
      })
      console.log(this.lista_usuarios)

      this.dialog.open(AgregadoComponent)
    }
  }

}

