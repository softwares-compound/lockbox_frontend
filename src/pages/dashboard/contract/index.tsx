import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// import { Switch } from '@/components/ui/switch'
import { useContract } from '@/context/contractContext'
import { addEllipsis } from '@/lib/utils'
import { Switch } from '@headlessui/react'
import React, { useState } from 'react'
import ContractList from './contractList'
import ContractStatus from './contractStatus'

const Contract: React.FC = () => {
    const contractContext = useContract()
    const [enabled, setEnabled] = useState(false)
    return (
        <main className="w-full text-center text-2xl ">
            <div className="mx-auto w-full  ">
                <h1 className="sr-only">Page title</h1>
                {/* Main 3 column grid */}
                <div className="grid grid-cols-1 items-start md:grid-cols-3 lg:gap-0 ">
                    {/* Left column */}
                    <div className="grid grid-cols-1 ">
                        <section aria-labelledby="section-2-title" className=' bg-brand text-white px-4 py-0  rounded-t-3xl'>
                            <div className="my-4">
                                <p className='my-1'>Transaction</p>
                                <div className="flex justify-center items-center ">
                                    <Label htmlFor="type" className='text-white'>Customer</Label>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 data-[checked]:bg-indigo-200"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                        />
                                    </Switch>
                                    <Label htmlFor="type" className='text-white'>Vendor</Label>
                                </div>
                            </div>
                            {/* Contract list */}
                            <ContractList />
                        </section>
                    </div>


                    {/* Right column */}
                    <div className="grid grid-cols-1 md:col-span-2">
                        <ContractStatus />
                        <section aria-labelledby="section-1-title" className="py-7 md:h-[301px] bg-brand text-white">
                            <div className="overflow-hidden  ">
                                <div className="p-1 sm:p-2 md:p-6">
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-12">
                                            <div className='overflow-hidden col-span-1 min-w-40'>
                                                <Label htmlFor="name" className='text-white '>Transaction contract</Label>
                                                <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl text-center">
                                                    {
                                                        contractContext?.contract?.transaction_contract?.map((file, index) => (
                                                            <p key={index}>{addEllipsis(file, 15, 5)}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-span-1 min-w-40'>
                                                <Label htmlFor="email" className='text-white '>Transaction deadline</Label>
                                                <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl min-h-10 text-center">{contractContext?.contract?.transaction_deadline?.toLocaleDateString()} </p>
                                            </div>
                                            <div className='col-span-1 min-w-40'>
                                                <Label htmlFor="phone" className='text-white '>Transaction value</Label>
                                                <p className="placeholder:text-brand/40 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl text-center">${contractContext?.contract?.transaction_value.toFixed(2)} </p>
                                            </div>
                                            <div className='overflow-hidden col-span-1 min-w-40'>
                                                <Label htmlFor="phone" className='text-white '>Attachments</Label>
                                                <div className="placeholder:text-brand/40 min-h-10 border-2 text-lg md:text-xl border-brand bg-white p-1 rounded-3xl text-center">
                                                    {
                                                        contractContext?.contract?.additional_attachments?.map((attachment, index) => (
                                                            <p key={index}>{addEllipsis(attachment, 15, 5)}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-4 col-span-2'>
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
                                    </div>
                                </div>

                            </div >
                        </section >
                    </div >
                </div >
            </div >
        </main >
    )
}

export default Contract