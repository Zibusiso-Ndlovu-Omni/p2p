import axios from "axios";

export const apiUrl = "https://p2pzimbabwe.onrender.com/api/v1/";
export const baseImageUrl = "https://p2pzimbabwe.onrender.com";

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 300000,
})

export default api;