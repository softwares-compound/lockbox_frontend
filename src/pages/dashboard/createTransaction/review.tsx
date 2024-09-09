import React, { useState } from 'react'
import { CreateTransactionInputType } from './type'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { addEllipsis } from '@/lib/utils'
import { useAuth } from '@/context/authContext'
import { AXIOS_INSTANCE } from '@/config/axios'
import { CREATE_TRANSACTION_ENDPOINTS } from '@/config/api'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    role: string
}

const Review: React.FC<Props> = ({ formData, setCurrentStep, role }) => {
    const authContext = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const contracts = formData.transaction_contract_file.map(file => file.key)
            const attachments = formData.additional_attachments.map(file => file.key)
            if (formData.id) {
                const resp = await AXIOS_INSTANCE.patch(`${CREATE_TRANSACTION_ENDPOINTS.UPDATE_TRANSACTION}/${formData.id}`, {
                    contracts,
                    attachments,
                    end_date: formData.transaction_deadline,
                    budget: formData.transaction_value.value,
                    status: 1,
                    customer: role === "customer" ? authContext?.userData?.email : formData.counter_party,
                    vendor: role === "vendor" ? authContext?.userData?.email : formData.counter_party,
                }, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                    }
                })
                console.log(resp.data.data)
                navigate("/dashboard")
                toast.success("Transaction created successfully")
            }
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="px-4 space-y-20 md:px-14 lg:px-20 text-center ">
            <p className='text-2xl md:text-3xl'>
                Review transaction request to {formData.counter_party}
            </p>
            <div className=''>
                <div className='mx-auto max-w-3xl flex justify-between items-center'>
                    <div className={`rounded-full border-[5px] border-brand w-20 md:w-24 h-20 md:h-24 flex justify-center items-center bg-brand text-white `}>You</div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2 md:block hidden'></div>
                    <div className={`rounded-full border-[5px] border-brand w-32 h-32 md:w-44 md:h-44 flex flex-col justify-center items-center bg-white text-brand`}>
                        <p>$0</p>
                        <p>Transaction lockbox</p>
                    </div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2 md:block hidden'></div>
                    <div className={`rounded-full border-[5px] border-brand w-20 md:w-24 h-20 md:h-24 flex justify-center items-center bg-white text-brand `}>{role}</div>
                </div>
            </div>
            <div className='md:px-32'>
                <div className='mx-auto max-w-3xl flex justify-between items-center'>
                    <div className={`rounded-full w-10 h-10 flex justify-center items-center  bg-brand text-white`}>1</div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className={`rounded-full w-10 h-10 flex justify-center items-center bg-brand text-white`}>2</div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className='bg-brand rounded-full w-2 h-2'></div>
                    <div className={`rounded-full w-10 h-10 flex justify-center items-center bg-brand text-white`}>3</div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className='overflow-hidden'>
                        <Label htmlFor="name" className=''>Transaction contract</Label>
                        <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand p-1 rounded-3xl text-center">
                            {
                                formData.transaction_contract_file?.map((file, index) => (
                                    <p key={index}>{addEllipsis(file.file.name, 15, 5)}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email" className=''>Transaction deadline</Label>
                        <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand p-1 rounded-3xl text-center">{formData.transaction_deadline?.toLocaleDateString()} </p>
                    </div>
                    <div>
                        <Label htmlFor="phone" className=''>Transaction value</Label>
                        <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand p-1 rounded-3xl text-center">{formData.transaction_value.formatted} </p>
                    </div>
                    <div className='overflow-hidden'>
                        <Label htmlFor="phone" className=''>Attachments</Label>
                        <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand p-1 rounded-3xl text-center">
                            {
                                formData.additional_attachments?.length > 0 ?
                                    formData.additional_attachments?.map((attachment, index) => (
                                        <p key={index}>{addEllipsis(attachment.file.name, 15, 5)}</p>
                                    )) : <p className='text-brand text-center mx-auto'>No attachments</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-end gap-6 my-20 '>
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    <span><ArrowLeft /></span>
                    <span>Previous</span>
                </Button>
                <Button type="submit" variant="default" className='px-14 min-w-20' onClick={handleSubmit}>
                    {
                        isLoading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> :
                            <span>Create transaction</span>
                    }
                </Button>
            </div>

        </div>
    )
}

export default Review