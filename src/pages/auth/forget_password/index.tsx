import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";
import { Loader2 } from "lucide-react";
import Layout from "../layout";

type ForgotPasswordFormData = {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
};

export function ForgotPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ForgotPasswordFormData>();
    const [emailSent, setEmailSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const onSubmitEmail = async (data: { email: string }) => {
        setIsLoading(true);
        try {
            // Replace with your actual API call
            await auth?.requestOtp(data.email); // Hypothetical function to request OTP
            toast.success("OTP sent to your email", { id: "otp" });
            setEmailSent(true);
        } catch (error) {
            toast.error("Failed to send OTP", { id: "otp" });
        }
        setIsLoading(false);
    };

    const onSubmitOtp = async (data: { otp: string }) => {
        setIsLoading(true);
        try {
            // Replace with your actual API call
            await auth?.verifyOtp(data.otp); // Hypothetical function to verify OTP
            toast.success("OTP verified", { id: "otp" });
            setOtpVerified(true);
        } catch (error) {
            toast.error("Invalid OTP", { id: "otp" });
        }
        setIsLoading(false);
    };

    const onSubmitNewPassword = async (data: { newPassword: string; confirmPassword: string }) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match", { id: "password" });
            return;
        }
        setIsLoading(true);
        try {
            // Replace with your actual API call
            await auth?.resetPassword(data.newPassword); // Hypothetical function to reset password
            toast.success("Password reset successfully", { id: "password" });
            setEmailSent(false);
            setOtpVerified(false);
        } catch (error) {
            toast.error("Failed to reset password", { id: "password" });
        }
        setIsLoading(false);
    };

    return (
        <Layout>
            <Card className="mx-auto w-full sm:w-1/2 lg:w-1/3border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        {otpVerified ? "Reset your password below" : emailSent ? "Enter the OTP sent to your email" : "Enter your email to receive a reset link"}
                    </CardDescription>
                </CardHeader>
                {!emailSent && (
                    <form onSubmit={handleSubmit(onSubmitEmail)}>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    disabled={emailSent}
                                />
                                {errors.email && <p className="text-red-500 text-sm px-3">{errors.email.message}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <span>Submit</span>}
                            </Button>
                        </CardFooter>
                    </form>
                )}
                {emailSent && !otpVerified && (
                    <form onSubmit={handleSubmit(onSubmitOtp)}>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="otp">OTP</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    {...register("otp", {
                                        required: "OTP is required",
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message: "Invalid OTP",
                                        },
                                    })}
                                />
                                {errors.otp && <p className="text-red-500 text-sm px-3">{errors.otp.message}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <span>Verify OTP</span>}
                            </Button>
                        </CardFooter>
                    </form>
                )}
                {otpVerified && (
                    <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    {...register("newPassword", {
                                        required: "New password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
                                    })}
                                />
                                {errors.newPassword && <p className="text-red-500 text-sm px-3">{errors.newPassword.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === watch("newPassword") || "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm px-3">{errors.confirmPassword.message}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <span>Reset Password</span>}
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </Layout>
    );
}
