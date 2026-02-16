import api from './api';

// Auth Services
export const authService = {
    login: async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    },

    register: async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    getProfile: async () => {
        const { data } = await api.get('/auth/me');
        return data;
    },
};

// Lead Services
export const leadService = {
    create: async (leadData) => {
        const { data } = await api.post('/leads', leadData);
        return data;
    },

    getAll: async (params = {}) => {
        const { data } = await api.get('/leads', { params });
        return data;
    },

    getOne: async (id) => {
        const { data } = await api.get(`/leads/${id}`);
        return data;
    },

    update: async (id, leadData) => {
        const { data } = await api.put(`/leads/${id}`, leadData);
        return data;
    },

    delete: async (id) => {
        const { data } = await api.delete(`/leads/${id}`);
        return data;
    },

    getStats: async () => {
        const { data } = await api.get('/leads/stats/dashboard');
        return data;
    },
};

// Portfolio Services
export const portfolioService = {
    getAll: async (params = {}) => {
        const { data } = await api.get('/portfolio', { params });
        return data;
    },

    getOne: async (id) => {
        const { data } = await api.get(`/portfolio/${id}`);
        return data;
    },

    create: async (portfolioData) => {
        const { data } = await api.post('/portfolio', portfolioData);
        return data;
    },

    update: async (id, portfolioData) => {
        const { data } = await api.put(`/portfolio/${id}`, portfolioData);
        return data;
    },

    delete: async (id) => {
        const { data } = await api.delete(`/portfolio/${id}`);
        return data;
    },

    getCategories: async () => {
        const { data } = await api.get('/portfolio/stats/categories');
        return data;
    },
};

// Testimonial Services
export const testimonialService = {
    getAll: async (params = {}) => {
        const { data } = await api.get('/testimonials', { params });
        return data;
    },

    getFeatured: async () => {
        const { data } = await api.get('/testimonials/featured');
        return data;
    },

    create: async (testimonialData) => {
        const { data } = await api.post('/testimonials', testimonialData);
        return data;
    },

    update: async (id, testimonialData) => {
        const { data } = await api.put(`/testimonials/${id}`, testimonialData);
        return data;
    },

    delete: async (id) => {
        const { data } = await api.delete(`/testimonials/${id}`);
        return data;
    },
};
