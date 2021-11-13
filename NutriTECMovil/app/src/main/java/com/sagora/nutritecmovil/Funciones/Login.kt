package com.sagora.nutritecmovil.Funciones

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.sagora.nutritecmovil.Database.Cliente.ClienteDB
import com.sagora.nutritecmovil.R

class Login: AppCompatActivity() {
    private var db: ClienteDB? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.login)


        /////////////// BASE DE DATOS SQLite (Clientes) //////////////
        db = ClienteDB(this)
        val clientes_registrados = db!!.getCliente()
        //////////////////////////////////////////////////////////////

        //Variables para recibir los datos de entrada de usuario y contraseña
        val correo_input = findViewById<EditText>(R.id.inputcorreo) as EditText
        val contrasena_input = findViewById<EditText>(R.id.inputpassw) as EditText

        val entrar =  findViewById<Button>(R.id.btnentrar)

        entrar.setOnClickListener{

            val correo = correo_input.text.toString()
            val password = contrasena_input.text.toString()

            for(i in 0 until clientes_registrados.size){
                if(clientes_registrados.get(i).correo == correo && clientes_registrados.get(i).password == password){
                    Toast.makeText(this,"Bienvenido " + correo,
                            Toast.LENGTH_LONG).show()
                }else{
                    Toast.makeText(this,"Credenciales invalidas",
                            Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}