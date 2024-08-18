/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

export interface ErrorResponse {
    [x: string]: any;
    errors: Array<{
        detail: string;
    }>;
}

const useErrorHandling = () => {
    const auth = useAuth()

    const handleErrors = (response: ErrorResponse) => {
        if (response && response.errors && response.errors.length > 0) {
            response.errors.forEach((error) => {
                const errorDetail = error.detail.toLowerCase();
                if (
                    errorDetail === "authentication credentials were not provided." ||
                    errorDetail === "user_not_found" ||
                    errorDetail === "user not found"
                ) {
                    toast.error("Session timed out");
                    auth?.setIsAuthenticated(false);
                    auth?.setUserData(null);
                } else {
                    toast.error(error.detail);
                }
            });
        } else {
            // fallback error toast
            toast.error("Something went wrong! Try again later.");
        }
    };

    return { handleErrors };
};

export default useErrorHandling;