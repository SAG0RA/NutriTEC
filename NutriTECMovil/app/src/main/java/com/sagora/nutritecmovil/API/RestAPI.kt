package com.sagora.nutritecmovil.API

import com.sagora.nutritecmovil.API.Data.Clientes
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST

interface RestAPI {
    @Headers("Content-Type: application/json")

    @GET("/api/cliente")
    fun getClient(): Call<List<Clientes>>
}