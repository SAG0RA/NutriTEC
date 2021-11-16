import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { APIService } from '../api.service';
import { DataService } from './../data.service';



export interface Registro_PesoElement {
  Id: string
  cliente_cedula: string
  fecha_del_registro: string
  peso: string
  IMC: string
  cintura: string
  cuello: string
  caderas: string
  porc_musculo:string
  porc_grasa:string
}

export interface ProductoElement {
  codigo_barras: string
  descripcion: string
  energia: string
  grasa: string
  sodio : string
  carbohidratos : string
  proteina : string
  vitaminas : string
  calcio : string
  hierro : string
}


const PESO_DATA: Registro_PesoElement[] = [
];

const PRODUCTO_DATA: ProductoElement[] = [
];


@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.css']
})
export class VistaClienteComponent implements OnInit {

  correo: any = localStorage.getItem('user')

  displayedColumnsPeso: string[] =
  ['fecha_del_registro', 'peso', 'IMC', 'cintura', 'cuello', 'caderas', 'porc_musculo', 'porc_grasa'];

  displayedColumnsProductos: string[] =
  ['codigo_barras', 'descripcion', 'porcion', 'energia', 'grasa', 'sodio', 'carbohidratos', 'proteina' , 'vitaminas' , 'calcio' , 'hierro'];

  dataSourcePeso = PESO_DATA;
  dataSourceProductos = PRODUCTO_DATA;

  @ViewChild('pesos') table: MatTable<Registro_PesoElement>;
  @ViewChild('productos') productos: MatTable<ProductoElement>;

  date = new Date().toISOString().split('T')[0]
  senddate = new Date().toLocaleDateString();

  ///////////// VALORES PARA LOS INPUTS ////////////////////////////////
  cliente_cedula: any
  fecha_del_registro: any = this.date

  peso: string
  imc: string
  cintura: string
  cuello: string
  caderas: string
  porc_musculo: string
  porc_grasa: string

/////////////////// URLS Y VALORES PARA LOS GETS /////////////////////////
  urlpeso = '/api/cliente/registro_peso'
  urlinsertpeso = 'api/registro_peso'
  url_cliente = '/api/cliente'
  url_productosDisponibles = '/api/producto/productosDisponibles'

  lista_registropeso: any = [];
  lista_datos_recibidos_peso : any = []
  lista_productos : any = []
  lista_datos_recibidos_cliente : any = []

  constructor(private API: APIService, public dataService: DataService) {}



  ngOnInit(): void {

    console.log (this.correo)
    localStorage.setItem('user', this.dataService.correo);

    this.API.GET(this.url_cliente)
    .subscribe(response => {
      this.lista_datos_recibidos_cliente = response
      console.log (this.lista_datos_recibidos_cliente)
      this.filtro_peso(this.correo)

    this.API.GET(this.urlpeso + '/' + this.cliente_cedula)
    .subscribe(response => {
      PESO_DATA.length = 0
      this.lista_registropeso = response
      console.log(this.lista_registropeso)
      //Vacia la lista para volverla a llenar luego
      for (var i = 0; i < this.lista_registropeso.length; i++) {
      // Rellena las listas con los datos del API con codigo de barras
      PESO_DATA.push(this.lista_registropeso[i])
      }
      this.table.renderRows()
      })
    })

    this.API.GET(this.url_productosDisponibles)
    .subscribe(response => {
      PRODUCTO_DATA.length = 0
      this.lista_productos = response
      console.log(this.lista_productos)
      //Vacia la lista para volverla a llenar luego
      for (var i = 0; i < this.lista_productos.length; i++) {
      // Rellena las listas con los datos del API con codigo de barras
      PESO_DATA.push(this.lista_productos[i])
      }
      this.productos.renderRows()
      })

  }

  agregarPeso() {
    if (!this.peso || !this.imc || !this.cintura || !this.cuello || !this.caderas ||
      !this.porc_musculo || !this.porc_grasa) {
      alert("Error al registrar peso")
    }
    else {

      var lista_elementos = {
        cliente_cedula: this.cliente_cedula,
        fecha_del_registro : this.date,
        peso: this.peso,
        IMC: this.imc,
        cintura: this.cintura,
        cuello: this.cuello,
        caderas: this.caderas,
        porc_musculo: this.porc_musculo,
        porc_grasa: this.porc_grasa,
      }

      //PRODUCT_DATA.push(lista_elementos)
      //this.table.renderRows();

      this.API.POST(this.urlinsertpeso, lista_elementos).subscribe(response => {this.API.GET(this.urlpeso + '/' + this.cliente_cedula)
      .subscribe(response => {
        PESO_DATA.length = 0
        this.lista_registropeso = response
        console.log(this.lista_registropeso)
        //Vacia la lista para volverla a llenar luego
        for (var i = 0; i < this.lista_registropeso.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          PESO_DATA.push(this.lista_registropeso[i])

          this.table.renderRows();
          }
        })
      })
    }
  }

  filtro_peso(correo: any) {
    var filtro = this.lista_datos_recibidos_cliente.filter(function (el: any) {
      return el.correo == correo
    })
    console.log(filtro)
    this.cliente_cedula = filtro[0]['cedula']

    console.log(this.cliente_cedula)
  }

}
