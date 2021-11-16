package com.example.app.Database.Cliente

class ClienteModelo {

    var cedula: Int = 0
    var nombre: String = ""
    var p_apellido: String = ""
    var s_apellido: String = ""
    var edad: Int = 0
    var fecha_nac: String = ""
    var correo: String = ""
    var password: String = ""
    var pais: String = ""

    /////////// Datos corporales del Cliente ////////
    var IMC: Int = 0
    var cintura: Int = 0
    var cuello: Int = 0
    var caderas: Int = 0
    var porc_musculo: Int? = null
    var porc_grasa: Int? = null
    var cdm_calorias: Int? = null
    var peso:Int = 0

    constructor(cedula:Int,nombre: String,p_apellido: String,s_apellido:String,edad: Int, fecha_nac:String,correo: String,password: String,
                IMC: Int, cintura: Int, cuello: Int, caderas: Int, porc_musculo: Int, porc_grasa: Int, cdm_calorias: Int,peso:Int,pais: String, ){
        this.cedula = cedula
        this.nombre = nombre
        this.p_apellido = p_apellido
        this.s_apellido = s_apellido
        this.edad = edad
        this.fecha_nac = fecha_nac
        this.correo = correo
        this.password = password
        this.pais = pais
        this.IMC = IMC
        this.cintura = cintura
        this.cuello = cuello
        this.caderas = caderas
        this.porc_musculo = porc_musculo
        this.porc_grasa = porc_grasa
        this.cdm_calorias = cdm_calorias
        this.peso = peso
    }

    constructor(){}

    override fun toString(): String {
        return correo
    }
}