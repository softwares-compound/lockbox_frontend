import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateTransactionInputType } from './type'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    role: string,
    setRole: React.Dispatch<React.SetStateAction<string>>
}

const Step1: React.FC<Props> = ({ formData, setFormData, setCurrentStep, role, setRole }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionInputType>({
        defaultValues: formData,
    })

    const onSubmit = (data: CreateTransactionInputType) => {
        // console.log(data)
        setFormData({ ...data })
        setCurrentStep(2)
    }
    console.log("step 1===>> ", formData)
    console.log("role ===>> ", role)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
            <div className=''>
                <Label htmlFor="counter_party">Who is the counter party in the transaction?<span className="text-red-500">*</span></Label>
                <Input
                    className=" max-w-[360px] text-center mx-auto my-2"
                    placeholder='something@example.com'
                    // onChange={(e) => setFormData({ ...formData, counter_party: e.target.value })}
                    // defaultValue={formData.counter_party}
                    {...register('counter_party', {
                        required: 'Counter party email is required', pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.counter_party && <p className="text-red-500 text-base">{errors.counter_party.message}</p>}
            </div>
            <div className='space-y-2 '>
                <p>What is your role in this transaction?</p>
                <RadioGroup
                    className='flex gap-2 justify-center items-center'
                    onValueChange={(value) => {
                        setRole(value);
                    }}
                    // defaultValue={formData.role}
                    value={role}
                >
                    <div className="space-y-2  flex flex-col justify-center items-center">
                        <Label htmlFor="customer">Customer</Label>
                        <RadioGroupItem
                            value="customer"
                            id="customer"
                        />
                    </div>
                    <div className="space-y-2  flex flex-col justify-center items-center">
                        <Label htmlFor="vendor">Vendor</Label>
                        <RadioGroupItem
                            value="vendor"
                            id="vendor"
                        />
                    </div>
                </RadioGroup>
            </div>
            <div className='flex justify-end '>
                <Button type="submit" variant="outline">
                    <span>Next</span>
                    <span><ArrowRight /></span>
                </Button>
            </div>
        </form>
    )
}

export default Step1
