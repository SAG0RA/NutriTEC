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
  nutri_correo: string
  nutri_cedula: string
  nutricionista: string
  porcion: string
  proteina: string
  sodio: string
  vitaminas: string

}

export interface Producto_planElement {
  codigo_barras: string
  descripcion: string
  energia: string
  tiempo_comida: string
  plan_pertenece: string
  cantidad: string
}

export interface ClientElement {
  cedula: string,
  nombre: string,
  p_apellido: string,
  s_apellido: string,
  edad: string,
  fecha_nac: string,
  peso: string,
  IMC: string,
  pais: string,
  cintura: string,
  cuello: string,
  caderas: string,
  porc_musculo: string,
  porc_grasa: string,
  cdm_calorias: string,
  correo: string,
  passw: string,
  meta_calorica: [],
  paciente: [],
  registro_comida: [],
  registro_peso: []
}

export interface Paciente_Element {
  cedula: any,
  nombre: any,
  p_apellido: any,
  pais: any
}

const PRODUCT_DATA: ProductoElement[] = [
];

const CLIENT_DATA: ClientElement[] = [
];

const PACIENTE_DATA: Paciente_Element[] = [

];

const PLAN_PRODUCT_DATA: ProductoElement[] = [

];

const DESAYUNO_DATA: ProductoElement[] = [

];

const MERIENDA1_DATA: ProductoElement[] = [

];

const ALMUERZO_DATA: ProductoElement[] = [

];

const MERIENDA2_DATA: ProductoElement[] = [

];

