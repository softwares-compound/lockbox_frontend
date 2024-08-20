import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import toast from "react-hot-toast"
import { useAuth } from "@/context/authContext"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form";
import Layout from "../layout"


// Define an interface for the form data
interface SigninFormData {
    email: string;
    password: string;
}

export function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>();
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data: { email: string; password: string }) => {
        setIsLoading(true);
        await auth?.signin(data.email, data.password);
        setIsLoading(false);
    };

    return (
        <Layout>
            <Card className="mx-auto w-full sm:w-1/2 lg:w-1/3  border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-3xl">Sign in</CardTitle>
                    <CardDescription>
                        Enter your email and password below to sign in to your account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            />
                            {errors.email && <p className="text-red-500 px-3">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <div className="relative">
                                <Label htmlFor="password">Password<span className="text-red-500">*</span></Label>
                                <Input
                                    id="password"
                                    type={passwordVisible ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
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
                            {errors.password && <p className="text-red-500 px-3">{errors.password.message}</p>}
                            {/* <a className="px-3  text-neutral-600 text-end hover:underline cursor-pointer text-primary" href="/forgot-password">Forgot password?</a> */}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <span>Sign in</span>}
                        </Button>
                    </CardFooter>
                    <p className=" text-neutral-600 text-center">Don&apos;t have an account? <a className="text-primary hover:underline" href="/signup">Sign up</a></p>
                </form>
            </Card>
        </Layout>
    )
}
