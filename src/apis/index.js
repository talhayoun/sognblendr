import Axios from "axios";

export const IS_PRIVATE = 'IS_PRIVATE';

export const axiosInstace = Axios.create({
    // baseURL: "http://songblendr.com/web_service/api/"
    baseURL: "http://localhost:4000",
});

axiosInstace.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token)
        config.headers["Authorization"] = "Bearer " + token;
    return config;
});
