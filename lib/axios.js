import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://54.80.83.245:8000/',
});

export default axiosInstance;