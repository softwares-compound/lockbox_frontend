import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateTransactionInputType } from './type'
import { Label } from '@/components/ui/label'
import CurrencyInput from 'react-currency-input-field';
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const Step3: React.FC<Props> = ({ formData, setFormData, setCurrentStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionInputType>({
        defaultValues: formData,
    })
    const [noDateError, setNoDateError] = useState(false)

    const onSubmit = () => {
        if (!formData.transaction_deadline) {
            setNoDateError(true)
            return
        }
        setCurrentStep(3)
    }
    console.log(formData)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=''>
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
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {noDateError && <p className="text-red-500 text-base">{"Transaction deadline is required"}</p>}
            </div>
            <div className='my-20'>
                <Label htmlFor="transaction_value">Who is the counter party in the transaction?<span className="text-red-500">*</span></Label>
                <div className='max-w-[360px] mx-auto'>
                    <CurrencyInput
                        id="transaction_value"
                        // name="transaction_value"
                        placeholder="eg: 10,000"
                        // defaultValue={1000}
                        decimalsLimit={2}
                        // onValueChange={(value, name, values) => console.log(value, name, values)}
                        {...register('transaction_value', { required: 'Transaction value is required' })}
                        className="flex h-10 w-full text-center rounded-3xl border-2 border-brand bg-background px-3 py-2 text-base md:text-xl ring-offset-background file:border-0 file:bg-transparent file:text-xl file:font-medium placeholder:text-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {errors.transaction_value && <p className="text-red-500 text-base">{errors.transaction_value.message}</p>}
            </div>
            <div className='flex justify-end gap-6 my-20 '>
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <span><ArrowLeft /></span>
                    <span>Previous</span>
                </Button>
                <Button type="submit" variant="outline">
                    <span>Review</span>
                    <span><ArrowRight /></span>
                </Button>
            </div>
        </form>
    )
}

export default Step3
