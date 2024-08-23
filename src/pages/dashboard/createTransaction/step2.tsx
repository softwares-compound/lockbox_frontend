import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateTransactionInputType } from './type'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Paperclip, X } from 'lucide-react'
import {
    FileUploader,
    FileInput,
    FileUploaderContent,
} from "@/components/ui/file-uploader";
import { DropzoneOptions } from "react-dropzone";

type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const Step2: React.FC<Props> = ({ formData, setFormData, setCurrentStep }) => {
    const { handleSubmit, formState: { errors } } = useForm<CreateTransactionInputType>({
        defaultValues: formData,
    })
    const [noTransactionContract, setNoTransactionContract] = useState<boolean>(false)
    const dropzone = {
        accept: {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'], // You can add more image formats if needed
        },
        multiple: true,
        maxFiles: 10,
        maxSize: 1 * 1024 * 1024,
    } satisfies DropzoneOptions;

    const onSubmit = (data: CreateTransactionInputType) => {
        if (!formData.transaction_contract_file) {
            setNoTransactionContract(true)
            return
        }
        setFormData({ ...formData, ...data })
        setCurrentStep(3)
    }
    console.log(formData)
    useEffect(() => {

    }, [formData])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
            <div className=''>
                <Label htmlFor="counter_party">Upload transaction contract<span className="text-red-500">*</span></Label>
                <FileUploader
                    value={formData.transaction_contract_file ? [formData.transaction_contract_file] : []}
                    onValueChange={(fileList) => {
                        if (fileList && fileList.length) {
                            setNoTransactionContract(false)
                            const f = fileList[fileList.length - 1]
                            setFormData((prev) => ({ ...prev, transaction_contract_file: f }))
                        }
                    }}
                    dropzoneOptions={dropzone}
                    className=""
                >
                    <FileInput className='max-w-[420px] text-center mx-auto my-2'>
                        <div className="flex items-center justify-between px-2 h-20 w-full border-2 bg-background rounded-full">
                            <Paperclip className="h-6 w-6" />
                            <p className="text-brand/40">Drag and drop the attachment or click to upload</p>
                            <p></p>
                        </div>
                    </FileInput>
                    <FileUploaderContent className="">
                        {
                            formData.transaction_contract_file ? (
                                <div className=' max-w-[720px] mx-auto flex gap-4 items-center'>
                                    <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFormData((prev) => ({ ...prev, transaction_contract_file: null }))} />
                                    <p>{formData.transaction_contract_file?.name}</p>
                                </div>
                            ) : null
                        }
                    </FileUploaderContent>
                </FileUploader>
                {noTransactionContract && <p className="text-red-500">{"Please upload transaction contract"}</p>}
            </div>
            <div className='space-y-2 '>
                <div className=''>
                    <Label htmlFor="counter_party">Upload additional attachments (if any)</Label>
                    <FileUploader
                        value={formData.additional_attachments}
                        onValueChange={(file) => {
                            if (file && file.length) {
                                setFormData((prev) => ({ ...prev, additional_attachments: file }))
                            }
                        }}
                        dropzoneOptions={dropzone}
                        className=""
                    >
                        <FileInput className='max-w-[420px] text-center mx-auto my-2'>
                            <div className="flex items-center justify-between px-2 h-20 w-full border-2 bg-background rounded-full">
                                <Paperclip className="h-6 w-6" />
                                <p className="text-brand/40">Drag and drop the attachment or click to upload</p>
                                <p></p>
                            </div>
                        </FileInput>
                        <FileUploaderContent className="">
                            <div className=' max-w-[720px] mx-auto'>
                                {formData.additional_attachments?.map((file, i) => (
                                    <div key={i} className=' flex gap-4 items-center'>
                                        <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFormData((prev) => ({ ...prev, additional_attachments: prev.additional_attachments?.filter((_, index) => index !== i) || null }))} />
                                        <p >{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        </FileUploaderContent>
                    </FileUploader>
                    {errors.counter_party && <p className="text-red-500">{errors.counter_party.message}</p>}
                </div>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
            <div className='flex justify-end gap-6 '>
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <span><ArrowLeft /></span>
                    <span>Previous</span>
                </Button>
                <Button type="submit" variant="outline">
                    <span>Next</span>
                    <span><ArrowRight /></span>
                </Button>
            </div>
        </form>
    )
}

export default Step2