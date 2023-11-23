package com.capstone.interviewku.ui.fragments.account

import androidx.lifecycle.ViewModel
import com.capstone.interviewku.data.AuthRepository
import com.capstone.interviewku.data.UserRepository
import javax.inject.Inject

class AccountViewModel @Inject constructor(
    private val authRepository: AuthRepository,
    private val userRepository: UserRepository
) : ViewModel() {
}