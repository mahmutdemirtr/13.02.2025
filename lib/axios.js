import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://100.27.214.198:8000/',
});

export default axiosInstance;
