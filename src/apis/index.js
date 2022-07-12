import Axios from 'axios';

export const axiosInstace = Axios.create({
    baseURL: "http://songblendr.com/web_service/api/"
})