import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateTransactionInputType, FileWithExtension } from './type'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Loader2, Paperclip, X } from 'lucide-react'
import {
    FileUploader,
    FileInput,
    FileUploaderContent,
} from "@/components/ui/file-uploader";
import { countFileTypes, updateFilesWithUrls } from '@/lib/utils'
import { AXIOS_INSTANCE } from '@/config/axios'
import { FILE_UPLOAD_URL } from '@/config/api'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

type Props = {
    formData: CreateTransactionInputType,
    setFormData: React.Dispatch<React.SetStateAction<CreateTransactionInputType>>
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    role: string,
    setRole: React.Dispatch<React.SetStateAction<string>>
}

const Step2: React.FC<Props> = ({ formData, setFormData, setCurrentStep }) => {
    const { handleSubmit, formState: { errors } } = useForm<CreateTransactionInputType>({
        defaultValues: formData,
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [noTransactionContract, setNoTransactionContract] = useState<boolean>(false)

    async function uploadFilesToUrls(filesWithUrl: FileWithExtension[]) {
        try {
            setIsLoading(true)
            // Create an array of promises for each file upload
            const uploadPromises = filesWithUrl.map(async (fileInfo) => {
                const response = await AXIOS_INSTANCE.put(fileInfo.url, fileInfo.file, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                    },
                });
                console.log("s3 response ======>>>>> ", response.data)
            });
            // Execute all upload requests in parallel
            const uploadResults = await Promise.all(uploadPromises);
            console.log('All files uploaded successfully:', uploadResults);
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setIsLoading(false)
        }
    }

    const getFileUploadUrls = async (files: FileWithExtension[], fileType: "contract" | "additional") => {
        const fileList = files.map(file => file.file)
        try {
            const response = await AXIOS_INSTANCE.post(FILE_UPLOAD_URL.GET_URL, {
                count: countFileTypes(fileList).count
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            })
            const fileWithKeyAndUrl = updateFilesWithUrls(files, response.data.data)
            if (fileType === "contract") {
                setFormData((prev) => ({ ...prev, transaction_contract_file: [...fileWithKeyAndUrl, ...prev.transaction_contract_file] }))
            } else {
                setFormData((prev) => ({ ...prev, additional_attachments: [...fileWithKeyAndUrl, ...prev.additional_attachments] }))
            }
            void uploadFilesToUrls(fileWithKeyAndUrl)
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        }
    }

    const onSubmit = async () => {
        // console.log(formData.transaction_contract_file.length)
        if (!formData.transaction_contract_file.length) {
            setNoTransactionContract(true)
            return
        }
        setCurrentStep(3)
    }
    console.log("step 2===>> ", formData)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
            <div className=''>
                <Label htmlFor="counter_party">Upload transaction contract<span className="text-red-500">*</span></Label>
                <FileUploader
                    value={formData.transaction_contract_file.map((file) => file.file)}
                    onValueChange={(fileList) => {
                        if (fileList && fileList.length) {
                            setNoTransactionContract(false)
                            const dataToStore = fileList.map((file) => ({
                                key: "",
                                extension: "",
                                url: "",
                                file: file,
                            }))
                            void getFileUploadUrls(dataToStore, "contract")
                        }
                    }}
                    dropzoneOptions={{ multiple: true, maxFiles: 100, maxSize: 10 * 1024 * 1024 * 1024 }}
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
                            {formData.transaction_contract_file?.map((file, i) => (
                                <div key={i} className=' flex gap-4 items-center'>
                                    <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFormData((prev) => ({ ...prev, transaction_contract_file: prev.transaction_contract_file?.filter((_, index) => index !== i) || null }))} />
                                    <p >{file.file.name}</p>
                                </div>
                            ))}
                        </div>
                    </FileUploaderContent>
                </FileUploader>
                {noTransactionContract && <p className="text-red-500 text-base">{"Please upload transaction contract"}</p>}
            </div>
            <div className='space-y-2 '>
                <div className=''>
                    <Label htmlFor="counter_party">Upload additional attachments (if any)</Label>
                    <FileUploader
                        value={formData.additional_attachments.map((file) => file.file)}
                        onValueChange={(fileList) => {
                            if (fileList && fileList.length) {
                                setNoTransactionContract(false)
                                const dataToStore = fileList.map((file) => ({
                                    key: "",
                                    extension: "",
                                    url: "",
                                    file: file,
                                }))
                                void getFileUploadUrls(dataToStore, "additional")
                            }
                        }}
                        dropzoneOptions={{ multiple: true, maxFiles: 100, maxSize: 10 * 1024 * 1024 * 1024 }}
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
                                        <p >{file.file.name}</p>
                                    </div>
                                ))}
                            </div>
                        </FileUploaderContent>
                    </FileUploader>
                    {errors.counter_party && <p className="text-red-500">{errors.counter_party.message}</p>}
                </div>
            </div>
            <div className='flex justify-end gap-6 '>
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <span><ArrowLeft /></span>
                    <span>Previous</span>
                </Button>
                <Button type="submit" variant="outline" disabled={isLoading} className='min-w-20'>
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

export default Step2