import { useContract } from '@/context/contractContext'
import React from 'react'

// type Props = {}

const ContractStatus: React.FC = () => {
    const contractContext = useContract()
    return (

        <div className=" bg-white text-brand ">
            <div className="mt-[3px] px-2 md:px-20 ">
                <p className='text-2xl md:text-3xl'>
                    Review transaction request to
                </p>
                <div className='my-12'>
                    <div className='mx-auto max-w-3xl flex justify-between items-center'>
                        <div className={`rounded-full border-[5px] border-brand w-20 md:w-32 h-20 md:h-32 flex justify-center items-center ${contractContext?.contract?.vendor.filled === 1 ? 'bg-brand text-white' : 'bg-white text-brand'} `}>
                            <p className='text-lg'>{contractContext?.contract?.vendor.name ?? ""}</p>
                        </div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2 md:block hidden'></div>
                        <div className={`rounded-full border-[5px] border-brand w-32 h-32 md:w-52 md:h-52 flex flex-col justify-center items-center bg-white text-brand`}>
                            <p className="font-bold">${contractContext?.contract?.lockbox.amount ?? 0}</p>
                            <p className="text-lg">Transaction lockbox</p>
                        </div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2 md:block hidden'></div>
                        <div className={`rounded-full border-[5px] border-brand w-20 md:w-32 h-20 md:h-32 flex justify-center items-center ${contractContext?.contract?.customer.filled === 1 ? 'bg-brand text-white' : 'bg-white text-brand'} `}>
                            <p className='text-lg'>{contractContext?.contract?.customer.name ?? ""}</p>
                        </div>
                    </div>
                </div>
                <div className='px-6 md:px-10 lg:px-28 my-12'>
                    <div className='mx-auto max-w-3xl flex justify-between items-center'>
                        <div className={`rounded-full w-10 h-10 flex justify-center items-center border-2 ${contractContext?.contract?.message.step === 1 ? 'bg-brand text-white' : 'bg-white text-brand'} relative`}>
                            <p>1</p>
                            <p className={`absolute top-10 -left-4 text-[${contractContext?.contract?.message.hex}] text-base`}>{contractContext?.contract?.message.step === 1 ? contractContext?.contract?.message.text : ""}</p>
                        </div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className={`rounded-full w-10 h-10 flex justify-center items-center border-2 ${contractContext?.contract?.message.step === 2 ? 'bg-brand text-white' : 'bg-white text-brand'} relative`}>
                            <p>2</p>
                            <p className={`absolute top-10 -left-4 text-[${contractContext?.contract?.message.hex}] text-base`}>{contractContext?.contract?.message.step === 2 ? contractContext?.contract?.message.text : ""}</p>
                        </div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className='bg-brand rounded-full w-2 h-2'></div>
                        <div className={`rounded-full w-10 h-10 flex justify-center items-center border-2 ${contractContext?.contract?.message.step === 3 ? 'bg-brand text-white' : 'bg-white text-brand'} relative`}>
                            <p>3</p>
                            <p className={`absolute top-10 -left-4 text-[${contractContext?.contract?.message.hex}] text-base`}>{contractContext?.contract?.message.step === 3 ? contractContext?.contract?.message.text : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractStatus