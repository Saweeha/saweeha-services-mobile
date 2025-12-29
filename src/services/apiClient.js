import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:3000/api',
    ios: 'http://localhost:3000/api',
    default: 'http://localhost:3000/api',
});

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error retrieving token', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                        refreshToken,
                    });

                    if (response.data.success) {
                        const { token, refreshToken: newRefreshToken } = response.data.data;
                        await AsyncStorage.setItem('token', token);
                        await AsyncStorage.setItem('refreshToken', newRefreshToken);

                        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    }
                }
            } catch (refreshError) {
                await AsyncStorage.multiRemove(['token', 'refreshToken']);
                console.error('Session expired', refreshError);
            }
        }

        const errorMessage = error.response?.data?.message || 'Something went wrong';
        const errorData = error.response?.data || {};

        const customError = new Error(errorMessage);
        customError.response = error.response;
        customError.data = errorData;

        return Promise.reject(customError);
    }
);

export default apiClient;
