import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND_LOCAL
}); 

export default axiosClient;