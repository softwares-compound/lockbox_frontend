
import { Label } from '@/components/ui/label'
import { Loader2, Paperclip } from 'lucide-react'
import { useContract } from '@/context/contractContext'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type FormDataType = {
    text: string
    files: string[]
}

const ViewDeliverable: React.FC = () => {
    const contractContext = useContract()
    const [formData, setFormData] = useState<FormDataType>({
        text: "",
        files: [],
    })
    const [isDataLoading, setIsDataLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsDataLoading(true)
            const resp = await contractContext?.viewDeliverables(Number(contractContext?.contract?.id))
            console.log("resp --------------", resp)
            setFormData({ text: resp?.text ?? "", files: resp?.files ?? [] })
            setIsDataLoading(false)
        }
        fetchData()
    }, [])
    const handleSubmit = async () => {
        // await contractContext?.viewDeliverables(Number(contractContext?.contract?.id), formData as FormDataType)
    }
    return (
        <div>
            {
                isDataLoading ? <div className='w-full h-full flex justify-center items-center'>
                    <Loader2 className="mx-auto animate-spin h-14 w-14" />
                </div> :
                    <div>
                        <div className='py-2'>
                            <Label htmlFor="counter_party" className='text-center text-white'>customer notes</Label>
                            <div className='p-2 min-h-40 rounded-xl bg-white text-brand'>
                                <p>{formData.text}</p>
                            </div>
                        </div>
                        <div className='py-2'>
                            <Label htmlFor="counter_party" className='text-center text-white'>attachment</Label>
                            {
                                formData.files.length === 0
                                    ? <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl min-h-10 text-center">No attachment</p>
                                    :
                                    formData.files.map((file, index) => (
                                        <div className="flex justify-start items-center my-2 px-4 gap-2 placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center">
                                            <Paperclip /> <a href={file} target="_blank">document{index + 1}.pdf</a>
                                        </div>
                                    ))
                            }
                        </div>
                        <Button
                            type="submit"
                            variant="outline"
                            className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none  w-full'
                            onClick={handleSubmit}
                        // disabled={contractContext?.loading.ViewDeliverables}
                        >
                            {
                                // contractContext?.loading.ViewDeliverables
                                false
                                    ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                    : <span className='px-1 text-lg'>submit feedback </span>
                            }
                        </Button>
                    </div>
            }
        </div>
    )
}

export default ViewDeliverable