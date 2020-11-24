package com.example.meuhardwareandroid.repository

import com.example.meuhardwareandroid.api.RetrofitInstance
import com.example.meuhardwareandroid.model.Product
import retrofit2.Response

class Repository {
    suspend fun getGraphicCard(): Response<Collection<Product>> {
        return RetrofitInstance.api.getGraphicCards()
    }

    suspend fun getMemory(): Response<Collection<Product>> {
        return RetrofitInstance.api.getMemory()
    }

    suspend fun getProcessor(): Response<Collection<Product>> {
        return RetrofitInstance.api.getProcessor()
    }

    suspend fun getMotherBoard(): Response<Collection<Product>> {
        return RetrofitInstance.api.getMotherBoard()
    }
}