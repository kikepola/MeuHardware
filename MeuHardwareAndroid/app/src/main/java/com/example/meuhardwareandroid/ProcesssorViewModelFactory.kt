package com.example.meuhardwareandroid

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.meuhardwareandroid.repository.Repository

class ProcessorViewModelFactory (private  val repository: Repository) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return  ProcessorViewModel(repository) as T
    }
}