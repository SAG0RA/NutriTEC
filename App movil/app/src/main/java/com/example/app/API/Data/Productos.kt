package com.example.app.API.Data

data class Productos(
    val codigo_barras: String,
    val descripcion: String,
    val porcion: Int,
    val energia: Int,
    val grasa: Int,
    val sodio: Int,
    val carbohidratos: Int,
    val proteina: Int,
    val vitaminas: String,
    val calcio: Int,
    val hierro: Int,
    val lista_espera: Int,
    val nutri_cedula: Int?,
    val nutri_correo: String,
    val nutricionista: String?,
    val productosXplan: List<String>,
    val registro_comida: String?,
    )