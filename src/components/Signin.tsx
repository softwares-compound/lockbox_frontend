import React, { useState } from "react"
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
import toast from "react-hot-toast"
import { useAuth } from "@/context/authContext"
import { Loader2 } from "lucide-react"

export function signinForm() {
    const [email, setEmail] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");

    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields", { id: "signin" });
            return;
        }
        setIsLoading(true);
        await auth?.signin(email, password);
        setIsLoading(false);
    };

    return (
        <Card className=" mx-auto  border-0 shadow-none ">
            <CardHeader>
                <CardTitle className="text-2xl">signin</CardTitle>
                <CardDescription>
                    Enter your email and password below to signin to your account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleFormSubmit}>
                <CardContent className="grid gap-4" >
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">
                        {
                            isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                : <span>Sign in</span>

                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
