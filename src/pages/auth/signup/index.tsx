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
// import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Layout from "../layout";

// Define an interface for the form data
interface SignupFormData {
    email: string;
    name: string;
    mobile: string;
    password: string;
    confirmPassword: string;
    company?: string; // Optional field
}

export function Signup() {
    // Use the SignupFormData interface in useForm
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Watch the password field to validate confirmPassword
    const password = watch("password");

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        await auth?.signup(data.email, data.password, data.name, data.mobile, data.company);
        setIsLoading(false);
    };

    return (
        <Layout>

            <Card className="mx-auto border-0 w-full sm:w-1/2 lg:w-1/3 shadow-none ">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign Up</CardTitle>
                    <CardDescription>
                        Fill in the details below to create a new account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && <p className="text-red-500 text-sm px-3">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
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
                            />
                            {errors.email && <p className="text-red-500 text-sm px-3">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mobile">Mobile Number<span className="text-red-500">*</span></Label>
                            <Input
                                id="mobile"
                                type="tel"
                                maxLength={10}
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Invalid mobile number",
                                    },
                                })}
                            />
                            {errors.mobile && <p className="text-red-500 text-sm px-3">{errors.mobile.message}</p>}
                        </div>
                        <div className="grid gap-2 ">
                            <div className="relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={passwordVisible ? "text" : "password"} // Toggle input type based on visibility state
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must contain at least one [a-z], [A-Z], [0-9], and one special character [@$!%*?&]",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-gray-600"
                                >
                                    {passwordVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm px-3">{errors.password.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password<span className="text-red-500">*</span></Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm px-3">{errors.confirmPassword.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                type="text"
                                {...register("company")}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <span>Sign Up</span>}
                        </Button>
                    </CardFooter>
                    <p className=" text-neutral-600 text-center">Already have an account? <a className="text-primary hover:underline" href="/sign-in">Signin</a></p>

                </form>
            </Card>
        </Layout>
    );
}
