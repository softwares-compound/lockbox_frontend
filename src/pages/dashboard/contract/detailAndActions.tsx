import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useContract } from '@/context/contractContext'
import { addEllipsis } from '@/lib/utils'


const DetailAndActions: React.FC = () => {
    const contractContext = useContract()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-12">
            <div className='overflow-hidden col-span-1 '>
                <Label htmlFor="name" className='text-white '>Transaction contract</Label>
                <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl text-center">
                    {
                        contractContext?.contract?.transaction_contract?.map((file, index) => (
                            <p key={index}>{addEllipsis(file, 15, 5)}</p>
                        ))
                    }
                </div>
            </div>
            <div className='col-span-1 '>
                <Label htmlFor="email" className='text-white '>Transaction deadline</Label>
                <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl min-h-10 text-center">{contractContext?.contract?.transaction_deadline?.toLocaleDateString()} </p>
            </div>
            <div className='col-span-1 '>
                <Label htmlFor="phone" className='text-white '>Transaction value</Label>
                <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl text-center">${contractContext?.contract?.transaction_value.toFixed(2)} </p>
            </div>
            <div className='overflow-hidden col-span-1 '>
                <Label htmlFor="phone" className='text-white '>Attachments</Label>
                <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl text-center">
                    {
                        contractContext?.contract?.additional_attachments?.map((attachment, index) => (
                            <p key={index}>{addEllipsis(attachment, 15, 5)}</p>
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
    )
}

export default DetailAndActions