import axios from 'axios';
import router from '../router/index'

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${localStorage.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }   
)

export default axios;