package com.example.meuhardwareandroid

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val gcBtn = findViewById<ImageButton>(R.id.gpuBtn)

        gcBtn.setOnClickListener {
            val intent = Intent(this, GraphicCardActivity::class.java)
            startActivity(intent)
        }

        val cpuBtn = findViewById<ImageButton>(R.id.cpuBtn)

        cpuBtn.setOnClickListener {
            val intent = Intent(this, ProcessorActivity::class.java)
            startActivity(intent)
        }
    }

}