const CENA_DATA: ProductoElement[] = [

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

  cedula_nutri: any
  cantidad: any

  ////////// Listas con los datos de PRODUCTOS en API /////////////
  url = '/api/producto'
  url_nutri = '/api/nutri'
  lista_datos_recibidos_producto: any = []
  lista_productos_codigo: any = []

  ////////// Listas con los datos de CLIENTES y NUTRIS en API /////////////
  url_cliente = '/api/cliente'
  url_paciente = '/api/paciente'
  url_pacientes_asociados = '/api/nutri/misPacientes'
  lista_datos_recibidos_cliente: any = []
  lista_datos_recibidos_paciente: any = []
  lista_datos_recibidos_nutri: any = []
  lista_pacientes_cedula: any = []
  lista_pacientes_asociados: any = []

  ////////// Gestion de Tabla de productos /////////////
  displayedColumnsProducto: string[] =
    ['codigo_barras', 'descripcion', 'porcion', 'energia', 'grasa', 'proteina', 'sodio', 'carbohidratos', 'calcio', 'hierro', 'vitaminas', 'actions'];
  displayedColumnsCliente: string[] =
    ['cedula', 'nombre', 'apellido', 'pais', 'cintura', 'cuello', 'caderas', '%musculo', '%grasa', 'actionss'];
  displayedColumnsPaciente: string[] =
    ['cedula', 'nombre', 'apellido', 'pais', 'actionss'];
  displayedColumnsDesayuno: string[] =
    ['codigo_barras', 'descripcion', 'energia'];

  dataSourceProducto = PRODUCT_DATA;
  dataSourceCliente = CLIENT_DATA;
  dataSourcePaciente = PACIENTE_DATA;
  dataSourcePlan_Producto = PLAN_PRODUCT_DATA;

  dataSourceDesayuno = DESAYUNO_DATA;
  dataSourceMerienda1 = MERIENDA1_DATA;
  dataSourceAlmuerzo = ALMUERZO_DATA;
  dataSourceMerienda2 = MERIENDA2_DATA;
  dataSourceCena = CENA_DATA;

  @ViewChild('cliente') tablaCliente: MatTable<ClientElement>;
  @ViewChild('producto') tablaProducto: MatTable<ProductoElement>;
  @ViewChild('paciente') tablaPaciente: MatTable<Paciente_Element>;
  @ViewChild('planxproducto') tablaPlanxproducto: MatTable<ProductoElement>;


  @ViewChild('desayuno') tablaDesayuno: MatTable<ProductoElement>;
  @ViewChild('merienda1') tablaMerienda1: MatTable<ProductoElement>;
  @ViewChild('almuerzo') tablaAlmuerzo: MatTable<ProductoElement>;
  @ViewChild('merienda2') tablaMerienda2: MatTable<ProductoElement>;
  @ViewChild('cena') tablaCena: MatTable<ProductoElement>;


  ////////// Datos de los inputs /////////////
  estado = 0;
  correo: any = localStorage.getItem('user')

  nombre_plan: string

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
    ///////////////// GET de NUTRIS al iniciar la pagina //////////////////
    this.API.GET(this.url_nutri).subscribe(response => {
      this.lista_datos_recibidos_nutri = response
      this.filtro_nutri(this.correo)

      this.API.GET(this.url_pacientes_asociados + '/' + this.cedula_nutri).subscribe(response => {
        PACIENTE_DATA.length = 0;
        this.lista_pacientes_asociados = response
        const propiedades = ['IMC', 'edad', 'caderas', 'cdm_calorias', 'cintura', 'cuello', 'fecha_nac', 'peso', 'plan_suscrito', 'porc_grasa', 'porc_musculo', 's_apellido']
        for (var i = 0; i < this.lista_pacientes_asociados.length; i++) {
          for (var j = 0; j < propiedades.length; j++) {
            delete this.lista_pacientes_asociados[i][propiedades[j]]
          }
        }
        console.log(this.lista_pacientes_asociados)
        for (var i = 0; i < this.lista_pacientes_asociados.length; i++) {
          PACIENTE_DATA.push(this.lista_pacientes_asociados[i])
        }
        this.tablaPaciente.renderRows()
      })
    })

    ///////////////// GET de PRODUCTOS al iniciar la pagina //////////////////
    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos_producto = response
        console.log(this.lista_datos_recibidos_producto)
        //Vacia la lista para volverla a llenar luego
        this.lista_productos_codigo = []
        for (var i = 0; i < this.lista_datos_recibidos_producto.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          this.lista_productos_codigo.push(this.lista_datos_recibidos_producto[i]['codigo_barras'])
        }
        console.log('Productos:' + this.lista_productos_codigo)
        this.filtro_producto(this.correo)
        this.filtro_planxproducto(this.correo)


      })

    ///////////////// GET de CLIENTES al iniciar la pagina //////////////////
    this.API.GET(this.url_cliente)
      .subscribe(response => {
        this.lista_datos_recibidos_cliente = response

        this.API.GET(this.url_paciente).subscribe(response => {
          this.lista_datos_recibidos_paciente = response
          console.log(this.lista_datos_recibidos_cliente)
          for (var i = 0; i < this.lista_datos_recibidos_paciente.length; i++) {
            this.lista_pacientes_cedula.push(this.lista_datos_recibidos_paciente[i]['paciente_cedula'])
          }
          console.log('Pacientes: ' + this.lista_pacientes_cedula)
          this.filtro_cliente(this.lista_pacientes_cedula)
        })
      })
  }

  eliminarProducto(row: any) {
    this.API.DELETE(this.url + '/' + row.codigo_barras).subscribe(() => console.log("Producto eliminado"))

    this.dataSourceProducto.splice(row, 1);
    this.tablaProducto.renderRows();

    this.API.GET(this.url)
      .subscribe(response => {
        this.lista_datos_recibidos_producto = response
        console.log(this.lista_datos_recibidos_producto)
        //Vacia la lista para volverla a llenar luego
        this.lista_productos_codigo = []
        for (var i = 0; i < this.lista_datos_recibidos_producto.length; i++) {
          // Rellena las listas con los datos del API con codigo de barras
          this.lista_productos_codigo.push(this.lista_datos_recibidos_producto[i]['codigo_barras'])
        }
        console.log('Productos: ' + this.lista_productos_codigo)

      })
  }

  filtro_producto(correo: any) {
    PRODUCT_DATA.length = 0
    //Filtra los productos segun el usuario ingresado
    var filtro = this.lista_datos_recibidos_producto.filter(function (el: any) {
      return el.nutri_correo == correo && el.lista_espera == 0;
    })
    for (var i = 0; i < filtro.length; i++) {
      PRODUCT_DATA.push(filtro[i])
    }
    this.tablaProducto.renderRows()
  }

  filtro_planxproducto(correo: any) {
    PLAN_PRODUCT_DATA.length = 0

    var filtro = this.lista_datos_recibidos_producto.filter(function (el: any) {
      return el.lista_espera == 1
    })

    for (var i = 0; i < filtro.length; i++) {
      PLAN_PRODUCT_DATA.push(filtro[i])
    }

    this.tablaPlanxproducto.renderRows()
  }


  filtro_cliente(lista_pacientes: any) {
    CLIENT_DATA.length = 0;

    var filtro = this.lista_datos_recibidos_cliente.filter(function (el: any) {
      return !lista_pacientes.includes(el.cedula)
    })

    for (var i = 0; i < filtro.length; i++) {
      CLIENT_DATA.push(filtro[i])
    }

    console.log(filtro)
    this.tablaCliente.renderRows
  }


  filtro_nutri(correo: any) {
    var filtro = this.lista_datos_recibidos_nutri.filter(function (el: any) {
      return el.correo == correo
    })
    console.log(filtro)
    this.cedula_nutri = filtro[0]['n_cedula']

    console.log(this.cedula_nutri)
  }


  agregarProducto() {
    if (this.lista_productos_codigo.includes(this.codigo_barras) || PRODUCT_DATA.some(e => e.codigo_barras === this.codigo_barras) || !this.codigo_barras || !this.descripcion || !this.porcion || !this.energia || !this.grasa ||
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

      PRODUCT_DATA.push(lista_elementos)
      this.tablaProducto.renderRows();

      this.API.POST(this.url, lista_elementos).subscribe(response => {
        this.API.GET(this.url)
          .subscribe(response => {
            this.lista_datos_recibidos_producto = response
            console.log(this.lista_datos_recibidos_producto)
            for (var i = 0; i < this.lista_datos_recibidos_producto.length; i++) {
              this.lista_productos_codigo.push(this.lista_datos_recibidos_producto[i]['codigo_barras'])
            }
          })
      })
    }
  }


  asociarCliente(row: any) {
    this.dataSourceCliente.splice(row, 1);
    this.tablaCliente.renderRows();

    var cliente_agregado = {
      n_cedula: this.cedula_nutri,
      paciente_cedula: row.cedula
    }

    var cliente_asociado = {
      cedula: row.cedula,
      nombre: row.nombre,
      p_apellido: row.p_apellido,
      pais: row.pais,
    }

    PACIENTE_DATA.push(cliente_asociado)
    console.log(PACIENTE_DATA)
    this.tablaPaciente.renderRows()

    this.API.POST(this.url_paciente, cliente_agregado).subscribe(response => {
      console.log('Paciente agregado')
    })
  }


  //////////////////////// AGREGAR PRODUCTOS A PLAN (FUNCIONES) ///////////////////////
  crearPlan(){
    var plan_creado = {
      nombre_plan: this.nombre_plan,
      nutri_al_plan: this.cedula_nutri,
      nutricionista: this.correo,

    }
  }

  agregarDesayuno(row: any) {
    if (!this.nombre_plan) {
      alert('Registre primero el nombre de su nuevo plan')
    } else {
      var producto_agregado_tabla = {
        codigo_barras: row.codigo_barras,
        descripcion: row.descripcion,
        energia: row.energia
      }

      var producto_agregado_api = {
        codigo_barras: row.codigo_barras,
        tiempo_comida: 'desayuno',
        plan_pertenece: this.nombre_plan,
        cantidad: 1
      }

    }

  }

}



