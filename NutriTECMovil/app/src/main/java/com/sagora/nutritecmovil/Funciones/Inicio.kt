package com.sagora.nutritecmovil.Funciones

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.sagora.nutritecmovil.API.Data.Clientes
import com.sagora.nutritecmovil.API.RestAPIService
import com.sagora.nutritecmovil.Database.Cliente.ClienteDB
import com.sagora.nutritecmovil.Database.Cliente.ClienteModelo
import com.sagora.nutritecmovil.R

class Inicio : AppCompatActivity() {

    private var clientedb: ClienteDB? = null

    lateinit var handler: Handler
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //////////// SINCRONIZACION CON BASE DE DATOS ///////////
        clientedb = ClienteDB(this)


        val API = RestAPIService()
        API.getClient(clientedb!!)


        handler = Handler()
        handler.postDelayed({

            val intent = Intent(this, Login::class.java)
            startActivity(intent)
            finish()
        }, 3000)
    }


    ///////////////////// SINCRONIZACION INICIAL ////////////////////

    fun sync_Cliente(datos: List<Clientes>, db: ClienteDB) {
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
}
