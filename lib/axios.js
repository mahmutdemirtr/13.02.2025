import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://100.27.214.198:8000/',
});

export default axiosInstance;