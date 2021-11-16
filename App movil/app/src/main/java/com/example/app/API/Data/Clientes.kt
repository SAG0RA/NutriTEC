package com.example.app.API.Data
// Clase encargada de administar los datos serializados de la cuenta en el API

import android.util.FloatMath

data class Clientes(
    val cedula: Int,
    val nombre: String,
    val p_apellido: String,
    val s_apellido: String,
    val edad: Int,
    val fecha_nac: String,
    val peso: Int,
    val IMC: Int,
    val pais: String,
    val cintura: Int,
    val cuello: Int,
    val caderas: Int,
    val porc_musculo: Int,
    val porc_grasa: Int,
    val cdm_calorias: Int,
    val correo: String,
    val passw: String,
    val meta_calorica: List<String>,
    val paciente: List<String>,
    val Recetas: List<String>,
    val registro_peso: List<String>,
    val registro_comida: List<String>
)