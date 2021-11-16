package com.example.app.Funciones

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.app.R
import kotlinx.android.synthetic.main.menu.*

class Menu : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.menu)

        btnreceta.setOnClickListener {
            startActivity(
                Intent(this, Recetas::class.java)
            )
//            .putExtra("Usuario",usuario))
        }

        btnregistro.setOnClickListener {
            startActivity(
                Intent(this, Consumo::class.java)
            )
//            .putExtra("Usuario",usuario))
        }
    }


}