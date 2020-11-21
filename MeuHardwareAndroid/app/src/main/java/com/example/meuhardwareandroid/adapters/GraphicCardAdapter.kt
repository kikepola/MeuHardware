package com.example.meuhardwareandroid.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView
import com.example.meuhardwareandroid.R
import com.example.meuhardwareandroid.model.GraphicCard
import com.squareup.picasso.Picasso


class GraphicCardAdapter(private val context: Context,
                         private val dataSource: ArrayList<GraphicCard>) : BaseAdapter() {

    private val inflater: LayoutInflater
            = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

    override fun getCount(): Int {
        return dataSource.size
    }

    override fun getItem(p0: Int): Any {
        return dataSource[p0]
    }

    override fun getItemId(p0: Int): Long {
        return p0.toLong()
    }

    override fun getView(p0: Int, p1: View?, p2: ViewGroup?): View {
        val rowView = inflater.inflate(R.layout.list_item_graphic_card, p2, false)

        val productNameTextView = rowView.findViewById(R.id.product_title) as TextView

        val productPriceTextView = rowView.findViewById(R.id.product_price) as TextView

        val productStoreTextView = rowView.findViewById(R.id.product_store) as TextView

        val productImageView = rowView.findViewById(R.id.product_image) as ImageView

        val product = getItem(p0) as GraphicCard

        var finalProductName = product.name
        if(finalProductName.length > 80){
            finalProductName = finalProductName.take(80) + "..."
        }

        productNameTextView.text = finalProductName

        productPriceTextView.text = "R$ " + product.price.toString()
        productStoreTextView.text = "Loja: " + product.storeName

        val picasso = Picasso.get()
        picasso.load(product.imgPath).into(productImageView)


        return rowView
    }

}