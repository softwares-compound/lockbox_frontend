export const AUTH_ENDPOINTS = {
    LOGIN: "auth/v1/login",
    REGISTER: "auth/v1/registration",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    RESET_PASSWORD_TOKEN_VERIFY: "/reset-password/token",
    VERIFY_EMAIL: "/verify-email",
    VERIFY_TOKEN: "/verify-token",
}


export const CREATE_TRANSACTION_ENDPOINTS = {
    CREATE_TRANSACTION: "general/v1/contract",
    SAVE_TO_DRAFT: "general/v1/contract",
    UPDATE_TRANSACTION: "general/v1/contract",
    GET_TRANSACTION: "general/v1/contract",
    GET_TRANSACTION_LIST: "general/v1/contract",
}

export const FILE_UPLOAD_URL = {
    GET_URL: "general/v1/upload-url",
}

export const SUBSCRIPTION_ENDPOINTS = {
    SUBSCRIPTION_LIST: "general/v1/subscription",
    SUBSCRIPTION_UPDATE: "general/v1/subscription",
}