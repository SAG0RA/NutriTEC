package com.example.app.Funciones

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.TableLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.app.Database.Producto.ProductosDB
import com.example.app.R
import kotlinx.android.synthetic.main.consumo.*

class Consumo: AppCompatActivity() {

    var plan_comida: TableLayout? = null
    private var productodb:ProductosDB? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.consumo)

        plan_comida = findViewById(R.id.plan_comida)
        productodb = ProductosDB(this)


        val productos_registrados = productodb!!.getProducto()

        /////////////////// SPINNER PRODUCTO ////////////////////////////
        val xd = listOf<String>("Desayuno","Merienda 1","Almuerzo","Merienda 2","Cena")

        val spinner_producto = findViewById<Spinner>(R.id.spinner_producto)
        val adaptador_producto = ArrayAdapter(this, android.R.layout.simple_spinner_item,productos_registrados)
        spinner_producto.adapter = adaptador_producto

        /////////////////// SPINNER PRODUCTO ////////////////////////////
        val comidas = listOf<String>("Desayuno","Merienda 1","Almuerzo","Merienda 2","Cena")

        val spinner_comidas = findViewById<Spinner>(R.id.spinner_comidas)
        val adaptador_comidas = ArrayAdapter(this, android.R.layout.simple_spinner_item,comidas)
        spinner_comidas.adapter = adaptador_comidas


        btnagregar.setOnClickListener{
            val producto_seleccionado = spinner_producto.selectedItem.toString()
            val tiempo_seleccionado = spinner_comidas.selectedItem.toString()
            Log.d("producto seleccionado: ", producto_seleccionado)
            val registro = LayoutInflater.from(this).inflate(R.layout.tiempos_comida,null,false)

            val desayuno = registro.findViewById<View>(R.id.desayuno) as TextView
            val merienda = registro.findViewById<View>(R.id.merienda) as TextView
            val almuerzo = registro.findViewById<View>(R.id.almuerzo) as TextView
            val merienda2 = registro.findViewById<View>(R.id.merienda2) as TextView
            val cena = registro.findViewById<View>(R.id.cena) as TextView

            if(tiempo_seleccionado == "Desayuno"){
                desayuno.text = producto_seleccionado
            }
            if(tiempo_seleccionado == "Merienda 1"){
                merienda.text = producto_seleccionado
            }
            if(tiempo_seleccionado == "Almuerzo"){
                almuerzo.text = producto_seleccionado
            }
            if(tiempo_seleccionado == "Merienda 2"){
                merienda2.text = producto_seleccionado
            }
            if(tiempo_seleccionado == "Cena"){
                cena.text = producto_seleccionado
            }

            plan_comida?.addView(registro)
        }


    }

    fun cargarTabla(){




    }

}