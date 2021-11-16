package com.example.app.Database.Cliente

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.util.Log
import com.example.app.Database.Tablas


class ClientesDB(context: Context): SQLiteOpenHelper(context, DATABASE_NAME,null, DATABASE_VERSION) {
    private val db: SQLiteDatabase
    private val values: ContentValues

    companion object{
        val DATABASE_VERSION = 1
        val DATABASE_NAME = "NutriTEC"
    }

    init{
        db = this.writableDatabase
        values = ContentValues()
    }

    override fun onCreate(db: SQLiteDatabase?) {
        db!!.execSQL("CREATE TABLE " + Tablas.Cliente.TABLE_NAME + " (" +
                Tablas.Cliente.NOMBRE + " TEXT NOT NULL," +
                Tablas.Cliente.P_APELLIDO + " TEXT NOT NULL," +
                Tablas.Cliente.S_APELLIDO + " TEXT NOT NULL," +
                Tablas.Cliente.CEDULA + " INTEGER PRIMARY KEY," +
                Tablas.Cliente.PESO + " INTEGER," +
                Tablas.Cliente.IMC + " INTEGER," +
                Tablas.Cliente.CADERAS + " INTEGER," +
                Tablas.Cliente.CINTURA + " INTEGER," +
                Tablas.Cliente.CUELLO + " INTEGER," +
                Tablas.Cliente.EDAD + " INTEGER NOT NULL," +
                Tablas.Cliente.FECHA_NAC + " TEXT NOT NULL," +
                Tablas.Cliente.CORREO + " TEXT NOT NULL," +
                Tablas.Cliente.PASSWORD + " TEXT NOT NULL," +
                Tablas.Cliente.PAIS + " TEXT NOT NULL," +
                Tablas.Cliente.PORC_GRASA + " INTEGER NOT NULL," +
                Tablas.Cliente.PORC_MUSCULO + " INTEGER NOT NULL)")
    }

    override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
        TODO("Not yet implemented")
    }

    fun insert(cliente:ClienteModelo){
        values.put(Tablas.Cliente.NOMBRE, cliente.nombre)
        values.put(Tablas.Cliente.CORREO, cliente.correo)
        values.put(Tablas.Cliente.PASSWORD,cliente.password)
        values.put(Tablas.Cliente.PAIS,cliente.pais)
        values.put(Tablas.Cliente.P_APELLIDO, cliente.p_apellido)
        values.put(Tablas.Cliente.S_APELLIDO, cliente.s_apellido)
        values.put(Tablas.Cliente.CEDULA, cliente.cedula)
        values.put(Tablas.Cliente.PESO, cliente.peso)
        values.put(Tablas.Cliente.IMC, cliente.IMC)
        values.put(Tablas.Cliente.PORC_GRASA, cliente.porc_grasa)
        values.put(Tablas.Cliente.PORC_MUSCULO, cliente.porc_musculo)
        values.put(Tablas.Cliente.CADERAS, cliente.caderas)
        values.put(Tablas.Cliente.CINTURA, cliente.cintura)
        values.put(Tablas.Cliente.CUELLO, cliente.cuello)
        values.put(Tablas.Cliente.EDAD, cliente.edad)
        values.put(Tablas.Cliente.FECHA_NAC, cliente.fecha_nac)
        db.insert(Tablas.Cliente.TABLE_NAME,null,values)

        Log.d("Cliente agregado",values.toString())
    }

    fun getCliente():MutableList<ClienteModelo>{
        val list: MutableList<ClienteModelo> = ArrayList()
        val query = "Select * from " + Tablas.Cliente.TABLE_NAME
        val result = db.rawQuery(query,null)
        if(result.moveToFirst()){
            do{
                val cliente = ClienteModelo()
                // DATOS DE VALIDACION
                cliente.correo = result.getString(result.getColumnIndex(Tablas.Cliente.CORREO))
                cliente.password = result.getString(result.getColumnIndex(Tablas.Cliente.PASSWORD))
                // DATOS NORMALES
                cliente.nombre = result.getString(result.getColumnIndex(Tablas.Cliente.NOMBRE))
                cliente.p_apellido = result.getString(result.getColumnIndex(Tablas.Cliente.P_APELLIDO))
                cliente.cedula = result.getInt(result.getColumnIndex(Tablas.Cliente.CEDULA))
                cliente.pais = result.getString(result.getColumnIndex(Tablas.Cliente.PAIS))
                // DATOS CORPORALES
                cliente.peso = result.getInt(result.getColumnIndex(Tablas.Cliente.PESO))
                cliente.caderas = result.getInt(result.getColumnIndex(Tablas.Cliente.CADERAS))
                cliente.cintura = result.getInt(result.getColumnIndex(Tablas.Cliente.CINTURA))
                cliente.cuello = result.getInt(result.getColumnIndex(Tablas.Cliente.CUELLO))
                cliente.IMC = result.getInt(result.getColumnIndex(Tablas.Cliente.IMC))
                cliente.porc_grasa = result.getInt(result.getColumnIndex(Tablas.Cliente.PORC_GRASA))
                cliente.porc_musculo = result.getInt(result.getColumnIndex(Tablas.Cliente.PORC_MUSCULO))

                list.add(cliente)

            }while(result.moveToNext())
        }

        result.close()
        db.close()
        return list
    }
}