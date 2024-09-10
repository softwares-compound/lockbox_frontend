import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
// import { useAuth } from '@/context/authContext';
import { Loader2, MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { AXIOS_INSTANCE } from '@/config/axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import ManageSubscription from '../profile/components/manageSubscription';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

const Wallet: React.FC = () => {
    // const authContext = useAuth();
    const navigate = useNavigate();
    const [transactionValue, setTransactionValue] = useState<{
        float: number | undefined,
        formatted: string | undefined,
        value: string | undefined
    }>({
        float: 100,
        formatted: "100",
        value: "100",
    });
    const [transactionValueError, setTransactionValueError] = useState(false)
    const [loading, setLoading] = useState(false);
    // const [showSubscription, setShowSubscription] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // console.log("keeeey" , STRIPE_PUBLISHABLE_KEY);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
            console.log(stripe)
            const resp = await AXIOS_INSTANCE.post("/auth/v1/checkout", {
                amount: transactionValue.value
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                }
            })
            const sessionId = resp.data.data.id
            console.log(sessionId)
            if (!stripe) {
                toast.error("Failed to load stripe");
                return;
            }
            const { error } = await stripe?.redirectToCheckout({ sessionId });
            if (error) {
                console.error('Error:', error);
            }

            stripe?.redirectToCheckout({ sessionId: resp.data.data.sessionId })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const handleSubscribeClick = () => {
        setIsDialogOpen(true);
      };

    return (
        <div className='w-full text-start text-brand pb-10'>
            <div className='mt-4 mb-5 md:-mb-10 flex justify-between px-4'>
                <button className='flex items-center gap-2 font-bold' onClick={() => navigate("/dashboard")}><MoveLeft className="h-5 w-5" /><p>Back</p></button>
                {/* <div><Button variant="outline">Edit profile</Button></div> */}
            </div>
            <div className="px-4 space-y-6 md:px-6 mt-20">
                <header className="space-y-1.5 flex justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <h1 className="text-3xl font-bold">Add Funds</h1>
                        <br />
                        <br />
                        <div className='text-center w-full md:min-w-[320px]'>
                            <Label htmlFor="email" className='md:text-xl'>How much would you like to add?</Label>
                            <div className='max-w-[360px] mx-auto'>
                                <CurrencyInput
                                    id="transaction_value"
                                    // name="transaction_value"
                                    placeholder="eg: $10,000"
                                    // defaultValue={""}
                                    decimalsLimit={2}
                                    prefix="$"
                                    value={transactionValue.value}
                                    onValueChange={(_value, _name, values) => {
                                        setTransactionValueError(false)
                                        setTransactionValue({
                                            float: values?.float ?? undefined,
                                            formatted: values?.formatted,
                                            value: values?.value
                                        })
                                    }}
                                    // min={100}
                                    allowNegativeValue={false}
                                    className="flex h-10 w-full text-center rounded-3xl border-2 border-brand bg-background px-3 py-2 text-base md:text-xl ring-offset-background file:border-0 file:bg-transparent file:text-xl file:font-medium placeholder:text-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <p className='text-red-500 text-base'>{transactionValueError ? "Please enter a value greater or equal to $100" : ""}</p>
                            </div>
                        </div>
                        <div>
                                <div>
                                    <p className=''>
                                        Save up to $800 by{' '}
                                        <a
                                            href="#"
                                            className='text-brand underline'
                                            onClick={handleSubscribeClick} // Open dialog on click
                                        >
                                            subscribe today
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogContent className="max-w-full md:w-2/3 lg:w-2/4 xl:w-1/2">
                                            <DialogHeader>
                                                <DialogTitle className=" text-2xl md:text-3xl font-semibold text-brand px-2">
                                                    Manage Subscription
                                                </DialogTitle>
                                                <DialogDescription className="text-base text-brand/50 px-2">
                                                    Subscribe and save on this transaction
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-2">
                                                <ManageSubscription /> {/* Render your ManageSubscription component inside the dialog */}
                                            </div>
                                        </DialogContent>
                                </Dialog>
                                </div>
                            
                        </div>
                        <br />
                        <br />
                        <div className='text-center w-full md:w-[640px] text-lg '>
                            <p className='font-bold'>Note:</p>
                            <p>These funds will be added to your wallet and spent on contract creation.</p>
                            <br />
                            <br />
                            <Button variant="default" disabled={loading} onClick={() => {
                                if (transactionValue.value && Number(transactionValue.value) >= 100) {
                                    handleSubmit()
                                } else {
                                    setTransactionValueError(true)
                                }
                            }} className='w-60'>
                                {
                                    loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                        : <span className='px-1 text-lg'>Continue</span>
                                }
                            </Button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Wallet