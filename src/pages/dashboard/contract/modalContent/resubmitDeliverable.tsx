import { FILE_UPLOAD_URL } from '@/config/api'
import { AXIOS_INSTANCE } from '@/config/axios'
import { Label } from '@/components/ui/label'
import { Loader2, Paperclip, X } from 'lucide-react'
import { FileInput, FileUploader, FileUploaderContent } from '@/components/ui/file-uploader'
import { Textarea } from '@/components/ui/textarea'
import { FileWithExtension, useContract } from '@/context/contractContext'
import { addEllipsis, countFileTypes, updateFilesWithUrls } from '@/lib/utils'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'

type FormDataType = {
    text: string
    fileData: FileWithExtension[]
}

const ResubmitDeliverable: React.FC = () => {
    const contractContext = useContract()
    const [formData, setFormData] = useState<FormDataType>({
        text: "",
        fileData: [],
    })
    const [errors, setErrors] = useState<{ text: boolean; file: boolean }>({ text: false, file: false })

    async function uploadFilesToUrls(filesWithUrl: FileWithExtension[]) {
        try {
            toast.loading("Uploading files...")
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
            toast.dismiss()
        }
    }

    const getFileUploadUrls = async (files: FileWithExtension[]) => {
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
            setFormData((prev) => ({ ...prev, fileData: [...fileWithKeyAndUrl, ...prev.fileData] }))
            void uploadFilesToUrls(fileWithKeyAndUrl)
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        }
    }

    const handleSubmit = async () => {
        let hasError = false;

        if (formData.text === "") {
            setErrors((prev) => ({ ...prev, text: true }))
            hasError = true;
        }
        if (formData.fileData.length === 0) {
            setErrors((prev) => ({ ...prev, file: true }))
            hasError = true;
        }
        if (hasError) return;

        await contractContext?.resubmitDeliverables(Number(contractContext?.contract?.id), formData as FormDataType)
    }
    return (
        <div>
            <div className='py-2'>
                <Label htmlFor="counter_party" className='text-center text-white'>tell the customer what you did<span className="text-red-500">*</span></Label>
                <Textarea
                    placeholder="start typing..."
                    value={formData.text}
                    onChange={(e) => {
                        setErrors((prev) => ({ ...prev, text: false }))
                        setFormData({ ...formData, text: e.target.value })
                    }
                    }
                    rows={5}
                />
                {errors.text && <p className="text-red-500">This field is required</p>}
            </div>
            <div className='py-2'>
                <Label htmlFor="counter_party" className='text-center text-white'>upload deliverable/proof of work<span className="text-red-500">*</span></Label>
                <FileUploader
                    value={formData.fileData.map((data) => data.file)}
                    onValueChange={(fileList) => {
                        if (fileList && fileList.length) {
                            const dataToStore = fileList.map((file) => ({
                                key: "",
                                extension: "",
                                url: "",
                                file: file,
                            }))
                            void getFileUploadUrls(dataToStore)
                            setFormData((prev) => ({ ...prev, fileData: dataToStore }));
                            setErrors((prev) => ({ ...prev, file: false }));
                        }
                    }}
                    dropzoneOptions={{ multiple: true, maxFiles: 100, maxSize: 10 * 1024 * 1024 * 1024 }}
                    className=""
                >
                    <FileInput className='max-w-[420px] text-center mx-auto my-2'>
                        <div className="flex items-center justify-between px-2 h-16 w-full border-2 bg-background rounded-full">
                            <Paperclip className="h-6 w-6 text-brand" />
                            <p className="text-brand/40">drag attachment or click to upload</p>
                            <p></p>
                        </div>
                    </FileInput>
                    <FileUploaderContent className="">
                        <div className=' max-w-[720px] mx-auto'>
                            {formData.fileData?.map((file, i) => (
                                <div key={i} className=' flex gap-4 items-center'>
                                    <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFormData((prev) => ({ ...prev, transaction_contract_file: prev.fileData?.filter((_, index) => index !== i) || null }))} />
                                    <p >{addEllipsis(file.file.name, 25, 5)}</p>
                                </div>
                            ))}
                        </div>
                    </FileUploaderContent>
                </FileUploader>
                {errors.file && <p className="text-red-500">This field is required</p>}
            </div>
            <Button
                type="submit"
                variant="outline"
                className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none  w-full'
                onClick={handleSubmit}
                disabled={contractContext?.loading.resubmitDeliverables}
            >
                {
                    contractContext?.loading.resubmitDeliverables
                        ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                        : <span className='px-1 text-lg'>re-submit deliverables </span>
                }
            </Button>
        </div>
    )
}

export default ResubmitDeliverable