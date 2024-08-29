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


const DetailAndActions: React.FC = () => {
    const contractContext = useContract()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-12">
            <div className='overflow-hidden col-span-1 '>
                <Label htmlFor="name" className='text-white '>contract</Label>
                <div className="flex justify-start items-center px-4 gap-2 placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center">
                    <Paperclip /> <a href={contractContext?.contract?.contract[0]} target="_blank">document.pdf</a>
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
                                        <div className='flex justify-between items-center px-4 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center'>
                                            <Paperclip /> <a key={index} href={attachment} target="_blank"> attachment {index + 1}</a> <span></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            {
                contractContext?.contract?.actions.includes("CANCEL") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button variant="outline" className=' border hover:text-white w-full '>
                            <span className='px-1 text-lg'>cancel transaction </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("MODIFY") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 border hover:text-white w-full' >
                            <span className='px-1 text-lg'>edit transaction</span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("DECLINE") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 bg-red-500 hover:bg-red-700 hover:text-white text-white border-0 outline-none  w-full' >
                            <span className='px-1 text-lg'>decline transaction </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("APPROVE") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none w-full' >
                            <span className='px-1 text-lg'>approve transaction </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("REVIEW") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 bg-red-500 hover:bg-red-700 hover:text-white text-white border-0 outline-none w-full' >
                            <span className='px-1 text-lg'>review feedback </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("SUBMIT") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none  w-full' >
                            <span className='px-1 text-lg'>submit deliverable </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("RESUBMIT") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none w-full' >
                            <span className='px-1 text-lg'>re-submit deliverable </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("VIEW") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 border hover:text-white w-full' >
                            <span className='px-1 text-lg'>view deliverable </span>
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("EDIT") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>a</Label>
                        <Button type="submit" variant="outline" className=' min-w-20 border hover:text-white w-full' >
                            <span className='px-1 text-lg'>edit deliverable </span>
                        </Button>
                    </div>
                )
            }








        </div>
    )
}

export default DetailAndActions