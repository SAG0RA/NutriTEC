package com.example.app.Database.Producto

class ProductoModelo {

    var codigo_barras: String =""
    var descripcion: String = ""
    var porcion:Int = 0
    var energia:Int = 0
    var lista_espera: Int = 0
    var nutricionista: String? = ""

    constructor(codigo_barras: String, descripcion: String,porcion: Int,
                energia:Int,lista_espera:Int,nutricionista:String?){
        this.codigo_barras = codigo_barras
        this.descripcion = descripcion
        this.porcion = porcion
        this.energia = energia
        this.lista_espera = lista_espera
        this.nutricionista = nutricionista

    }

    constructor()

    override fun toString(): String {
        return descripcion
    }
}