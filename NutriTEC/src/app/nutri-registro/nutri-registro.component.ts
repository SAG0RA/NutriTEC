import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { AlertaNutriComponent } from '../alerta-nutri/alerta-nutri.component';

@Component({
  selector: 'app-nutri-registro',
  templateUrl: './nutri-registro.component.html',
  styleUrls: ['./nutri-registro.component.css']
})
export class NutriRegistroComponent implements OnInit {

  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  edad: string;
  fecha_nacimiento: string;
  peso: string;
  imc: string;
  direccion: string;
  tarjeta: string;
  correo: string;
  contrasena: string;

  tipo_cobro:string;
  cobros: string[]= ['Anual','Mensual','Semanal']

  constructor(public dialog: MatDialog, private API: APIService) { }

  ngOnInit(): void {
  }


  Registrar() {
    console.log(this.tipo_cobro)
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
      direccion: this.direccion,
      tarjeta: this.tarjeta,
      tipo_cobro: this.tipo_cobro,
      correo: this.correo,
      contrasena: this.contrasena
    }

    if (!this.cedula || !this.nombre || !this.apellido1 || !this.apellido2 || !this.edad || !this.fecha_nacimiento || !this.peso || !this.imc || !this.direccion || !this.tarjeta) {
       this.dialog.open(AlertaNutriComponent)
    } else {
      this.API.POST('https://6175c7c203178d00173da9e1.mockapi.io/nutricionistas', lista_datos).subscribe(response => {
        console.log(response)
      })
    }
  }

}
