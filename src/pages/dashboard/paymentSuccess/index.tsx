import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import React from "react"

export default function PaymentSuccess() {
    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
                <div className="max-w-md text-center space-y-4">
                    <div className="mb-8">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
                            <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                        </div>
                        <h1 className="text-3xl mt-3 text-brand  font-bold tracking-tighter sm:text-4xl md:text-5xl">Payment Successful</h1>
                        <p className="text-brand  md:text-xl">
                            Your subscription has been activated. You can now access all the features of our product.
                        </p>
                    </div>
                    <a href="/dashboard" className="mt-10 inline-block text-sm">
                        <Button variant="default">Go back dashboard</Button>
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
}