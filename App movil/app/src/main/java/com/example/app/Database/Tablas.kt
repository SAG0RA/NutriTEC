package com.example.app.Database

class Tablas {
    abstract class Cliente{
        companion object{
            val TABLE_NAME = "Clientes"
            val NOMBRE = "Nombre"
            val P_APELLIDO = "P_Apellido"
            val S_APELLIDO = "S_Apellido"
            val CEDULA = "Cedula"
            val EDAD = "Edad"
            val FECHA_NAC = "Fecha_nacimiento"
            val CORREO = "Correo"
            val CONTRASENA = "Contrasena"
            val PESO = "Peso"
            val IMC = "IMC"
            val CINTURA = "Cintura"
            val CUELLO = "Cuello"
            val CADERAS = "Caderas"
            val PASSWORD = "Password"
            val PAIS = "Pais"
            val PORC_MUSCULO = "Porc_musculo"
            val PORC_GRASA = "Porc_grasa"
            val CDM_CALORIAS = "Cdm_calorias"
        }
    }

    abstract class Producto{
        companion object{
            val TABLE_NAME = "Productos"
            val CODIGO_BARRAS = "Codigo_barras"
            val DESCRIPCION = "Descripcion"
            val PORCION = "Porcion"
            val ENERGIA = "Energia"
            val LISTA_ESPERA = "Lista_espera"
            val NUTRI_CORREO = "Nutricionista"
        }
    }
}