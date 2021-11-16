package com.example.app.Database.Producto

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.util.Log
import com.example.app.Database.Tablas

class ProductosDB(context: Context): SQLiteOpenHelper(context, DATABASE_NAME,null,DATABASE_VERSION){
    private val db: SQLiteDatabase
    private val values: ContentValues

    companion object{
        val DATABASE_VERSION = 1
        val DATABASE_NAME = "Productos"
    }

    init{
        db = this.writableDatabase
        values = ContentValues()
    }

    override fun onCreate(db: SQLiteDatabase?) {
        db!!.execSQL("CREATE TABLE " + Tablas.Producto.TABLE_NAME + " (" +
        Tablas.Producto.CODIGO_BARRAS + " TEXT PRIMARY KEY," +
        Tablas.Producto.DESCRIPCION + " TEXT NOT NULL," +
        Tablas.Producto.PORCION + " INTEGER NOT NULL," +
        Tablas.Producto.ENERGIA + " INTEGER NOT NULL," +
        Tablas.Producto.LISTA_ESPERA + " INTEGER NOT NULL," +
        Tablas.Producto.NUTRI_CORREO + " TEXT)")
    }

    override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
        TODO("Not yet implemented")
    }

    fun insert(producto: ProductoModelo){
        values.put(Tablas.Producto.CODIGO_BARRAS, producto.codigo_barras)
        values.put(Tablas.Producto.DESCRIPCION, producto.descripcion)
        values.put(Tablas.Producto.PORCION, producto.porcion)
        values.put(Tablas.Producto.ENERGIA, producto.energia)
        values.put(Tablas.Producto.LISTA_ESPERA, producto.lista_espera)
        values.put(Tablas.Producto.NUTRI_CORREO, producto.nutricionista)
        db.insert(Tablas.Producto.TABLE_NAME,null,values)

        Log.d("Producto agregado",values.toString())
    }

    fun getProducto():MutableList<ProductoModelo>{
        val list:MutableList<ProductoModelo> =  ArrayList()
        val query = "SELECT * from " +  Tablas.Producto.TABLE_NAME
        val result = db.rawQuery(query,null)
        if(result.moveToFirst()){
            do{
                val producto = ProductoModelo()
                producto.codigo_barras = result.getString(result.getColumnIndex(Tablas.Producto.CODIGO_BARRAS))
                producto.descripcion = result.getString(result.getColumnIndex(Tablas.Producto.DESCRIPCION))
                producto.energia = result.getInt(result.getColumnIndex(Tablas.Producto.ENERGIA))
                producto.porcion = result.getInt(result.getColumnIndex(Tablas.Producto.PORCION))
                producto.nutricionista = result.getString(result.getColumnIndex(Tablas.Producto.NUTRI_CORREO))
                list.add(producto)
            }while(result.moveToNext())
        }

        result.close()
        db.close()
        return list

    }
}