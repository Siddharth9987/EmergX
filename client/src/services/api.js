import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const getCompanies = (params) => API.get('/companies', { params });
export const getCompany   = (id)     => API.get(`/companies/${id}`);
export const addCompany   = (data)   => API.post('/companies', data);

export const getReviews = (companyId, params) => API.get(`/reviews/${companyId}`, { params });
export const addReview  = (data) => API.post('/reviews', data);
export const likeReview = (id)   => API.put(`/reviews/${id}/like`);
