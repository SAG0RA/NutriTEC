package com.example.app.Funciones

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.app.Database.Cliente.ClientesDB
import com.example.app.R
import kotlinx.android.synthetic.main.content_main.*
import java.math.BigInteger
import java.security.MessageDigest


class Login : AppCompatActivity() {

    private var db: ClientesDB? = null

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        /////////////// BASE DE DATOS SQLite (Clientes) //////////////
        db = ClientesDB(this)
        val clientes_registrados = db!!.getCliente()
        //////////////////////////////////////////////////////////////

        //Variables para recibir los datos de entrada de usuario y contraseña
        val usuario_input = findViewById<EditText>(R.id.inputusuario) as EditText
        val contrasena_input = findViewById<EditText>(R.id.inputcontrasena) as EditText

        //Botón de acceso a la ventana de Seleccionar
        btnentrar.setOnClickListener {

            val usuario = usuario_input.text.toString()
            val contrasena = contrasena_input.text.toString()

            val contrasenaMD5 = md5(contrasena)

            Log.d("xd",clientes_registrados.get(1).correo)
//            Crea un loop para verificar en la lista de clientes registrados si estan los inputs
            for(i in 0 until clientes_registrados.size) {
                if (clientes_registrados.get(i).correo == usuario && clientes_registrados.get(i).password == contrasenaMD5){
                    startActivity(Intent(this, Menu::class.java)
                        .putExtra("Usuario",usuario))
                    Toast.makeText(this,"Bienvenido " + usuario,
                        Toast.LENGTH_LONG).show()
                }else{
                    print("Usuario no identificado")
                }
            }
        }
    }

    fun md5(input:String): String {
        val md = MessageDigest.getInstance("MD5")
        return BigInteger(1, md.digest(input.toByteArray())).toString(16).padStart(32, '0')
    }
}
