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
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const Step1: React.FC<Props> = ({ formData, setFormData, setCurrentStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionInputType>({
        defaultValues: formData,
    })

    const onSubmit = (data: CreateTransactionInputType) => {
        setFormData({ ...formData, ...data })
        setCurrentStep(2)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
            <div className=''>
                <Label htmlFor="counter_party">Who is the counter party in the transaction?<span className="text-red-500">*</span></Label>
                <Input
                    className=" max-w-[360px] text-center mx-auto my-2"
                    placeholder='Start typing...'
                    // defaultValue={formData.counter_party}
                    {...register('counter_party', { required: 'Counter party is required' })}
                />
                {errors.counter_party && <p className="text-red-500 text-base">{errors.counter_party.message}</p>}
            </div>
            <div className='space-y-2 '>
                <p>What is your role in this transaction?</p>
                <RadioGroup
                    className='flex gap-2 justify-center items-center'
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    value={formData.role}
                >
                    <div className="space-y-2  flex flex-col justify-center items-center">
                        <Label htmlFor="customer">Customer</Label>
                        <RadioGroupItem
                            value="customer"
                            id="customer"
                            {...register('role', { required: 'Role is required' })}
                        />
                    </div>
                    <div className="space-y-2  flex flex-col justify-center items-center">
                        <Label htmlFor="vendor">Vendor</Label>
                        <RadioGroupItem
                            value="vendor"
                            id="vendor"
                            {...register('role', { required: 'Role is required' })}
                        />
                    </div>
                </RadioGroup>
                {errors.role && <p className="text-red-500 text-base">{errors.role.message}</p>}
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
