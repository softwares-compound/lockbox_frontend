import axios, { AxiosInstance } from "axios";

const BASE_URL = 'https://api.lockboxpayments.io/api/';


export const AXIOS_INSTANCE: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

