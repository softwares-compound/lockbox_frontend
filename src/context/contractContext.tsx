import { CONTRACTS_ENDPOINTS } from "@/config/api";
import { AXIOS_INSTANCE } from "@/config/axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export type ContractListType = {
    id: number
    name: string
    description: string
    status: number
    created_at: string
    updated_at: string
}

export type ContractType = {
    id: number
    name: string
    description: string
    status: number
    message: string
    amount: number
    transaction_contract: string[]
    additional_attachments: string[]
    transaction_deadline: Date
    transaction_value: number
    action: string
    created_at: string
    updated_at: string
}

type ContractContextType = {
    contract: ContractType | null
    contractList: ContractListType[]
    isContractListLoading: boolean
    isContractLoading: boolean
    getContractList: () => Promise<void>
    getContract: (id: number) => Promise<void>
}

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
    const [contract, setContract] = useState<ContractType | null>(null);
    const [contractList, setContractList] = useState<ContractListType[]>([]);
    const [isContractListLoading, setIsContractListLoading] = useState(false);
    const [isContractLoading, setIsContractLoading] = useState(false);

    const getContractList = async () => {
        try {
            setIsContractListLoading(true);
            const resp = await AXIOS_INSTANCE.get(`${CONTRACTS_ENDPOINTS.GET_CONTRACT_LIST}`);
            setContractList(resp.data.data);
            setIsContractListLoading(false);
        } catch (error: Error | any) {
            toast.error("Failed to fetch contract list");
        } finally {
            setIsContractListLoading(false);
        }

    };

    const getContract = async (id: number) => {
        try {
            setIsContractLoading(true);
            const resp = await AXIOS_INSTANCE.get(`${CONTRACTS_ENDPOINTS.GET_CONTRACT}/${id}`);
            setContract(resp.data.data);
            setIsContractLoading(false);
        } catch (error: Error | any) {
            toast.error("Failed to fetch contract");
        } finally {
            setIsContractLoading(false);
        }
    };

    const value = {
        contract,
        contractList,
        isContractListLoading,
        isContractLoading,
        getContractList,
        getContract,
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
}

export const useContract = () => useContext(ContractContext)