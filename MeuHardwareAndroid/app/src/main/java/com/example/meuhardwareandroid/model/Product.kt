package com.example.meuhardwareandroid.model
import com.google.gson.annotations.SerializedName
import java.sql.Date

data class Product(
        val id : Int,
        val name : String,
        val price : Double,
        @SerializedName("img_path")
        val imgPath : String,
        val link : String,
        @SerializedName("store_name")
        val storeName : String
)
