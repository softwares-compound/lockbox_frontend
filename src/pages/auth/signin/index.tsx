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
import { Loader2 } from "lucide-react"
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

    const onSubmit = async (data: { email: string; password: string }) => {
        setIsLoading(true);
        await auth?.signin(data.email, data.password);
        setIsLoading(false);
    };

    return (
        <Layout>
            <Card className="mx-auto border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign in</CardTitle>
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
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <span>Sign in</span>}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Layout>
    )
}
