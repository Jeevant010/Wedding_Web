import axios from 'axios';

// Base API URL - uses environment variable or fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.PROD
        ? 'https://your-backend-url.vercel.app/api' 
        : 'http://localhost:9000/api');

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
});

// API functions for each data type

// Testimonials API
export const testimonialsAPI = {
    getAll: () => api.get('/testimonials'),
    getById: (id) => api.get(`/testimonials/${id}`)
};

// Promotions API
export const promotionsAPI = {
    getAll: () => api.get('/promotions'),
    getById: (id) => api.get(`/promotions/${id}`)
};

// Footer API
export const footerAPI = {
    getData: () => api.get('/footer')
};

// Generic error handler
export const handleAPIError = (error) => {
    if (error.response) {
        // Server responded with error status
        console.error('API Error:', error.response.data);
        return error.response.data.message || 'Server error occurred';
    } else if (error.request) {
        // Request was made but no response
        console.error('Network Error:', error.request);
        return 'Network error - please check your connection';
    } else {
        // Something else happened
        console.error('Error:', error.message);
        return 'An unexpected error occurred';
    }
};

export default api;
