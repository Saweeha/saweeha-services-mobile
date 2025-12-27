import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Base URL
// For Android Emulator, use 'http://10.0.2.2:3000/api'
// For iOS Simulator, use 'http://localhost:3000/api'
// For physical device, use your machine's IP address
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000/api',
  ios: 'http://localhost:3000/api',
  default: 'http://localhost:3000/api',
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
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

// Response interceptor to handle token expiration (401)
// and extract data
api.interceptors.response.use(
  (response) => {
    return response.data; // Return the data directly
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 (Unauthorized) - Token expired
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

            // Update header and retry original request
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        await AsyncStorage.multiRemove(['token', 'refreshToken']);
        // You might want to dispatch a logout action here or emit an event
        console.error('Session expired', refreshError);
      }
    }

    // Return a standardized error object
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    const errorData = error.response?.data || {};

    // Create a custom error object that matches what the UI expects
    const customError = new Error(errorMessage);
    customError.response = error.response;
    customError.data = errorData;

    return Promise.reject(customError);
  }
);

export const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    // userData: { name, email, phone, password }
    return api.post('/auth/register', userData);
  },

  verifyEmail: async (code) => {
    // Bearer token in header identifies the user, only code needed in body
    return api.post('/auth/verify-email', { code });
  },

  resendCode: async (email, type = 'registration') => {
    return api.post('/auth/resend-code', { email, type });
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      // Always remove tokens locally (not user data)
      await AsyncStorage.multiRemove(['token', 'refreshToken']);
    }
  },

  getCurrentUser: async () => {
    return api.get('/auth/me');
  },

  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (email, code, newPassword) => {
    return api.post('/auth/reset-password', { email, code, new_password: newPassword });
  },
};

export const userService = {
  updateProfile: async (id, userData) => {
    // If userData contains an image, we need to use multipart/form-data
    if (userData.image) {
      const formData = new FormData();

      // Add all fields to original formData
      Object.keys(userData).forEach((key) => {
        if (key === 'image') {
          // React Native FormData requirements for image
          const image = userData[key];
          const uri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;

          formData.append('image', {
            uri: uri,
            name: image.fileName || `profile_${id}.jpg`,
            type: image.mimeType || 'image/jpeg',
          });
        } else if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      });

      return api.put(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => data, // Prevent axios from transforming FormData
      });
    }

    // Standard JSON update
    return api.put(`/users/${id}`, userData);
  },
};

export const businessService = {
  getAllBusinesses: async () => {
    return api.get('/business/all');
  },
};

export default api;
