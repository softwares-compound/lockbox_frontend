import { APP__AXIOS_INSTANCE, AXIOS_INSTANCE } from "@/config/axios";
import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import useErrorHandling, { ErrorResponse } from "@/hooks/errorHandling";

type UserData = {
    // Define your user data properties
    email: string;
    name: string;
    mobile: string;
    company?: string;
    // other properties as per your application's requirement
};

type UserAuth = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    signin: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, mobile: string, company?: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { handleErrors } = useErrorHandling();

    const signin = async (email: string, password: string) => {
        try {
            const res1 = await APP__AXIOS_INSTANCE.post("auth/get_tenant_name/", { email }, { withCredentials: false });
            const tenant = { name: res1.data.tenant_name };
            localStorage.setItem("X-Request-ID", tenant.name);

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            const res2 = await AXIOS_INSTANCE.post("auth/signin/", formData, {
                headers: { "X-Request-ID": localStorage.getItem("X-Request-ID") },
                withCredentials: true,
            });

            toast.success("Signed In Successfully", { id: "signin" });
            const data = res2.data;
            setUserData({ ...data.user });
            setIsAuthenticated(true);
        } catch (error: any) {
            if (error.response) {
                handleErrors(error.response.data as ErrorResponse);
            }
            return error;
        }
    };

    const signup = async (email: string, password: string, name: string, mobile: string, company?: string) => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("name", name);
            formData.append("mobile", mobile);
            if (company) {
                formData.append("company", company);
            }

            const res = await AXIOS_INSTANCE.post("auth/signup/", formData, {
                headers: { "X-Request-ID": localStorage.getItem("X-Request-ID") },
                withCredentials: true,
            });

            toast.success("Signed Up Successfully", { id: "signup" });
            const data = res.data;
            setUserData({ ...data.user });
            setIsAuthenticated(true);
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
            await APP__AXIOS_INSTANCE.get("auth/logout", {
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
        signup, // Added signup function to the context value
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
