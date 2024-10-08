import React, { useEffect, useState } from 'react'
import { FILE_UPLOAD_URL } from '@/config/api'
import { AXIOS_INSTANCE } from '@/config/axios'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Loader2, MoveLeft, Paperclip, X } from 'lucide-react'
import { FileInput, FileUploader, FileUploaderContent } from '@/components/ui/file-uploader'
import { FileWithExtension, useContract } from '@/context/contractContext'
import { cn, countFileTypes, updateFilesWithUrls } from '@/lib/utils'
import CurrencyInput from 'react-currency-input-field';
import Cookies from 'js-cookie'
import { format } from "date-fns"
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from 'react-router-dom'

type FormDataType = {
    deadline: Date | undefined
    transaction_value: { float?: number | undefined, formatted: string | undefined, value: string | undefined }
    contract_file: FileWithExtension[]
    additional_attachments: FileWithExtension[]
}


const EditTransaction: React.FC = () => {
    const navigate = useNavigate()
    const contractContext = useContract()
    const [formData, setFormData] = useState<FormDataType>({
        deadline: undefined,
        transaction_value: {
            formatted: "",
            value: "",
        },
        additional_attachments: [],
        contract_file: [],
    })
    // console.log("no contract===========", contractContext?.contract)
    useEffect(() => {
        if (!contractContext?.contract) {
            navigate("/dashboard")
        } else {
            setFormData({
                deadline: new Date(contractContext?.contract?.end_date ?? ""),
                transaction_value: {
                    formatted: contractContext?.contract?.budget,
                    value: contractContext?.contract?.budget,
                },
                additional_attachments: contractContext?.contract?.attachments ? contractContext?.contract?.attachments : [],
                contract_file: contractContext?.contract?.contract ? contractContext?.contract?.contract : [],
            })
        }
    }, [])

    const [noDateError, setNoDateError] = useState<boolean>(false)
    const [transactionValueError, setTransactionValueError] = useState<boolean>(false)
    const [contractFileError, setContractFileError] = useState<boolean>(false)

    async function uploadFilesToUrls(filesWithUrl: FileWithExtension[]) {
        try {
            toast.loading("Uploading files...")
            // Create an array of promises for each file upload
            const uploadPromises = filesWithUrl.map(async (fileInfo) => {
                // console.log("=-=-=-", fileInfo)
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

    const getFileUploadUrls = async (files: FileWithExtension[], fileType: "contract" | "additional") => {
        // console.log("files added ===>>> ", files)
        const fileList = files.map(file => file.file)
        console.log(fileList)
        try {
            const response = await AXIOS_INSTANCE.post(FILE_UPLOAD_URL.GET_URL, {
                count: countFileTypes(fileList).count
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            })
            const fileWithKeyAndUrl = updateFilesWithUrls(files, response.data.data)
            // console.log(fileWithKeyAndUrl)
            // console.log(formData.contract_file)
            if (fileType === "contract") {
                setFormData((prev) => ({ ...prev, contract_file: [...fileWithKeyAndUrl, ...formData.contract_file] }))
            } else {
                setFormData((prev) => ({ ...prev, additional_attachments: [...fileWithKeyAndUrl, ...formData.additional_attachments], }))
            }
            void uploadFilesToUrls(fileWithKeyAndUrl)
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        }
    }
    // console.log("=-=-=-=-=", formData)
    const handleSubmit = async () => {
        if (!formData.deadline) {
            setNoDateError(true)
            return
        }
        if (!formData.transaction_value.value) {
            setTransactionValueError(true)
            return
        }
        if (formData.contract_file.length === 0) {
            setContractFileError(true)
            return
        }

        // console.log(formData)
        await contractContext?.editTransaction(Number(contractContext?.contract?.id), formData as FormDataType)
        navigate("/dashboard")

    }

    return (
        <div className='w-full text-start text-brand pb-10'>
            <div className='mt-4 mb-5 md:-mb-10 flex justify-between px-4'>
                <button className='flex items-center gap-2 font-bold' onClick={() => navigate("/dashboard")}><MoveLeft className="h-5 w-5" /><p>Back</p></button>
                {/* <div><Button variant="outline">Edit profile</Button></div> */}
            </div>
            <div className='max-w-sm mx-auto my-10 text-center flex flex-col'>
                <h1 className='text-3xl font-bold text-center my-10'>Edit Transaction</h1>
                <div className='my-4 '>
                    <Label htmlFor="deadline" className='text-center text-brand'>What is the transaction deadline?<span className="text-red-500 text-base">*</span></Label>
                    <br />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    " sm:w-[360px] px-5 justify-center text-center font-normal",
                                    !formData.deadline && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-5 w-5 text-brand/50" />
                                {formData.deadline ? format(formData.deadline ?? new Date(), "PPP") : <span className="text-brand/50">Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto ">
                            <Calendar
                                mode="single"
                                selected={formData.deadline}
                                onSelect={(value) => {
                                    setNoDateError(false)
                                    setFormData({ ...formData, deadline: value })
                                }}
                                disabled={{ before: new Date() }}
                                initialFocus={true}
                            />
                        </PopoverContent>
                    </Popover>
                    {/* <div className='w-full border-2  h-10 bg-brand rounded-full flex justify-center'>
                        <DatePicker className={"w-full mx-auto h-9  text-center text-xl rounded-full text-brand px-2 border-none outline-none"} icon={<CalendarIcon className="mr-2 h-5 w-5 text-brand/50" />} selected={formData.deadline} onChange={(value) => {
                            setNoDateError(false)
                            setFormData({ ...formData, deadline: value ? new Date(value) : undefined })
                        }} />
                    </div> */}
                    {noDateError && <p className="text-red-500 text-base">{"Transaction deadline is required"}</p>}
                </div>
                <div className='my-4'>
                    <Label htmlFor="transaction_value" className='text-center text-brand'>Value<span className="text-red-500">*</span></Label>
                    <div className='max-w-[360px] mx-auto'>
                        <CurrencyInput
                            id="transaction_value"
                            // name="transaction_value"
                            placeholder="eg: 10,000"
                            // defaultValue={""}
                            decimalsLimit={2}
                            prefix="$"
                            value={formData.transaction_value.value}
                            onValueChange={(_value, _name, values) => {
                                setTransactionValueError(false)
                                setFormData({
                                    ...formData, transaction_value: {
                                        float: values?.float ?? undefined,
                                        formatted: values?.formatted,
                                        value: values?.value
                                    }
                                })
                            }}
                            className="flex h-10 w-full text-center rounded-3xl text-brand border-2 border-brand bg-background px-3 py-2 text-base md:text-xl ring-offset-background file:border-0 file:bg-transparent file:text-xl file:font-medium placeholder:text-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    {transactionValueError && <p className="text-red-500 text-base">Transaction value is required</p>}
                </div>
                <div className='my-4 py-2'>
                    <Label htmlFor="counter_party" className='text-center text-brand'>upload contract<span className="text-red-500 text-base">*</span></Label>
                    <FileUploader
                        value={[]}
                        onValueChange={(fileList) => {
                            if (fileList && fileList.length) {
                                const dataToStore = fileList.filter((file) => file instanceof File && file.name).map((file) => ({
                                    key: "",
                                    extension: "",
                                    url: "",
                                    file: file,
                                }))
                                setContractFileError(false)
                                void getFileUploadUrls(dataToStore, "contract")
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
                                {formData.contract_file?.map((_file, i) => (
                                    <div key={i} className=' flex gap-4 items-center'>
                                        <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFormData((prev) => ({ ...prev, contract_file: prev.contract_file?.filter((_, index) => index !== i) || null }))} />
                                        <a href={_file.url} className='text-brand text-xl'>{"document" + " " + (i + 1)}</a>
                                    </div>
                                ))}
                            </div>
                        </FileUploaderContent>
                    </FileUploader>
                    {contractFileError && <p className="text-red-500 text-base">Contract file is required</p>}
                </div>
                <div className='my-4 py-2'>
                    <Label htmlFor="counter_party" className='text-center text-brand'>upload additional attachments</Label>
                    <FileUploader
                        value={[]}
                        onValueChange={(fileList) => {
                            if (fileList && fileList.length) {
                                const dataToStore = fileList.filter((file) => file instanceof File && file.name).map((file) => ({
                                    key: "",
                                    extension: "",
                                    url: "",
                                    file: file,
                                }))
                                setContractFileError(false)
                                void getFileUploadUrls(dataToStore, "additional")
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
                                {formData.additional_attachments?.map((_file, i) => (
                                    <div key={i} className=' flex gap-4 items-center'>
                                        <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFormData((prev) => ({ ...prev, additional_attachments: prev.additional_attachments?.filter((_, index) => index !== i) || null }))} />
                                        <p >{"document" + " " + (i + 1)}</p>
                                    </div>
                                ))}
                            </div>
                        </FileUploaderContent>
                    </FileUploader>
                </div>
                <Button
                    type="submit"
                    variant="outline"
                    className=' min-w-20 bg-green-500 hover:bg-green-700  text-white hover:text-white border-0 outline-none  w-full'
                    onClick={handleSubmit}
                    disabled={contractContext?.loading.editTransaction}
                >
                    {
                        contractContext?.loading.editTransaction
                            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                            : <span className='px-1 text-lg'>submit</span>
                    }
                </Button>
            </div>
        </div>
    )
}

export default EditTransaction