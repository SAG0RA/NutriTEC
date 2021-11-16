import com.example.app.API.Data.Clientes
import com.example.app.API.Data.Productos
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST

interface RestAPI {
        @Headers("Content-Type: application/json")

        @GET("/api/cliente")
        fun getCliente(): Call<List<Clientes>>

        @GET("/api/producto")
        fun getProducto(): Call<List<Productos>>
}