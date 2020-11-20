package com.example.meuhardwareandroid.model
import com.google.gson.annotations.SerializedName
import java.sql.Date

data class GraphicCard(
        val id : Int,
        val name : String,
        val price : Double,
        @SerializedName("img_path")
        val imgPath : String,
        val link : String,
        @SerializedName("execution_date")
        val executionDate : Date,
        @SerializedName("store_name")
        val storeName : String
)



/* {
    "id": 641,
    "name": "PLACA DE VIDEO AFOX RADEON R5 220 2GB 64-BIT, AFR5220-2048D3L9-V2",
    "price": 219.9,
    "img_path": "https://media.pichau.com.br/media/catalog/product/cache/83fd0eb49e32eb24f1a05fa91ed67943/a/f/afr5220-2048d3l9-v2.jpg",
    "link": "https://www.pichau.com.br/hardware/placa-de-video/placa-de-video-afox-radeon-r5-220-2gb-64-bit-afr5220-2048d3l9-v2",
    "execution_date": "2020-11-14T18:58:59.000Z",
    "store_name": "Pichau"
  },*/