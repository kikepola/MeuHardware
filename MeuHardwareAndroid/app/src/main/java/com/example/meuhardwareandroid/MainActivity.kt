package com.example.meuhardwareandroid

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val gcBtn = findViewById<Button>(R.id.gcBtn)

        gcBtn.setOnClickListener {
            val intent = Intent(this, GraphicCardActivity::class.java)
            startActivity(intent)
        }
    }

}