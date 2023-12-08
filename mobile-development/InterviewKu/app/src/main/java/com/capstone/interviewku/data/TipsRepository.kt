package com.capstone.interviewku.data

import com.capstone.interviewku.data.network.service.InterviewKuAPIService
import com.capstone.interviewku.data.preferences.AppPreferences
import com.capstone.interviewku.data.room.InterviewKuDatabase
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TipsRepository @Inject constructor(
    private val apiService: InterviewKuAPIService,
    private val appPreferences: AppPreferences,
    private val database: InterviewKuDatabase
) {

}