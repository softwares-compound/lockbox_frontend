import { useContract } from '@/context/contractContext'
import React from 'react'

// type Props = {}

const ContractStatus: React.FC = () => {
    const contractContext = useContract()
    // console.log(contractContext?.contract?.message)
    return (

        <div className=" bg-white text-brand ">
            <div className="mt-[3px] px-2 md:px-20 ">
                <p className='text-2xl md:text-3xl font-semibold'>
                    transaction request
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
                        <div className={`rounded-full border-[5px] border-brand w-32 h-32 md:w-52 md:h-52 flex flex-col justify-center items-center ${contractContext?.contract?.lockbox.filled === 1 ? 'bg-brand text-white' : 'bg-white text-brand'}`}>
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
                            {
                                contractContext?.contract?.message.hex === "#d6b91d" ?
                                    <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#d6b91d]`}>{contractContext?.contract?.message.step === 1 ? contractContext?.contract?.message.text : ""}</p>
                                    : contractContext?.contract?.message.hex === "#2ed279" ?
                                        <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#2ed279]`}>{contractContext?.contract?.message.step === 1 ? contractContext?.contract?.message.text : ""}</p>
                                        : contractContext?.contract?.message.hex === "#e40000" ?
                                            <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#e40000]`}>{contractContext?.contract?.message.step === 1 ? contractContext?.contract?.message.text : ""}</p>
                                            : <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-brand`}>{contractContext?.contract?.message.step === 1 ? contractContext?.contract?.message.text : ""}</p>
                            }
                            {/* <p className={`absolute top-10 -left-4 text-[${contractContext?.contract?.message.hex}] text-base`}>
                                {contractContext?.contract?.message.step === 1 ? contractContext?.contract?.message.text : ""}
                            </p> */}
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
                            {
                                contractContext?.contract?.message.hex === "#d6b91d" ?
                                    <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#d6b91d]`}>{contractContext?.contract?.message.step === 2 ? contractContext?.contract?.message.text : ""}</p>
                                    : contractContext?.contract?.message.hex === "#2ed279" ?
                                        <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#2ed279]`}>{contractContext?.contract?.message.step === 2 ? contractContext?.contract?.message.text : ""}</p>
                                        : contractContext?.contract?.message.hex === "#e40000" ?
                                            <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#e40000]`}>{contractContext?.contract?.message.step === 2 ? contractContext?.contract?.message.text : ""}</p>
                                            : <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-brand`}>{contractContext?.contract?.message.step === 2 ? contractContext?.contract?.message.text : ""}</p>
                            }
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
                            {
                                contractContext?.contract?.message.hex === "#d6b91d" ?
                                    <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#d6b91d]`}>{contractContext?.contract?.message.step === 3 ? contractContext?.contract?.message.text : ""}</p>
                                    : contractContext?.contract?.message.hex === "#2ed279" ?
                                        <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#2ed279]`}>{contractContext?.contract?.message.step === 3 ? contractContext?.contract?.message.text : ""}</p>
                                        : contractContext?.contract?.message.hex === "#e40000" ?
                                            <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-[#e40000]`}>{contractContext?.contract?.message.step === 3 ? contractContext?.contract?.message.text : ""}</p>
                                            : <p className={`text-base md:text-lg absolute top-10 -left-30 min-w-[300px] text-brand`}>{contractContext?.contract?.message.step === 3 ? contractContext?.contract?.message.text : ""}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractStatus