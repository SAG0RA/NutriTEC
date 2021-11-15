import { Component, OnInit, ViewChild} from '@angular/core';
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

export interface CobroElement {
  n_cedula: string
  nombre: string
  p_apellido: string
  s_apellido: string
  tarjetacredito: string
  tipo_cobro: string
  numero_clientes: string
  monto: any

}

const ELEMENT_DATA: ProductoElement[] = [
];

const COBRO_DATA: CobroElement[] = [
];

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})


export class VistaAdminComponent implements OnInit {

////////// Gestion de Tabla de productos /////////////
displayedColumns: string[] =
['codigo_barras', 'descripcion', 'porcion', 'energia', 'grasa', 'proteina', 'sodio', 'carbohidratos', 'calcio', 'hierro', 'vitaminas', 'estado', 'actions'];

displayedColumnsCobro: string[] =
  ['n_cedula', 'nombre', 'p_apellido', 's_apellido', 'tarjetacredito', 'tipo_cobro', 'numero_clientes', 'monto'];

dataSource = ELEMENT_DATA;
dataSourceCobros = COBRO_DATA;

@ViewChild('productos') table: MatTable<ProductoElement>;
@ViewChild('cobros') reporte: MatTable<CobroElement>;

  url = '/api/producto/listaEspera'
  cobros = '/api/nutri/reporte_cobro'
  lista_datos_recibidos: any = [];
  lista_cobros: any = [];

  constructor(private API: APIService) { }

  ngOnInit(): void {
    this.API.GET(this.url)
      .subscribe(response => {
        ELEMENT_DATA.length = 0
        this.lista_datos_recibidos = response
        console.log(this.lista_datos_recibidos)
        //Vacia la lista para volverla a llenar luego
        for (var i = 0; i < this.lista_datos_recibidos.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          ELEMENT_DATA.push(this.lista_datos_recibidos[i])
        }
      this.table.renderRows()
      })

      this.API.GET(this.cobros)
      .subscribe(response => {
        COBRO_DATA.length = 0
        this.lista_cobros = response
        console.log(this.lista_cobros)
        //Vacia la lista para volverla a llenar luego
        for (var i = 0; i < this.lista_cobros.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          COBRO_DATA.push(this.lista_cobros[i])
        }
      this.reporte.renderRows()
      })
  }


  eliminarProducto(row: any) {
    this.API.DELETE(this.url + '/' + row.codigo_barras).subscribe(() => console.log("Producto eliminado"))

    this.dataSource.splice(row,1);
    this.table.renderRows();
  }

  aceptarProducto(row: any) {
    const body = {codigo_barras : row.codigo_barras}
    this.API.PUT(this.url, body).subscribe(() => console.log("Producto aceptado"))

    this.dataSource.splice(row,1);
    this.table.renderRows();
  }

}
