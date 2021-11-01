import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Md5 } from 'ts-md5/dist/md5';
import { AgregadoComponent } from '../agregado/agregado.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-nutri-registro',
  templateUrl: './nutri-registro.component.html',
  styleUrls: ['./nutri-registro.component.css']
})
export class NutriRegistroComponent implements OnInit {

////////// Listas con los datos de NUTRICIONISTA en API /////////////
  lista_datos_recibidos: any = []
  lista_usuarios: any = []

////////// URLs Importantes, API e Imagenes /////////////
  url = 'api/nutri'
  url_image = '/assets/images/perfil.png'
  url_changeImage = ''

////////// Datos de los inputs /////////////
  edad: number
  data: any
  fecha_nacimiento: any

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

  selected_tipo: string = '';
  tipos: any = [
    'Semanal',
    'Mensual',
    'Anual'
  ]

  constructor(public dialog: MatDialog, private API: APIService) {
    this.data = {}
    this.data.edad = ''
  }

  ngOnInit(): void {
///////////////// GET de NUTRICIONISTAS al iniciar la pagina //////////////////
    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        //Vacia la lista para volverla a llenar luego
        this.lista_usuarios = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          // Rellena las listas con los datos del API 
          this.lista_usuarios.push(this.lista_datos_recibidos[i]['correo'])
        }
        console.log('Nutricionistas: ' + '[' + this.lista_usuarios + ']')
      })
  }

/**
 * Funcion encargada de subir la preview de la imagen en la pagina
 * @param event Evento realizado con input file
 */
  capturarImagen(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      this.url_changeImage = event.target.files[0]['name']
      console.log(this.url_changeImage)
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url_image = e.target.result;
      }
    }
  }

/**
 * Funcion encargada de cambiar los valores de [Semanal,Mensual y Anual]
 * @param event Evento realizado con radiobutton
 */
  radioChangeHandler(event: any) {
    this.selected_tipo = event.target.value;
  }

/**
 * Funcion encargada de obtener la edad segun la fecha de nacimiento
 * @param lbl Label que cambiara de numero segun el resultado
 */
  getEdad(lbl: any) {
    const timeDiff = Math.abs(Date.now() - new Date(this.fecha_nacimiento).getTime());
    this.data.edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    if (!this.data.edad) {
      alert('Registra bien tu fecha de nacimiento')
    } else {
      document.getElementById(lbl)!.innerHTML = "Edad: " + this.data.edad.toString();
    }

  }

/**
 * Funcion encargada de asignar un codigo al nutricionista
 * @param min 
 * @param max 
 * @returns 
 */
  random(min: any, max: any) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }


        ///////////////////////////////////
        ////////// REGISTRACION ///////////
        ///////////////////////////////////
/**
 *  // Funcion encargada de registrar al usuario medianto un post al API \\
 * Recorre las listas anteriormente rellenadas con el get para verificar
 * si el usuario ha sido registrado con anterioridad
 */
  Registrar() {
    if (this.lista_usuarios.includes(this.correo) || !this.cedula || !this.nombre || !this.apellido1 || !this.apellido2 || !this.data.edad || !this.fecha_nacimiento || !this.peso || !this.imc || !this.direccion || !this.tarjeta || !this.correo || !this.contrasena) {
      this.dialog.open(AlertaComponent)
      console.log(this.lista_usuarios)
    } else {

      /// Encriptacion por MD5 \\\
      const md5 = new Md5();
      const encrypt = md5.appendStr(this.contrasena).end();
      /////////////////////////////////////////////////////
      
      var lista_datos =
      {
        IMC: this.imc,
        codigo: 'generado',
        correo: this.correo,
        direccion: this.direccion,
        edad: this.data.edad,
        fecha_nac: this.fecha_nacimiento,
        foto: this.url_changeImage,
        meta_calorica: [],
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
            console.log(response)
          })
      })
      this.dialog.open(AgregadoComponent)
    }
  }
}
