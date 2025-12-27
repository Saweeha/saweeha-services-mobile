import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
    login: async (email, password) => {
        return apiClient.post('/auth/login', { email, password });
    },

    register: async (userData) => {
        return apiClient.post('/auth/register', userData);
    },

    verifyEmail: async (code) => {
        return apiClient.post('/auth/verify-email', { code });
    },

    resendCode: async (email, type = 'registration') => {
        return apiClient.post('/auth/resend-code', { email, type });
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } finally {
            await AsyncStorage.multiRemove(['token', 'refreshToken']);
        }
    },

    getCurrentUser: async () => {
        return apiClient.get('/auth/me');
    },

    forgotPassword: async (email) => {
        return apiClient.post('/auth/forgot-password', { email });
    },

    resetPassword: async (email, code, newPassword) => {
        return apiClient.post('/auth/reset-password', { email, code, new_password: newPassword });
    },
};

export default authService;
