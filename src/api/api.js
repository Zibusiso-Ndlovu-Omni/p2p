import axios from "axios";

export const apiUrl = "http://localhost:5002/api/v1/";

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 300000,
})

export default api;