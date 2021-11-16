package com.sagora.nutritecmovil.API

import android.util.Log
import com.sagora.nutritecmovil.API.Data.Clientes
import com.sagora.nutritecmovil.Database.Cliente.ClienteDB
import com.sagora.nutritecmovil.Funciones.Inicio
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RestAPIService {
    /**Funcion encargada de enviar la solicitud GET al REST API en /api/cliente
     * @param db: Base de datos donde se guardara la correspondiente info
     */
    fun getClient(db: ClienteDB) {
        val retrofit = ServiceBuilder.buildService(RestAPI::class.java)
        retrofit.getClient().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                val datos = response.body()

                if (datos != null) {
                    Inicio().sync_Cliente(datos,db)
                }

                for (c in datos!!)
// Print para verificar que se haya hecho bien la solicitud
                    Log.d(
                        "CLIENTE: ",
                        "Cedula: ${c.cedula} " +
                                "\n Nombre: ${c.correo} " +
                                "\n Apellido: ${c.p_apellido}" +
                                "\n Passw: ${c.passw}"
                    )

            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                Log.d("Error", t.message.toString())
            }
        })

    }
}