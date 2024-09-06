import React, { useState } from 'react'
import { CreateTransactionInputType } from './type'
import { Label } from '@/components/ui/label'
import CurrencyInput from 'react-currency-input-field';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { AXIOS_INSTANCE } from '@/config/axios';
import { CREATE_TRANSACTION_ENDPOINTS } from '@/config/api';
// import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/authContext';
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast';
type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    role: string,
    setRole: React.Dispatch<React.SetStateAction<string>>
}

const Step3: React.FC<Props> = ({ formData, setFormData, setCurrentStep, role }) => {
    const authContext = useAuth();
    const [noDateError, setNoDateError] = useState(false)
    const [transactionValueError, setTransactionValueError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handelSaveToDraft = async () => {
        if (!formData.transaction_deadline) {
            setNoDateError(true)
            return
        } else if (!formData.transaction_value.value) {
            setTransactionValueError(true)
            return
        }
        try {
            setIsLoading(true)
            const contracts = formData.transaction_contract_file.map(file => file.key)
            const attachments = formData.additional_attachments.map(file => file.key)
            // console.log({
            //     id: formData.id,
            //     customer: role === "customer" ? authContext?.userData?.email : formData.counter_party,
            //     vendor: role === "vendor" ? authContext?.userData?.email : formData.counter_party,
            // })
            const payload = {
                contracts,
                attachments,
                end_date: formData.transaction_deadline,
                budget: formData.transaction_value.value,
                status: 7,
                customer: role === "customer" ? authContext?.userData?.email : formData.counter_party,
                vendor: role === "vendor" ? authContext?.userData?.email : formData.counter_party,
            }
            if (formData.id) {
                const resp = await AXIOS_INSTANCE.patch(`${CREATE_TRANSACTION_ENDPOINTS.UPDATE_TRANSACTION}/${formData.id}`, payload, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                    }
                })
                console.log(resp.data.data)
                setCurrentStep(4)
                // toast.success("Transaction updated successfully")
            } else {
                const resp = await AXIOS_INSTANCE.post(CREATE_TRANSACTION_ENDPOINTS.SAVE_TO_DRAFT, payload,
                    {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        }
                    }
                )
                console.log(resp.data.data)
                setCurrentStep(4)
                // toast.success("Transaction saved to draft successfully")
            }
        } catch (error: Error | any) {
            if (error.response.data.additional_message) {
                error.response.data.additional_message.map(
                    (message: {
                        customer: Renderable | ValueFunction<Renderable, Toast>;
                        vendor: Renderable | ValueFunction<Renderable, Toast>;
                    }) => toast.error(message.customer ? message.customer : message.vendor))
            }
            // toast.error(error.response.data.message)
            console.log(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form className=''>
            <div className='my-20'>
                <Label htmlFor="transaction_deadline">What is the transaction deadline?<span className="text-red-500 text-base">*</span></Label>
                <br />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                " sm:w-[360px] px-5 justify-center text-center font-normal",
                                !formData.transaction_deadline && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-5 w-5 text-brand/50" />
                            {formData.transaction_deadline ? format(formData.transaction_deadline, "PPP") : <span className="text-brand/50">Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={formData.transaction_deadline}
                            onSelect={(value) => {
                                setNoDateError(false)
                                setFormData({ ...formData, transaction_deadline: value })
                            }}
                            disabled={{ before: new Date() }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {noDateError && <p className="text-red-500 text-base">{"Transaction deadline is required"}</p>}
            </div>
            <div className='my-20'>
                <Label htmlFor="transaction_value">Value<span className="text-red-500">*</span></Label>
                <div className='max-w-[360px] mx-auto'>
                    <CurrencyInput
                        id="transaction_value"
                        // name="transaction_value"
                        placeholder="eg: 10,000"
                        // defaultValue={""}
                        decimalsLimit={2}
                        value={formData.transaction_value.value}
                        onValueChange={(_value, _name, values) => {
                            setTransactionValueError(false)
                            setFormData({
                                ...formData, transaction_value: {
                                    float: values?.float ?? undefined,
                                    formatted: values?.formatted,
                                    value: values?.value
                                }
                            })
                        }}
                        className="flex h-10 w-full text-center rounded-3xl border-2 border-brand bg-background px-3 py-2 text-base md:text-xl ring-offset-background file:border-0 file:bg-transparent file:text-xl file:font-medium placeholder:text-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {transactionValueError && <p className="text-red-500 text-base">Transaction value is required</p>}
            </div>
            <div className='flex justify-end gap-6 my-20 '>
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <span><ArrowLeft /></span>
                    <span>Previous</span>
                </Button>
                <Button type="button" variant="outline" onClick={handelSaveToDraft} disabled={isLoading} className='min-w-20'>
                    {
                        isLoading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                            : <>
                                <span>Review</span>
                                <span><ArrowRight /></span>
                            </>
                    }
                </Button>
            </div>
        </form>
    )
}

export default Step3
