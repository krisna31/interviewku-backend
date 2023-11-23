package com.capstone.interviewku.data.preferences

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import kotlinx.coroutines.flow.map

class AppPreferences(private val dataStore: DataStore<Preferences>) {
    private val accessTokenPreferencesKey = stringPreferencesKey("access_token_key")
    private val refreshTokenPreferencesKey = stringPreferencesKey("refresh_token_key")

    suspend fun clearToken() = dataStore.edit {
        it.clear()
    }

    fun getAccessToken() = dataStore.data.map {
        it[accessTokenPreferencesKey]
    }

    fun getBearerToken() = dataStore.data.map {
        "Bearer ${it[accessTokenPreferencesKey] ?: ""}"
    }

    fun getRefreshToken() = dataStore.data.map {
        it[refreshTokenPreferencesKey]
    }

    suspend fun setAccessToken(accessToken: String) = dataStore.edit {
        it[accessTokenPreferencesKey] = accessToken
    }

    suspend fun setRefreshToken(refreshToken: String) = dataStore.edit {
        it[refreshTokenPreferencesKey] = refreshToken
    }
}