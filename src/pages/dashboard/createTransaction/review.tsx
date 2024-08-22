import React from 'react'
import { CreateTransactionInputType } from './type'

type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const Review: React.FC<Props> = ({ }) => {
    return (
        <div>Review</div>
    )
}

export default Review