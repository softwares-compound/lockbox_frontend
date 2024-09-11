export const AUTH_ENDPOINTS = {
    LOGIN: "auth/v1/login",
    REGISTER: "auth/v1/registration",
    UPDATE_PROFILE: "auth/v1/user/1",
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
    SUBSCRIPTION_UPDATE: "general/v1/subscribe",
}

export const CONTRACTS_ENDPOINTS = {
    GET_CONTRACT_LIST: "general/v1/contract",
    GET_CONTRACT: "general/v1/contract",
    CREATE_CONTRACT: "general/v1/contract",
    UPDATE_CONTRACT: "general/v1/contract",
    DELETE_CONTRACT: "general/v1/contract",
}

export const CONTRACT_ACTIONS_ENDPOINTS = {
    CANCEL: "general/v1/contract/action",
    DECLINE: "general/v1/contract/action",
    MODIFY: "general/v1/contract/action",
    APPROVE: "general/v1/contract/action",
    SUBMIT: "general/v1/contract/action",
    EDIT: "general/v1/contract/action",
    RESUBMIT: "general/v1/contract/action",
    VIEW: "general/v1/contract/action",
    REVIEW: "general/v1/contract/action",
    INCOMPLETE: "general/v1/contract/action",
}