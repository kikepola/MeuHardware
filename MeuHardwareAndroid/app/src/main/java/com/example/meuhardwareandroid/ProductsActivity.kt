package com.example.meuhardwareandroid

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.widget.ListView
import android.widget.TextView
import androidx.lifecycle.ViewModelProvider
import com.example.meuhardwareandroid.adapters.ProductAdapter
import com.example.meuhardwareandroid.model.Product
import com.example.meuhardwareandroid.repository.Repository
import androidx.lifecycle.Observer
import com.example.meuhardwareandroid.viewmodelfactorys.ProductViewModelFactory
import com.example.meuhardwareandroid.viewmodels.ProductViewModel

class ProductsActivity : AppCompatActivity() {

    private lateinit var viewModel: ProductViewModel
    private lateinit var listView: ListView
    private lateinit var productNameTxt: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_products)

        var option: String = intent.getStringExtra("option")

        listView = findViewById<ListView>(R.id.product_list_view)
        productNameTxt = findViewById<TextView>(R.id.productTxt)
        productNameTxt.text = option

        val repository = Repository()
        val viewModelFactory = ProductViewModelFactory(repository)

        viewModel = ViewModelProvider(this, viewModelFactory).get(ProductViewModel::class.java)

        when(option){
            "Placas de Vídeo" -> viewModel.getGraphicCard()
            "Memórias Ram" -> viewModel.getMemory()
            "Placas Mãe" -> viewModel.getMotherBoard()
            "Processador" -> viewModel.getProcessor()
        }

        viewModel.response.observe(this, Observer { response ->
            if (response.isSuccessful) {
                // val listItems = response.body()

                var listItems = ArrayList<Product>()
                response.body()?.forEach { graphicCard: Product -> listItems.add(graphicCard) }

                val adapter = ProductAdapter(this, listItems)
                listView.adapter = adapter

                val params: ViewGroup.LayoutParams = listView.layoutParams
                params.height = (listItems.size * 455)
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