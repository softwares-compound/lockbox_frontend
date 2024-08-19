import axios, { AxiosInstance } from "axios";

const APP_API_BASE_URL = 'https://api.lockboxpayments.io/api/';

// const CHAT_API__BASE_URL = 'https://chat.rosterly.io/api/v1/';
const LOCAL_API__BASE_URL = 'http://localhost:8001/api/v1/';

export const APP__AXIOS_INSTANCE: AxiosInstance = axios.create({
    baseURL: APP_API_BASE_URL,
    withCredentials: true,
});

export const AXIOS_INSTANCE: AxiosInstance = axios.create({
    baseURL: LOCAL_API__BASE_URL,
    withCredentials: true,
});
