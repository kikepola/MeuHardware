package com.example.meuhardwareandroid

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val intent = Intent(this, ProductsActivity::class.java)


        val gcBtn = findViewById<ImageButton>(R.id.gpuBtn)

        gcBtn.setOnClickListener {
            intent.putExtra("option", "Placas de Vídeo")
            startActivity(intent)
        }

        val cpuBtn = findViewById<ImageButton>(R.id.cpuBtn)

        cpuBtn.setOnClickListener {
            intent.putExtra("option", "Processador")
            startActivity(intent)
        }

        val mBtn = findViewById<ImageButton>(R.id.mbBtn)

        mBtn.setOnClickListener {
            intent.putExtra("option", "Placas Mãe")
            startActivity(intent)
        }

        val ramBtn = findViewById<ImageButton>(R.id.ramBtn)

        ramBtn.setOnClickListener {
            intent.putExtra("option", "Memórias Ram")
            startActivity(intent)
        }
    }

}