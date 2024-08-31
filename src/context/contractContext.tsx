import { CONTRACT_ACTIONS_ENDPOINTS, CONTRACTS_ENDPOINTS } from "@/config/api";
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
    actions: string[];
};
type LoadingTypes = {
    cancelTransaction: boolean,
    editTransaction: boolean,
    declineTransaction: boolean,
    approveTransaction: boolean,
    reviewFeedback: boolean,
    submitDeliverables: boolean,
    resubmitDeliverables: boolean,
    viewDeliverables: boolean,
    editDeliverable: boolean,
}
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
    cancelTransaction: (id: number) => Promise<void>
    editDeliverables: (id: number) => Promise<void>
    declineTransaction: (id: number) => Promise<void>
    editTransaction: (id: number) => Promise<void>
    approveTransaction: (id: number) => Promise<void>
    reviewFeedback: (id: number) => Promise<void>
    submitDeliverables: (id: number) => Promise<void>
    resubmitDeliverables: (id: number) => Promise<void>
    viewDeliverables: (id: number) => Promise<void>
    loading: LoadingTypes

}

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
    const [contract, setContract] = useState<ContractInfoType | null>(null);
    const [contractList, setContractList] = useState<ContractListType[]>([]);
    const [isContractListLoading, setIsContractListLoading] = useState(false);
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [isSwitchedCustomer, setIsSwitchedCustomer] = useState(false);
    const [selectedContract, setSelectedContract] = useState<string>("");
    const [loading, setLoading] = useState<LoadingTypes>({
        cancelTransaction: false,
        editTransaction: false,
        declineTransaction: false,
        approveTransaction: false,
        reviewFeedback: false,
        submitDeliverables: false,
        resubmitDeliverables: false,
        viewDeliverables: false,
        editDeliverable: false,
    });


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
            // console.log(resp.data.data);
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

    const cancelTransaction = async (id: number) => {
        try {
            setLoading({ ...loading, cancelTransaction: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.CANCEL}/${id}`,
                {
                    action: "CANCEL",
                }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to cancel contract");
        } finally {
            setLoading({ ...loading, cancelTransaction: false });
        }
    }

    const approveTransaction = async (id: number) => {
        try {
            setLoading({ ...loading, approveTransaction: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.APPROVE}/${id}`,
                {
                    action: "APPROVE",
                }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to approve contract");
        } finally {
            setLoading({ ...loading, approveTransaction: false });
        }
    }

    const declineTransaction = async (id: number) => {
        try {
            setLoading({ ...loading, declineTransaction: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.DECLINE}/${id}`, {
                action: "DECLINE",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to decline contract");
        } finally {
            setLoading({ ...loading, declineTransaction: false });
        }
    }

    const submitDeliverables = async (id: number) => {
        try {
            setLoading({ ...loading, submitDeliverables: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.SUBMIT}/${id}`, {
                action: "SUBMIT",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to submit contract");
        } finally {
            setLoading({ ...loading, submitDeliverables: false });
        }
    }

    const reviewFeedback = async (id: number) => {
        try {
            setLoading({ ...loading, reviewFeedback: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.REVIEW}/${id}`, {
                action: "REVIEW",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to review contract");
        } finally {
            setLoading({ ...loading, reviewFeedback: false });
        }
    }

    const editTransaction = async (id: number) => {
        try {
            setLoading({ ...loading, editTransaction: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.EDIT}/${id}`, {
                action: "MODIFY",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to edit contract");
        } finally {
            setLoading({ ...loading, editTransaction: false });
        }
    }

    const resubmitDeliverables = async (id: number) => {
        try {
            setLoading({ ...loading, resubmitDeliverables: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.RESUBMIT}/${id}`,
                {
                    action: "RESUBMIT",
                }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to re-submit contract");
        } finally {
            setLoading({ ...loading, resubmitDeliverables: false });
        }
    }

    const viewDeliverables = async (id: number) => {
        try {
            setLoading({ ...loading, viewDeliverables: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.VIEW}/${id}`, {
                action: "VIEW",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to view deliverables");
        } finally {
            setLoading({ ...loading, viewDeliverables: false });
        }
    }

    const editDeliverables = async (id: number) => {
        try {
            setLoading({ ...loading, editDeliverable: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.EDIT}/${id}`, {
                action: "EDIT",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
        } catch (error: Error | any) {
            toast.error("Failed to edit deliverables");
        } finally {
            setLoading({ ...loading, editDeliverable: false });
        }
    }


    const value = {
        contract,
        contractList,
        isContractListLoading,
        isContractLoading,
        isSwitchedCustomer, setIsSwitchedCustomer,
        getContractList,
        getContract,
        selectedContract, setSelectedContract,
        cancelTransaction,
        approveTransaction,
        declineTransaction,
        submitDeliverables,
        reviewFeedback,
        editTransaction,
        resubmitDeliverables,
        viewDeliverables,
        editDeliverables,
        loading
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
}

export const useContract = () => useContext(ContractContext)