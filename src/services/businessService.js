import apiClient from './apiClient';

export const businessService = {
    /**
     * Get all businesses (public endpoint)
     */
    getAllBusinesses: async () => {
        return apiClient.get('/business/all');
    },

    /**
     * Get detailed business info by ID (public endpoint)
     * Returns business with branches, services, professionals, and reviews
     * @param {number|string} id - Business ID
     */
    getBusinessById: async (id) => {
        return apiClient.get(`/business/${id}`);
    },
};

export default businessService;
