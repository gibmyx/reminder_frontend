import axios from 'axios'

import { getEnvVariables } from '../helpers';
const { VITE_BACKEND_API_URL } = getEnvVariables();

const reminderApi = axios.create({
    baseURL: VITE_BACKEND_API_URL
});

// Todo: configurar interceptores
reminderApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
    }
    return config;
})

export default reminderApi;