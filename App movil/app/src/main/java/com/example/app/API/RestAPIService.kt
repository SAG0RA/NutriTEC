import android.util.Log
import com.example.app.API.Data.Clientes
import com.example.app.API.Data.Productos
import com.example.app.Database.Cliente.ClientesDB
import com.example.app.Database.Producto.ProductosDB
import com.example.app.Funciones.Inicio
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RestAPIService {
    /**Funcion encargada de enviar la solicitud GET al REST API en /api/cliente
     * @param db: Base de datos donde se guardara la correspondiente info
     */
    fun getCliente(db: ClientesDB) {
        val retrofit = ServiceBuilder.buildService(RestAPI::class.java)
        retrofit.getCliente().enqueue(object : Callback<List<Clientes>> {
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

    fun getProducto(db: ProductosDB) {
        val retrofit = ServiceBuilder.buildService(RestAPI::class.java)
        retrofit.getProducto().enqueue(object : Callback<List<Productos>> {
            override fun onResponse(call: Call<List<Productos>>, response: Response<List<Productos>>) {
                val datos = response.body()

                if (datos != null) {
                    Inicio().sync_Producto(datos,db)
                }

                for (c in datos!!)
// Print para verificar que se haya hecho bien la solicitud
                    Log.d(
                        "PRODUCTO: ",
                        "Codigo de barras: ${c.codigo_barras} " +
                                "\n Descripcion: ${c.descripcion} " +
                                "\n Espera: ${c.lista_espera}"
                    )

            }

            override fun onFailure(call: Call<List<Productos>>, t: Throwable) {
                Log.d("Error producto", t.message.toString())
            }
        })
    }

}