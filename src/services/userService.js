import { Platform } from 'react-native';
import apiClient from './apiClient';

export const userService = {
    updateProfile: async (id, userData) => {
        if (userData.image) {
            const formData = new FormData();

            Object.keys(userData).forEach((key) => {
                if (key === 'image') {
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

            return apiClient.put(`/users/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                transformRequest: (data) => data,
            });
        }

        return apiClient.put(`/users/${id}`, userData);
    },
};

export default userService;
