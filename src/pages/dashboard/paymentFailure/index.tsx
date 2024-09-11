import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import React from "react"

export default function PaymentFailure() {
    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
                <div className="max-w-md text-center space-y-4">
                    <div className="mb-8">
                        <div className="bg-red-100 dark:bg-red-900 rounded-full p-4 inline-flex">
                            <XIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
                        </div>
                        <h1 className="text-3xl my-3 text-brand font-bold tracking-tighter sm:text-4xl md:text-5xl">Payment Failed</h1>
                        <p className="text-brand md:text-xl">
                            Unfortunately, your payment did not go through. Please try again or contact support.
                        </p>
                    </div>
                    <a href="/wallet" className="mt-10 inline-block text-sm">
                        <Button variant="default">Retry Payment</Button>
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
}
