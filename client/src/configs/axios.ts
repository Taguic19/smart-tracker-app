import axios from "axios";



export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    timeoutErrorMessage: "Request timeout.. Try again later",
    timeout: 15000,
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    config.headers["Content-Type"] = "application/json"
    return config;
});


