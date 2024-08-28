import { CONTRACTS_ENDPOINTS } from "@/config/api";
import { AXIOS_INSTANCE } from "@/config/axios";
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export interface ContractListType {
    id: number;
    counter_party: {
        id: number;
        email: string;
    };
    message: {
        text: string;
        hex: string;
    };
}

type ContractInfoType = {
    id: number;
    customer: {
        id: number;
        name: string;
        filled: number;
    };
    vendor: {
        id: number;
        name: string;
        filled: number;
    };
    lockbox: {
        amount: number;
        filled: number;
    };
    contract: string[];
    attachments: string[];
    end_date: string;
    budget: string;
    message: {
        text: string;
        hex: string;
        step: number;
    };
};

type ContractContextType = {
    contract: ContractInfoType | null
    contractList: ContractListType[]
    isContractListLoading: boolean
    isContractLoading: boolean
    isSwitchedCustomer: boolean
    setIsSwitchedCustomer: React.Dispatch<React.SetStateAction<boolean>>
    selectedContract: string
    setSelectedContract: React.Dispatch<React.SetStateAction<string>>
    getContractList: () => Promise<void>
    getContract: (id: number) => Promise<void>
}

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
    const [contract, setContract] = useState<ContractInfoType | null>(null);
    const [contractList, setContractList] = useState<ContractListType[]>([]);
    const [isContractListLoading, setIsContractListLoading] = useState(false);
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [isSwitchedCustomer, setIsSwitchedCustomer] = useState(false);
    const [selectedContract, setSelectedContract] = useState<string>("");


    const getContract = async (id: number) => {
        setSelectedContract(id.toString())
        try {
            setIsContractLoading(true);
            const resp = await AXIOS_INSTANCE.get(`${CONTRACTS_ENDPOINTS.GET_CONTRACT}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            setContract(resp.data.data);
            console.log(resp.data.data);
            setIsContractLoading(false);
        } catch (error: Error | any) {
            toast.error("Failed to fetch contract");
        } finally {
            setIsContractLoading(false);
        }
    };

    const getContractList = async () => {
        try {
            setIsContractListLoading(true);
            const resp = await AXIOS_INSTANCE.get(`${CONTRACTS_ENDPOINTS.GET_CONTRACT_LIST}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            setContractList(resp.data.data.results);
            // console.log("=========>>>", resp.data.data.results)
            const firstContract = resp.data.data.results[0];
            getContract(firstContract.id);
            setSelectedContract(firstContract.id.toString());
            setIsContractListLoading(false);
        } catch (error: Error | any) {
            toast.error("Failed to fetch contract list");
        } finally {
            setIsContractListLoading(false);
        }

    };



    const value = {
        contract,
        contractList,
        isContractListLoading,
        isContractLoading,
        isSwitchedCustomer, setIsSwitchedCustomer,
        getContractList,
        getContract,
        selectedContract, setSelectedContract
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
}

export const useContract = () => useContext(ContractContext)