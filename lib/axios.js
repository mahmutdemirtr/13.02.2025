import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://ec2-100-27-214-198.compute-1.amazonaws.com:8000/"
    : "http://100.27.214.198/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export default axiosInstance;