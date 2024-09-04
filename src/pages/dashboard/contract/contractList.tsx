import { useContract } from '@/context/contractContext'
import React from 'react'

// type Props = {}

const ContractList: React.FC = () => {
    const contractContext = useContract()
    return (
        <div className="overflow-auto  md:h-[80vh] h-[70vh] rounded-t-3xl px-4">
            {
                contractContext?.contractList?.map((contract, index) => (
                    <button
                        key={index}
                        className={`
                                p-2 py-4 my-1 w-full text-brand cursor-pointer hover:bg-[#c4cdff] 
                                ${contractContext.selectedContract === String(contract.id) ? 'bg-[#c4cdff]' : 'bg-white'} 
                                ${index === 0 ? 'rounded-t-3xl' : ''}`
                        }
                        onClick={() => {
                            contractContext.getContract(contract.id)
                            console.log(contract.message.hex)
                        }}
                        disabled={contractContext.isContractLoading}
                    >
                        <p className='text-xl font-bold'>{contract.counter_party.email}</p>
                        <p className={`text-base md:text-lg text-[${contract.message.hex}]`}>{contract.message.text}</p>
                    </button>
                ))
            }
        </div>
    )
}

export default ContractList