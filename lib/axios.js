import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://backend.mahmutdemir.online/",
});

export default axiosInstance;
