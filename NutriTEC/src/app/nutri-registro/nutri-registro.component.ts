import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Md5 } from 'ts-md5/dist/md5';
import { AgregadoComponent } from '../agregado/agregado.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-nutri-registro',
  templateUrl: './nutri-registro.component.html',
  styleUrls: ['./nutri-registro.component.css']
})
export class NutriRegistroComponent implements OnInit {

  public lista_datos_recibidos: any = []
  private lista_usuarios: any = []
  public archivos: any = []

  url = 'api/nutri'

  fileSelected?: File;
  imageUrl?: string;

  edad:number
  data:any
  fecha_nacimiento:any

  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  peso: string;
  imc: string;
  direccion: string;
  tarjeta: string;
  correo: string;
  contrasena: string;

  selected_tipo:string = '';
  tipos:any = [
    'Semanal',
    'Mensual',
    'Anual'
  ]

  constructor(public dialog: MatDialog, private API: APIService,private sant: DomSanitizer) {
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
          console.log(this.lista_usuarios)
        }
      })

  }


  capturarImagen(event:any){
    this.fileSelected = event.target.files[0]
    this.archivos.push(this.fileSelected)
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
  }


  radioChangeHandler(event:any){
    this.selected_tipo = event.target.value;
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

    if (this.lista_usuarios.includes(this.correo) || !this.cedula || !this.nombre || !this.apellido1 || !this.apellido2 || !this.data.edad || !this.fecha_nacimiento || !this.peso || !this.imc || !this.direccion || !this.tarjeta || !this.correo || !this.contrasena) {
      this.dialog.open(AlertaComponent)
      console.log(this.lista_usuarios)
    } else {

      const md5 = new Md5();
      const encrypt = md5.appendStr(this.contrasena).end();

      var lista_datos =
      {
        IMC: this.imc,
        codigo:'13213',
        correo:this.correo,
        direccion: this.direccion,
        edad: this.data.edad,
        fecha_nac:this.fecha_nacimiento,
        foto: 'uwu',
        meta_calorica:[],
        n_cedula: this.cedula,
        nombre: this.nombre,
        p_apellido: this.apellido1,
        passw: encrypt,
        peso: this.peso,
        s_apellido: this.apellido2,
        tarjetacredito: this.tarjeta,
        tipo_cobro: this.selected_tipo
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
        console.log(this.lista_usuarios)
        console.log(response)
      })
      this.dialog.open(AgregadoComponent)
    }
  }
}
