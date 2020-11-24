package com.example.meuhardwareandroid

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.meuhardwareandroid.model.Product
import com.example.meuhardwareandroid.repository.Repository
import kotlinx.coroutines.launch
import retrofit2.Response

class ProcessorViewModel(private  val repository: Repository): ViewModel() {

    val response: MutableLiveData<Response<Collection<Product>>> = MutableLiveData()

    fun getProcessor() {
        viewModelScope.launch {
            val finalResponse: Response<Collection<Product>> = repository.getProcessor()
            response.value = finalResponse
        }
    }
}