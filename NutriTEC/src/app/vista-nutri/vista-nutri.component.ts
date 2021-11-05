import { DataService } from './../data.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { APIService } from '../api.service';


export interface ProductoElement {
  calcio: string
  carbohidratos: string
  codigo_barras: string
  descripcion: string
  energia: string
  grasa: string
  hierro: string
  lista_espera: any
  nutri_correo:string
  nutri_cedula:string
  nutricionista:string
  porcion: string
  proteina: string
  sodio: string
  vitaminas: string

}

export interface ClienteElement{

}

const ELEMENT_DATA: ProductoElement[] = [
];

@Component({
  selector: 'app-vista-nutri',
  templateUrl: './vista-nutri.component.html',
  styleUrls: ['./vista-nutri.component.css'],
})
export class VistaNutriComponent implements OnInit {
  @Input() nombre_usuario: string = 'usuario'

   /////////////////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////////// GESTION DE PRODUCTOS ////////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////// Listas con los datos de PRODUCTOS en API /////////////
  url = '/api/producto'
  url_nutri = '/api/nutri'
  lista_datos_recibidos: any = []
  lista_productos: any = []


   ////////// Listas con los datos de CLIENTES en API /////////////
   url_cliente = '/api/cliente'
   lista_datos_recibidos_cliente:any = []

  lista_productosxusuario = []
  ////////// Gestion de Tabla de productos /////////////
  displayedColumns: string[] =
    ['codigo_barras', 'descripcion', 'porcion', 'energia', 'grasa', 'proteina', 'sodio', 'carbohidratos', 'calcio', 'hierro', 'vitaminas', 'estado', 'actions'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable) table: MatTable<ProductoElement>;

  ////////// Datos de los inputs /////////////
  estado = 0;
  correo: any = localStorage.getItem('user')

  codigo_barras: string
  descripcion: string
  porcion: string
  energia: string
  grasa: string
  proteina: string
  sodio: string
  carbohidratos: string
  hierro: string
  calcio: string
  vitaminas: string

  constructor(private API: APIService, public dataService: DataService) { }
  ngOnInit(): void {
    localStorage.setItem('user', this.dataService.correo);
    console.log(this.correo)
    ///////////////// GET de PRODUCTOS al iniciar la pagina //////////////////
    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        //Vacia la lista para volverla a llenar luego
        this.lista_productos = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          this.lista_productos.push(this.lista_datos_recibidos[i]['codigo_barras'])
        }
        console.log('Productos: ' + '[' + this.lista_productos + ']')
        this.filtrado(this.correo)
       // this.table.renderRows()
      })

      this.API.GET(this.url_cliente)
      .subscribe(response => {
        this.lista_datos_recibidos_cliente = response
        console.log(this.lista_datos_recibidos_cliente)
      })
  }

  eliminarProducto(row: any) {
    this.API.DELETE(this.url + '/' + row.codigo_barras).subscribe(() => console.log("Producto eliminado"))

    this.dataSource.splice(row,1);
    this.table.renderRows();

    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        //Vacia la lista para volverla a llenar luego
        this.lista_productos = []
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          this.lista_productos.push(this.lista_datos_recibidos[i]['codigo_barras'])
        }
        console.log('Productos: ' + '[' + this.lista_productos + ']')

      })
  }

  filtrado(correo: any) {
    ELEMENT_DATA.length = 0
    console.log(this.lista_datos_recibidos)
    //Filtra los productos segun el usuario ingresado
    var filtro = this.lista_datos_recibidos.filter(function (el: any) {
      return el.nutri_correo == correo
    })
    console.log(filtro)

    for (var i = 0; i < filtro.length; i++) {
      ELEMENT_DATA.push(filtro[i])
    }

    this.table.renderRows()
  }


  agregarProducto() {

    if (this.lista_productos.includes(this.codigo_barras) || ELEMENT_DATA.some(e => e.codigo_barras === this.codigo_barras) || !this.codigo_barras || !this.descripcion || !this.porcion || !this.energia || !this.grasa ||
      !this.proteina || !this.sodio || !this.carbohidratos || !this.hierro || !this.calcio || !this.vitaminas) {
      alert("Error al registrar producto")
    }
    else {

      var lista_elementos = {
        calcio: this.calcio,
        carbohidratos: this.carbohidratos,
        codigo_barras: this.codigo_barras,
        descripcion: this.descripcion,
        energia: this.energia,
        grasa: this.grasa,
        hierro: this.hierro,
        nutricionista: '',
        nutri_correo: this.correo,
        nutri_cedula: '',
        lista_espera: this.estado,
        porcion: this.porcion,
        proteina: this.proteina,
        sodio: this.sodio,
        vitaminas: this.vitaminas
      }

      ELEMENT_DATA.push(lista_elementos)
      console.log('Lista en la tabla: ' + ELEMENT_DATA)
      this.table.renderRows();

      this.API.POST(this.url, lista_elementos).subscribe(response => {
        this.API.GET(this.url)
          .subscribe(response => {
            this.lista_datos_recibidos = response
            console.log(this.lista_datos_recibidos)
            for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
              this.lista_productos.push(this.lista_datos_recibidos[i]['codigo_barras'])
            }
          })
      })
    }
  }
   /////////////////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////////// GESTION DE CLIENTES /////////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////////////////////////////


}



