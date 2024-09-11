import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useContract } from '@/context/contractContext'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Paperclip } from 'lucide-react'
import Action from './action'


const DetailAndActions: React.FC = () => {
    const contractContext = useContract()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-6">
            <div className='overflow-hidden col-span-1 '>
                <Label htmlFor="name" className='text-white '>contract</Label>
                <div className="flex justify-center items-center px-4 gap-2 placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center">
                    {
                        contractContext?.contract?.contract && contractContext?.contract?.contract.length ?
                            <>
                                <Paperclip /> <a href={contractContext?.contract?.contract ? contractContext?.contract?.contract[0].url : ""} target="_blank">document.pdf</a>
                            </>
                            : <p className='text-center mx-auto'>No document</p>
                    }

                </div>
            </div>
            <div className='col-span-1 '>
                <Label htmlFor="email" className='text-white '>deadline</Label>
                <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl min-h-10 text-center">{new Date(contractContext?.contract?.end_date ?? "").toLocaleDateString()} </p>
            </div>
            <div className='col-span-1 '>
                <Label htmlFor="phone" className='text-white '>value</Label>
                <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center">${contractContext?.contract?.budget} </p>
            </div>
            <div className='overflow-hidden col-span-1 '>
                <Label htmlFor="phone" className='text-white '>attachments</Label>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type="submit" variant="outline" className=' min-w-20 border hover:text-white w-full' >
                                <span className='px-1 text-lg'>click to open</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className=" text-2xl md:text-3xl font-semibold text-brand px-2">Attachment</DialogTitle>
                                <DialogDescription className="text-base text-brand/50 px-2">
                                    Additional attachments uploaded while creation the contract.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-2">
                                {
                                    contractContext?.contract?.attachments?.map((attachment, index) => (
                                        <div className='flex justify-between items-center px-4 my-4 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center'>
                                            <Paperclip /> <a key={index} href={attachment.url} target="_blank"> attachment {index + 1}</a> <span></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Action />



        </div>
    )
}

export default DetailAndActions