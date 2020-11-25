package com.example.meuhardwareandroid.viewmodelfactorys

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.meuhardwareandroid.repository.Repository
import com.example.meuhardwareandroid.viewmodels.ProductViewModel

class ProductViewModelFactory (private  val repository: Repository) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return  ProductViewModel(repository) as T
    }
}