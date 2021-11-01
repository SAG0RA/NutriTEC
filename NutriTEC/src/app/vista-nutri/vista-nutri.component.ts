import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { APIService } from '../api.service';


export interface PeriodicElement {
  calcio: string
  carbohidratos: string
  codigo_barras: string
  descripcion: string
  energia: string
  grasa: string
  hierro: string
  // lista_espera: boolean
  porcion: string
  proteina: string
  sodio: string
  vitaminas: string

}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-vista-nutri',
  templateUrl: './vista-nutri.component.html',
  styleUrls: ['./vista-nutri.component.css'],
})
export class VistaNutriComponent implements OnInit {
  showSpinner = false;


////////// Listas con los datos de PRODUCTOS en API /////////////
  url = '/api/producto'
  lista_datos_recibidos:any = []
  lista_productos: any = []

  
////////// Gestion de Tabla de productos /////////////
  displayedColumns: string[] =
    ['codigo_barras', 'descripcion', 'porcion', 'energia', 'grasa', 'proteina', 'sodio', 'carbohidratos', 'calcio', 'hierro', 'vitaminas','estado','actions'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

////////// Datos de los inputs /////////////
  estado = true;

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

  constructor( private API: APIService) { }

  ngOnInit(): void {
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
          ELEMENT_DATA.push(this.lista_datos_recibidos[i])
        }
        console.log('Productos: ' + '[' + this.lista_productos + ']')
        this.table.renderRows()
      })
  }


  eliminarProducto(row:any){
    this.dataSource.pop();
    this.table.renderRows();

    this.API.DELETE(this.url + '/' + row.codigo_barras).subscribe(() => console.log("Producto eliminado"))
    
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner =  false
    },3000)
    
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
        // lista_espera: this.estado,
        porcion: this.porcion,
        proteina: this.proteina,
        sodio: this.sodio,
        vitaminas: this.vitaminas
      }
      
      ELEMENT_DATA.push(lista_elementos)
      console.log(lista_elementos.toString)
      console.log(ELEMENT_DATA)
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
}
