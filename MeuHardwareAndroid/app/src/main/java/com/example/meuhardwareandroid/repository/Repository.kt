package com.example.meuhardwareandroid.repository

import com.example.meuhardwareandroid.api.RetrofitInstance
import com.example.meuhardwareandroid.model.GraphicCard
import retrofit2.Response

class Repository {
    suspend fun getGraphicCard(): Response<Collection<GraphicCard>> {
        return RetrofitInstance.api.getGraphicCards()
    }
}