// import { useAuth } from '@/context/authContext'
import { MoveLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Step3 from './step3'
import Step1 from './step1'
import Step2 from './step2'
import { CreateTransactionInputType } from './type'
import Review from './review'


const CreateTransaction: React.FC = () => {
    // const authContext = useAuth()
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<CreateTransactionInputType>({
        role: "customer",
        counter_party: "",
        transaction_contract_file: [],
        additional_attachments: [],
        transaction_deadline: undefined,
        transaction_value: {
            formatted: "",
            value: "",
        },
    })

    return (
        <div className='w-full text-start text-brand pb-10'>
            <div className='mt-4 mb-5 md:-mb-5 flex justify-between px-4'>
                <button className='flex items-center gap-2 font-bold' onClick={() => navigate("/")}><MoveLeft className="h-5 w-5" /><p>Back</p></button>
            </div>
            {
                currentStep > 3 ? <Review formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} /> :
                    <div className="px-4 space-y-10 md:px-14 lg:px-20 text-center ">
                        <p className='text-3xl'>
                            Create new transaction
                        </p>
                        <div className=''>
                            <div className='mx-auto max-w-3xl flex justify-between items-center'>
                                <div className={`rounded-full w-10 h-10 flex justify-center items-center ${currentStep >= 1 ? 'bg-brand text-white' : 'bg-white text-brand border-2 border-brand'} `}>1</div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className={`rounded-full w-10 h-10 flex justify-center items-center ${currentStep >= 2 ? 'bg-brand text-white' : 'bg-white text-brand border-2 border-brand'}`}>2</div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className='bg-brand rounded-full w-2 h-2'></div>
                                <div className={`rounded-full w-10 h-10 flex justify-center items-center ${currentStep === 3 ? 'bg-brand text-white' : 'bg-white text-brand border-2 border-brand'}`}>3</div>
                            </div>
                        </div>
                        {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} />}
                        {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} />}
                        {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} />}
                    </div>
            }
        </div>
    )
}

export default CreateTransaction