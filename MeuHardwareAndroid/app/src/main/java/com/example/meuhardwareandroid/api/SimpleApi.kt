package com.example.meuhardwareandroid.api

import com.example.meuhardwareandroid.model.GraphicCard
import retrofit2.Response
import retrofit2.http.GET

interface SimpleApi {

    @GET("/")
    suspend fun getGraphicCards(): Response<Collection<GraphicCard>>

}