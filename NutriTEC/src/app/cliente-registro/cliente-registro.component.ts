import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {
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
  csmcalorias:string;
  correo: string;
  contrasena: string;
  constructor() { }

  ngOnInit(): void {
  }

  Registrar(){
    const md5 = new Md5();
    const encrypt = md5.appendStr(this.contrasena).end();
    
  }
}
