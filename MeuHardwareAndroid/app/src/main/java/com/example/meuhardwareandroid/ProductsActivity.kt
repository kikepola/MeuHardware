package com.example.meuhardwareandroid

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.*
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
    private lateinit var progressBar: ProgressBar
    private lateinit var spinner: Spinner

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_products)
        setOrdeByProductsSpinner()

        var option: String = intent.getStringExtra("option")

        spinner = setOrdeByProductsSpinner()

        listView = findViewById<ListView>(R.id.product_list_view)

        progressBar = findViewById<ProgressBar>(R.id.progressBarProducts)
        progressBar.visibility = View.VISIBLE

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

        displayProductList()

        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                displayProductList(position)
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                TODO("Not yet implemented")
            }
        }
    }

    fun displayProductList(orderOption: Int = 1){
        viewModel.response.observe(this, Observer { response ->
            if (response.isSuccessful) {
                // val listItems = response.body()

                var listItems = ArrayList<Product>()
                response.body()?.forEach { graphicCard: Product -> listItems.add(graphicCard) }

                var orderedList: ArrayList<Product> = ArrayList<Product>()
                when(orderOption){
                    0 -> orderedList = oderByMaxPrice(listItems)
                    1 -> orderedList = oderByMinPrice(listItems)
                    2 -> orderedList = oderByName(listItems)
                }

                val adapter = ProductAdapter(this, orderedList)
                listView.adapter = adapter

                val params: ViewGroup.LayoutParams = listView.layoutParams
                params.height = (listItems.size * 455)
                listView.layoutParams = params

                progressBar.visibility = View.GONE

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

    fun setOrdeByProductsSpinner(): Spinner{
        val spinner: Spinner = findViewById(R.id.orderBySpinner)

        val oderByAdapter: ArrayAdapter<CharSequence> = ArrayAdapter.createFromResource(this, R.array.orderByItems, android.R.layout.simple_spinner_item)
        oderByAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)

        spinner.adapter = oderByAdapter
        return spinner
    }

    fun oderByMaxPrice(products: ArrayList<Product>): ArrayList<Product> {
        val result = products.sortedByDescending { it.price }
        return ArrayList(result)
    }

    fun oderByMinPrice(products: ArrayList<Product>): ArrayList<Product> {
        val result = products.sortedBy { it.price }
        return ArrayList(result)
    }

    fun oderByName(products: ArrayList<Product>): ArrayList<Product> {
        val result = products.sortedBy { it.storeName }
        return ArrayList(result)
    }
}