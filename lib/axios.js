import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://ec2-100-27-214-198.compute-1.amazonaws.com:8000/',
});

export default axiosInstance;