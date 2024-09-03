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

type ModalStateType = {
    submitDeliverables: boolean,
    resubmitDeliverables: boolean,
    editDeliverable: boolean
    viewDeliverables: boolean
    reviewFeedback: boolean
    editTransaction: boolean
}

export type FileWithExtension = {
    key: string;
    extension: string;
    url: string;
    file: File;  // Adding the actual File object
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
    cancelTransaction: (id: number) => Promise<void>
    editDeliverables: (id: number, body: {
        text: string
        fileData: FileWithExtension[]
    }) => Promise<void>
    declineTransaction: (id: number) => Promise<void>
    editTransaction: (id: number) => Promise<void>
    approveTransaction: (id: number) => Promise<void>
    reviewFeedback: (id: number) => Promise<
        {
            text: string
            files: string[]
        }>
    submitDeliverables: (id: number, body: {
        text: string
        fileData: FileWithExtension[]
    }) => Promise<void>
    resubmitDeliverables: (id: number, body: {
        text: string
        fileData: FileWithExtension[]
    }) => Promise<void>
    viewDeliverables: (id: number) => Promise<{
        text: string
        files: string[]
    }>
    loading: LoadingTypes
    setLoading: React.Dispatch<React.SetStateAction<LoadingTypes>>
    modalDataLoading: boolean
    setModalDataLoading: React.Dispatch<React.SetStateAction<boolean>>
    modalState: ModalStateType
    setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>

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
        editTransaction: false, //-> modify
        declineTransaction: false,
        approveTransaction: false,
        reviewFeedback: false,
        submitDeliverables: false,
        resubmitDeliverables: false,
        viewDeliverables: false,
        editDeliverable: false, //-> edit
    });
    const [modalDataLoading, setModalDataLoading] = useState<boolean>(false);
    const [modalState, setModalState] = useState<ModalStateType>({
        submitDeliverables: false,
        resubmitDeliverables: false,
        viewDeliverables: false,
        editDeliverable: false,
        reviewFeedback: false,
        editTransaction: false
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
            toast.success("Contract cancelled successfully");
        } catch (error: Error | any) {
            toast.error("Failed to cancel contract");
        } finally {
            setLoading({ ...loading, cancelTransaction: false });
            getContract(id);
            // getContractList();
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
            getContract(id);
            // getContractList();
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
            getContract(id);
            // getContractList();
        }
    }



    const submitDeliverables = async (id: number, body: {
        text: string
        fileData: FileWithExtension[]
    }) => {
        try {
            setLoading({ ...loading, submitDeliverables: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.SUBMIT}/${id}`, {
                action: "SUBMIT",
                deliverable: {
                    text: body.text,
                    fileData: body.fileData.map((file: FileWithExtension) => file.key),
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            toast.success("deliverables submitted successfully");
        } catch (error: Error | any) {
            toast.error("Failed to submit contract");
        } finally {
            getContract(id);
            // getContractList();
            setModalState({ ...modalState, submitDeliverables: false });
            setLoading({ ...loading, submitDeliverables: false });
        }
    }

    const resubmitDeliverables = async (id: number, body: {
        text: string
        fileData: FileWithExtension[]
    }) => {
        try {
            setLoading({ ...loading, resubmitDeliverables: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.RESUBMIT}/${id}`,
                {
                    action: "RESUBMIT",
                    deliverable: {
                        text: body.text,
                        fileData: body.fileData.map((file: FileWithExtension) => file.key),
                    }
                }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            toast.success("deliverables resubmitted successfully");
        } catch (error: Error | any) {
            toast.error("Failed to re-submit contract");
        } finally {
            getContract(id);
            // getContractList();
            setModalState({ ...modalState, resubmitDeliverables: false });
            setLoading({ ...loading, resubmitDeliverables: false });
        }
    }

    const viewDeliverables = async (id: number) => {
        try {
            setLoading({ ...loading, viewDeliverables: true });
            const resp = await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.VIEW}/${id}`, {
                action: "VIEW",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            return resp.data.data
        } catch (error: Error | any) {
            toast.error("Failed to view deliverables");
            return { text: "", files: [] }
        } finally {
            setLoading({ ...loading, viewDeliverables: false });
        }
    }

    const reviewFeedback = async (id: number) => {
        console.log("review feedback", id)
        try {
            setLoading({ ...loading, reviewFeedback: true });
            const resp = await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.REVIEW}/${id}`, {
                action: "REVIEW",
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            return resp.data.data
        } catch (error: Error | any) {
            toast.error("Failed to review contract");
            return { text: "", files: [] }
        } finally {
            // getContract(id);
            // getContractList();
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
            getContract(id);
            // getContractList();
            setLoading({ ...loading, editTransaction: false });
        }
    }



    const editDeliverables = async (id: number, body: {
        text: string
        fileData: FileWithExtension[]
    }) => {
        try {
            setLoading({ ...loading, editDeliverable: true });
            await AXIOS_INSTANCE.patch(`${CONTRACT_ACTIONS_ENDPOINTS.EDIT}/${id}`, {
                action: "EDIT",
                deliverable: {
                    text: body.text,
                    fileData: body.fileData.map((file: FileWithExtension) => file.key),
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            toast.success("deliverables edited successfully");
        } catch (error: Error | any) {
            toast.error("Failed to edit deliverables");
        } finally {
            setLoading({ ...loading, editDeliverable: false });
            setModalState({ ...modalState, editDeliverable: false });
            getContract(id);
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
        loading, setLoading,
        modalDataLoading, setModalDataLoading,
        modalState, setModalState,
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
}

export const useContract = () => useContext(ContractContext)