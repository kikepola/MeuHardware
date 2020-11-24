package com.example.meuhardwareandroid.api

import com.example.meuhardwareandroid.model.Product
import retrofit2.Response
import retrofit2.http.GET

interface SimpleApi {

    @GET("/graphiccard")
    suspend fun getGraphicCards(): Response<Collection<Product>>

    @GET("/memory")
    suspend fun getMemory(): Response<Collection<Product>>

    @GET("/processor")
    suspend fun getProcessor(): Response<Collection<Product>>

    @GET("/motherboard")
    suspend fun getMotherBoard(): Response<Collection<Product>>

}