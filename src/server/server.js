import axios from 'axios';

const server = axios.create({
    baseURL: window.$config.apiUrl.BASE_URL,
    timeout: 5000,
});

export default server;
