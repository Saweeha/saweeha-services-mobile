import apiClient from './apiClient';

export const businessService = {
    getAllBusinesses: async () => {
        return apiClient.get('/business/all');
    },
};

export default businessService;
