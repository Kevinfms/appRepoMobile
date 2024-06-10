import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.4.136:5526'
});

export default api;