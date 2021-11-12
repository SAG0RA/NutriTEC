package com.sagora.nutritecmovil.API.Data

import android.util.FloatMath

data class Clientes(
    val cedula: Int,
    val nombre: String,
    val p_apellido: String,
    val s_apellido: String,
    val edad: Int,
    val fecha_nac: String,
    val peso: String,
    val IMC: String,
    val pais: String,
    val cintura: Float,
    val cuello: Float,
    val caderas: Float,
    val porc_musculo: Float,
    val porc_grasa: Float,
    val cdm_calorias: Int,
    val correo: String,
    val password: String,
    val meta_calorica: List<String>,
    val paciente: List<String>,
    val Recetas: List<String>,
    val registro_peso: List<String>,
    val registro_comida: List<String>
)