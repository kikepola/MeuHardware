package com.example.meuhardwareandroid

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.widget.ListView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.meuhardwareandroid.adapters.ProductAdapter
import com.example.meuhardwareandroid.model.Product
import com.example.meuhardwareandroid.repository.Repository

class ProcessorActivity : AppCompatActivity() {

    private lateinit var viewModel: ProcessorViewModel
    private lateinit var listView: ListView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_processor)

        listView = findViewById<ListView>(R.id.product_list_view)

        val repository = Repository()
        val viewModelFactory = ProcessorViewModelFactory(repository)

        viewModel = ViewModelProvider(this, viewModelFactory).get(ProcessorViewModel::class.java)
        viewModel.getProcessor()
        viewModel.response.observe(this, Observer { response ->
            if (response.isSuccessful) {
                // val listItems = response.body()

                var listItems = ArrayList<Product>()
                response.body()?.forEach { graphicCard: Product -> listItems.add(graphicCard) }

                val adapter = ProductAdapter(this, listItems)
                listView.adapter = adapter

                val params: ViewGroup.LayoutParams = listView.layoutParams
                params.height = (listItems.size * 150) + 300
                listView.layoutParams = params

            } else {
                Log.d("Response", response.errorBody().toString())
            }
        })

        listView.setOnItemClickListener { adapterView, view, i, l ->
            val element = adapterView.getItemAtPosition(i)
            element as Product

            val i = Intent(Intent.ACTION_VIEW, Uri.parse(element.link))
            startActivity(i)
        }
    }
}
