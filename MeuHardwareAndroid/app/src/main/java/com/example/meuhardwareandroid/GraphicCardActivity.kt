package com.example.meuhardwareandroid

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.widget.ListView
import androidx.lifecycle.ViewModelProvider
import com.example.meuhardwareandroid.adapters.GraphicCardAdapter
import com.example.meuhardwareandroid.model.GraphicCard
import com.example.meuhardwareandroid.repository.Repository
import androidx.lifecycle.Observer

class GraphicCardActivity : AppCompatActivity() {

    private lateinit var viewModel: GraphicCardViewModel
    private lateinit var listView: ListView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_graphic_card)

        listView = findViewById<ListView>(R.id.product_list_view)

        val repository = Repository()
        val viewModelFactory = GraphicCardViewModelFactory(repository)

        viewModel = ViewModelProvider(this, viewModelFactory).get(GraphicCardViewModel::class.java)
        viewModel.getGraphicCard()
        viewModel.response.observe(this, Observer { response ->
            if (response.isSuccessful) {
                // val listItems = response.body()

                var listItems = ArrayList<GraphicCard>()
                response.body()?.forEach { graphicCard: GraphicCard -> listItems.add(graphicCard) }

                val adapter = GraphicCardAdapter(this, listItems)
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
            element as GraphicCard

            val i = Intent(Intent.ACTION_VIEW, Uri.parse(element.link))
            startActivity(i)
        }
    }
}