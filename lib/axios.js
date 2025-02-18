import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://51.20.196.237:8001/',
});

export default axiosInstance;
