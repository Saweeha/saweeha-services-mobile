import apiClient from './apiClient';

export const businessService = {
    getAllBusinesses: async () => {
        return apiClient.get('/business/all');
    },

    getBusinessById: async (id) => {
        return apiClient.get(`/business/${id}`);
    },
};

export default businessService;
