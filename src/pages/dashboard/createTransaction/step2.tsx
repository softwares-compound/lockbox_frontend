import React from 'react'
import { CreateTransactionInputType } from './type'

type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const Step2: React.FC<Props> = ({ }) => {
    return (
        <div>Step2</div>
    )
}

export default Step2