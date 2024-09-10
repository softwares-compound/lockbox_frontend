import React from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@headlessui/react'
import ContractList from './contractList'
import ContractStatus from './contractStatus'
import DetailAndActions from './detailAndActions'
import { useContract } from '@/context/contractContext'
import { Loader2 } from 'lucide-react'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(60, 79, 195, 0.44)',
    },
};

const Contract: React.FC = () => {
    const contractContext = useContract()

    return (
        <main className="w-full text-center text-2xl ">
            <Modal
                isOpen={contractContext?.isContractLoading === true || contractContext?.isContractListLoading === true}
                style={customStyles}
                // className={ }
                contentLabel="Example Modal"
            >
                <Loader2 className="mx-auto h-10 w-10 text-brand animate-spin" />
            </Modal>
            <div className="mx-auto w-full ">
                <h1 className="sr-only">Page title</h1>
                {/* Main 3 column grid */}
                <div className="grid grid-cols-1 items-start lg:grid-cols-3 lg:gap-0 ">
                    {/* Left column */}
                    <div className="grid grid-cols-1">
                        <section aria-labelledby="section-2-title" className=' bg-brand text-white px-4 py-0 rounded-t-3xl'>
                            <div className="my-4">
                                <p className='my-1'>Transaction</p>
                                <div className="flex justify-center items-center ">
                                    <Label htmlFor="type" className='text-white'>Customer</Label>
                                    <Switch
                                        checked={contractContext?.isSwitchedCustomer}
                                        onChange={(value) => {
                                            contractContext?.setIsSwitchedCustomer(value)
                                            if (value === true) {
                                                contractContext?.setContractListFilter((prev) => ({ ...prev, vendor: true, customer: false }))
                                            } else {
                                                contractContext?.setContractListFilter((prev) => ({ ...prev, vendor: false, customer: true }))
                                            }
                                        }}
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
                    <div className=" lg:col-span-2 flex flex-col justify-between h-full">
                        <section aria-labelledby="section-1-title" className="py-10">
                            <ContractStatus />
                        </section>
                        <section aria-labelledby="section-1-title" className="p-10 bg-brand text-white">
                            <DetailAndActions />
                        </section >
                    </div >
                </div >
            </div >
        </main >
    )
}

export default Contract