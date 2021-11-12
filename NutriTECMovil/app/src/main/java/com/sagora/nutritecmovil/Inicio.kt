package com.sagora.nutritecmovil

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.sagora.nutritecmovil.API.RestAPIService

class Inicio : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val API = RestAPIService()
        API.getClient()
    }
}