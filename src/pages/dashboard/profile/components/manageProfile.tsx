import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
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
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/authContext';

export type FileWithExtension = {
    key: string;
    extension: string;
    url: string;
    file: File;  // Adding the actual File object
};

export type FileUploadApiResponse = {
    key: string;
    extension: string;
    url: string;
};

const ManageProfile: React.FC = () => {
    const authContext = useAuth()
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filesWithUrl, setFilesWithUrl] = useState<FileWithExtension[]>([])
    const [name, setName] = useState<string>(authContext?.userData?.name || '')
    const [companyName, setCompanyName] = useState<string>(authContext?.userData?.company || '')
    const [noProfileImageError, setNoProfileImageError] = useState<boolean>(false)
    const [noNameError, setNoNameError] = useState<boolean>(false)
    const [noCompanyNameError, setNoCompanyNameError] = useState<boolean>(false)

    async function uploadFilesToUrls(filesWithKeyAndUrl: FileWithExtension[]) {
        try {
            // setIsLoading(true)
            // Create an array of promises for each file upload
            const uploadPromises = filesWithKeyAndUrl.map(async (fileInfo) => {
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
            // setIsLoading(false)
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
            console.log(fileWithKeyAndUrl)
            setFilesWithUrl(fileWithKeyAndUrl)
            void uploadFilesToUrls(fileWithKeyAndUrl)
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        }
    }

    const handleSubmit = async () => {
        console.log(filesWithUrl)
        console.log(name)
        if (!name) {
            setNoNameError(true)
            return
        }
        if (!filesWithUrl.length) {
            setNoProfileImageError(true)
            return
        }
        if (!companyName) {
            setNoCompanyNameError(true)
            return
        }
        await authContext?.editProfile({ file: filesWithUrl[0], name: name, company: companyName })
    }
    return (
        <div className='text-center'>
            <div className=''>
                <Label htmlFor="counter_party">Upload company logo<span className="text-red-500">*</span></Label>
                <FileUploader
                    value={[]}
                    onValueChange={(fileList) => {
                        if (fileList && fileList.length) {
                            setNoProfileImageError(false)
                            const dataToStore = fileList.map((file) => ({
                                key: "",
                                extension: "",
                                url: "",
                                file: file,
                            }))
                            void getFileUploadUrls(dataToStore)
                        }
                    }}
                    dropzoneOptions={{ multiple: false, maxFiles: 100, maxSize: 10 * 1024 * 1024 * 1024, accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] } }}
                    className=""
                >
                    <FileInput className='text-center mx-auto my-2'>
                        <div className="flex items-center justify-between px-2 h-32 w-full border-2 bg-background rounded-full">
                            {/* <Paperclip className="h-6 w-6 text-brand" /> */}
                            <p></p>
                            <p className="text-brand/40">Drag and drop the image or click to upload</p>
                            <p></p>
                        </div>
                    </FileInput>
                    <FileUploaderContent className="">
                        <div className=' max-w-[720px] mx-auto text-brand'>
                            {filesWithUrl.map((file, i) => (
                                <div key={i} className=' flex gap-4 items-center'>
                                    <X className="h-6 w-6 cursor-pointer hover:text-red-600" onClick={() => setFilesWithUrl([])} />
                                    <p >{file.file.name}</p>
                                </div>
                            ))}
                        </div>
                    </FileUploaderContent>
                </FileUploader>
                {noProfileImageError && <p className="text-red-500 text-base">{"Please upload company logo"}</p>}
            </div>

            <div className='text-brand'>
                <Label htmlFor="counter_party">Name<span className="text-red-500">*</span></Label>
                <Input
                    className="text-center mx-auto my-2"
                    placeholder=''
                    disabled={false}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setNoNameError(false)
                    }}
                />
                {noNameError && <p className="text-red-500 text-base">{"Name is required"}</p>}
            </div>

            <div className='text-brand'>
                <Label htmlFor="counter_party">Company Name<span className="text-red-500">*</span></Label>
                <Input
                    className="text-center mx-auto my-2"
                    placeholder=''
                    disabled={false}
                    value={companyName}
                    onChange={(e) => {
                        setCompanyName(e.target.value)
                        setNoCompanyNameError(false)
                    }}
                />
                {noCompanyNameError && <p className="text-red-500 text-base">{"Company name is required"}</p>}
            </div>

            <div className=''>
                <Label htmlFor="counter_party " className=''>email</Label>
                <Input
                    className="text-center mx-auto my-2 text-brand"
                    placeholder=''
                    disabled={true}
                    value={authContext?.userData?.email}
                />
            </div>

            <div className='mt-10'>
                <Button type="submit" variant="default" className='px-10' onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default ManageProfile