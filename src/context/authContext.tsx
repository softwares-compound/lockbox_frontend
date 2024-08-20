import { AXIOS_INSTANCE } from "@/config/axios";
import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import useErrorHandling, { ErrorResponse } from "@/hooks/errorHandling";
import { AUTH_ENDPOINTS } from "@/config/api";
import { useNavigate } from "react-router-dom";

type UserData = {
    id: number;
    email: string;
    name: string;
    mobile: string;
    company?: string;
    status: string;
    images?: string;
    balance: number;
    // other properties as per your application's requirement
};

type UserAuth = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    signin: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, mobile: string, company?: string) => Promise<void>;
    requestOtp: (email: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    resetPassword: (newPassword: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { handleErrors } = useErrorHandling();
    const navigate = useNavigate();

    const signin = async (email: string, password: string) => {
        try {
            const res = await AXIOS_INSTANCE.post(AUTH_ENDPOINTS.LOGIN, {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Signed In Successfully", { id: "signin" });
            const data = res.data;
            navigate("/dashboard");
            setUserData({ ...data.user });
            setIsAuthenticated(true);
        } catch (error: any) {
            if (error.response) {
                handleErrors(error.response.data as ErrorResponse);
            }
            return error;
        }
    };

    const signup = async (email: string, password: string, name: string, mobile_number: string, company?: string) => {
        try {
            const reqBody = {
                email,
                password,
                name,
                mobile_number,
                company,
            }
            const res = await AXIOS_INSTANCE.post(AUTH_ENDPOINTS.REGISTER, reqBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Signed Up Successfully", { id: "signup" });
            navigate("/sign-in");
            console.log(res.data);
            const data = res.data;
            setUserData({ ...data.user });
            setIsAuthenticated(true);
        } catch (error: any) {
            toast.error("Couldn't signed Up", { id: "signup" });
            return error;
        }
    };

    const requestOtp = async (email: string) => {
        try {
            await AXIOS_INSTANCE.post("auth/request_otp/", { email });
            toast.success("OTP sent to your email", { id: "otp" });
        } catch (error: any) {
            if (error.response) {
                handleErrors(error.response.data as ErrorResponse);
            }
            return error;
        }
    };

    const verifyOtp = async (otp: string) => {
        try {
            await AXIOS_INSTANCE.post("auth/verify_otp/", { otp });
            toast.success("OTP verified", { id: "otp" });
        } catch (error: any) {
            if (error.response) {
                handleErrors(error.response.data as ErrorResponse);
            }
            return error;
        }
    };

    const resetPassword = async (newPassword: string) => {
        try {
            const formData = new FormData();
            formData.append("new_password", newPassword);

            await AXIOS_INSTANCE.post("auth/reset_password/", formData);
            toast.success("Password reset successfully", { id: "password" });
        } catch (error: any) {
            if (error.response) {
                handleErrors(error.response.data as ErrorResponse);
            }
            return error;
        }
    };

    const logout = async () => {
        localStorage.removeItem("tenant");
        try {
            toast.loading("Logging out...", { id: "logout" });
            await AXIOS_INSTANCE.get("auth/logout", {
                withCredentials: true,
                headers: { "X-Request-ID": localStorage.getItem("X-Request-ID") },
            });
            setIsAuthenticated(false);
            setUserData(null);
            toast.success("Logged out successfully", { id: "logout" });
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    };

    const value = {
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        signin,
        signup,
        requestOtp,
        verifyOtp,
        resetPassword,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
