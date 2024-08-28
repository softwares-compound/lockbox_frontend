import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useContract } from '@/context/contractContext'


const DetailAndActions: React.FC = () => {
    const contractContext = useContract()
    console.log("contract ========================", contractContext?.contract)
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-12">
                <div className='overflow-hidden col-span-1 '>
                    <Label htmlFor="name" className='text-white '>contract</Label>
                    <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center">
                        <a href={contractContext?.contract?.contract[0]} target="_blank">document.pdf</a>
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
                    <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white text-brand p-1 rounded-3xl text-center">
                        {
                            contractContext?.contract?.attachments?.map((attachment, index) => (
                                <a key={index} href={attachment} target="_blank"> attachment {index + 1}</a>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <Label htmlFor="phone" className='text-brand cursor-default'>Contract status</Label>
                    <Button variant="outline" className=' border hover:text-white w-full'>
                        <span>Cancel transaction</span>
                    </Button>
                </div>
                <div>
                    <Label htmlFor="phone" className='text-brand cursor-default'>Contract status</Label>
                    <Button type="submit" variant="outline" className=' min-w-20 border hover:text-white w-full' >
                        <span>Edit transaction</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DetailAndActions