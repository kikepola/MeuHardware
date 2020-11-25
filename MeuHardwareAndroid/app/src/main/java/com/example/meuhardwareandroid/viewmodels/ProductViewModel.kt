package com.example.meuhardwareandroid.viewmodels

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.meuhardwareandroid.model.Product
import com.example.meuhardwareandroid.repository.Repository
import kotlinx.coroutines.launch
import retrofit2.Response

class ProductViewModel(private  val repository: Repository): ViewModel() {

    val response: MutableLiveData<Response<Collection<Product>>> = MutableLiveData()

    fun getMemory() {
        viewModelScope.launch {
            val finalResponse: Response<Collection<Product>> = repository.getMemory()
            response.value = finalResponse
        }
    }

    fun getGraphicCard() {
        viewModelScope.launch {
            val finalResponse: Response<Collection<Product>> = repository.getGraphicCard()
            response.value = finalResponse
        }
    }

    fun getMotherBoard() {
        viewModelScope.launch {
            val finalResponse: Response<Collection<Product>> = repository.getMotherBoard()
            response.value = finalResponse
        }
    }

    fun getProcessor() {
        viewModelScope.launch {
            val finalResponse: Response<Collection<Product>> = repository.getProcessor()
            response.value = finalResponse
        }
    }
}