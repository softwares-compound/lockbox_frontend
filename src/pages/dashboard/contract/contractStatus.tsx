import React from 'react'

// type Props = {}

const ContractStatus: React.FC = () => {
    return (
        <section aria-labelledby="section-1-title" className="py-10">
            <div className="overflow-hidden bg-white text-brand ">
                <div className="mt-[3px] sm:px-2 md:px-20 ">
                    <p className='text-2xl md:text-3xl'>
                        Review transaction request to
                    </p>
                    <div className='my-12'>
                        <div className='mx-auto max-w-3xl flex justify-between items-center'>
                            <div className={`rounded-full border-[5px] border-brand w-20 md:w-24 h-20 md:h-24 flex justify-center items-center bg-brand text-white `}>You</div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2 md:block hidden'></div>
                            <div className={`rounded-full border-[5px] border-brand w-32 h-32 md:w-52 md:h-52 flex flex-col justify-center items-center bg-white text-brand`}>
                                <p className="font-bold">$0</p>
                                <p className="text-lg">Transaction lockbox</p>
                            </div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2 md:block hidden'></div>
                            <div className={`rounded-full border-[5px] border-brand w-20 md:w-24 h-20 md:h-24 flex justify-center items-center bg-white text-brand `}>You</div>
                        </div>
                    </div>
                    <div className='px-6 md:px-10 lg:px-28 my-12'>
                        <div className='mx-auto max-w-3xl flex justify-between items-center'>
                            <div className={`rounded-full w-10 h-10 flex justify-center items-center  bg-brand text-white relative`}>
                                <p>1</p>
                                <p className='absolute top-10 -left-5 text-brand text-xl'>Deadline</p>
                            </div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className={`rounded-full w-10 h-10 flex justify-center items-center  bg-brand text-white relative`}>
                                <p>2</p>
                                <p className='absolute top-10 -left-5 text-brand text-xl'>Deadline</p>
                            </div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className='bg-brand rounded-full w-2 h-2'></div>
                            <div className={`rounded-full w-10 h-10 flex justify-center items-center  bg-brand text-white relative`}>
                                <p>3</p>
                                <p className='absolute top-10 -left-5 text-brand text-xl'>Deadline</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContractStatus