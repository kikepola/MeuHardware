package com.example.meuhardwareandroid

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.meuhardwareandroid.model.Product
import com.example.meuhardwareandroid.repository.Repository
import kotlinx.coroutines.launch
import retrofit2.Response

class GraphicCardViewModel(private  val repository: Repository): ViewModel() {

    val response: MutableLiveData<Response<Collection<Product>>> = MutableLiveData()

    fun getGraphicCard() {
        viewModelScope.launch {
            val finalResponse: Response<Collection<Product>> = repository.getGraphicCard()
            response.value = finalResponse
        }
    }
}