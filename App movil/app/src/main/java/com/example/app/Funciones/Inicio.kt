package com.example.app.Funciones

import RestAPIService
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import com.example.app.API.Data.Clientes
import com.example.app.API.Data.Productos
import com.example.app.Database.Cliente.ClienteModelo
import com.example.app.Database.Cliente.ClientesDB
import com.example.app.Database.Producto.ProductoModelo
import com.example.app.Database.Producto.ProductosDB

import com.example.app.R

class Inicio : AppCompatActivity() {

    lateinit var handler: Handler
    private var clientedb: ClientesDB? = null
    private var productodb: ProductosDB? = null
    

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.inicio)

        //////////// SINCRONIZACION CON BASE DE DATOS ///////////
        clientedb = ClientesDB(this)
        productodb = ProductosDB(this)

        val API = RestAPIService()
        API.getCliente(clientedb!!)
        API.getProducto(productodb!!)

        /////////////////////////////////////////////////////////

        handler = Handler()
        handler.postDelayed({

            val intent = Intent(this, Login::class.java)
            startActivity(intent)
            finish()
        }, 4000)
    }


    ///////////////////////////////////////////////
    /////////////// SINCRONIZACION ////////////////
    ///////////////////////////////////////////////

    fun sync_Cliente(datos: List<Clientes>, db: ClientesDB) {
        for (c in datos) {
            val carga_cliente = ClienteModelo(
                c.cedula,
                c.nombre,
                c.p_apellido,
                c.s_apellido,
                c.edad,
                c.fecha_nac,
                c.correo,
                c.passw,
                c.IMC,
                c.cintura,
                c.cuello,
                c.caderas,
                c.porc_musculo,
                c.porc_grasa,
                c.cdm_calorias,
                c.peso,
                c.pais
            )
            db.insert(carga_cliente)
        }
    }

    fun sync_Producto(datos: List<Productos>,db: ProductosDB){
        for(c in datos){
            val carga_producto = ProductoModelo(
                c.codigo_barras,
                c.descripcion,
                c.porcion,
                c.energia,
                c.lista_espera,
                c.nutri_correo
            )
            db.insert(carga_producto)
        }
    }

}