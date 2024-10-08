import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useContract } from '@/context/contractContext'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'
import SubmitDeliverable from './modalContent/submitDeliverable'
import ResubmitDeliverable from './modalContent/resubmitDeliverable'
import ViewDeliverable from './modalContent/viewDeliverable'
import EditDeliverable from './modalContent/editDeliverable'
import ReviewFeedback from './modalContent/reviewFeedback'
import { useNavigate } from 'react-router-dom'
const Action: React.FC = () => {
    const contractContext = useContract()
    const navigate = useNavigate()

    return (
        <>
            {
                contractContext?.contract?.actions.includes("CANCEL") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>
                        <Button
                            variant="outline"
                            className=' border hover:text-white w-full '
                            onClick={async () => {
                                try {
                                  await contractContext.cancelTransaction(Number(contractContext?.contract?.id));
                                  // Refresh the page after the transaction is canceled
                                  window.location.reload();
                                } catch (error) {
                                  console.error("Failed to cancel the transaction", error);
                                }
                              }}
                            disabled={contractContext.loading.cancelTransaction}
                        >
                            {
                                contractContext.loading.cancelTransaction
                                    ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                    : <span className='px-1 text-lg'>cancel transaction </span>
                            }
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("DECLINE") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>
                        <Button
                            type="submit"
                            variant="outline"
                            className=' min-w-20 bg-red-500 hover:bg-red-700 hover:text-white text-white border-0 outline-none  w-full'
                            onClick={() => contractContext.declineTransaction(Number(contractContext?.contract?.id))}
                            disabled={contractContext.loading.declineTransaction}
                        >
                            {
                                contractContext.loading.declineTransaction
                                    ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                    : <span className='px-1 text-lg'>decline transaction </span>
                            }
                        </Button>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("APPROVE") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>
                        <Button
                            type="submit"
                            variant="outline"
                            className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none w-full'
                            onClick={() => contractContext.approveTransaction(Number(contractContext?.contract?.id))}
                            disabled={contractContext.loading.approveTransaction}
                        >
                            {
                                contractContext.loading.approveTransaction
                                    ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                    : <span className='px-1 text-lg'>approve transaction </span>
                            }
                        </Button>
                    </div>
                )
            }
            {/* ***************** */}
            {/* ***************** */}
            {/* ***************** */}
            {
                contractContext?.contract?.actions.includes("MODIFY") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>
                        <Button
                            type="submit" variant="outline"
                            className=' min-w-20 border hover:text-white w-full'
                            onClick={() => navigate(`/edit-transaction/${Number(contractContext?.contract?.id)}`)}
                        >
                            {
                                contractContext?.loading.editTransaction
                                    ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                    : <span className='px-1 text-lg'>edit transaction </span>
                            }
                        </Button>
                        {/* <Dialog open={contractContext?.modalState.editTransaction} onOpenChange={(state) => contractContext?.setModalState({ ...contractContext?.modalState, editTransaction: state })}>
                            <DialogTrigger asChild>
                                
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-brand text-white border-2 border-white">
                                <DialogHeader>
                                    <DialogTitle className=" text-2xl md:text-3xl font-semibold px-2">Edit transaction</DialogTitle>
                                    <DialogDescription className="text-base  px-2">
                                        Change the details as per the requirements.
                                    </DialogDescription>
                                </DialogHeader>
                                <EditTransaction />
                            </DialogContent>
                        </Dialog> */}
                    </div>
                )
            }
            {/* ***************** */}
            {/* ***************** */}
            {/* ***************** */}


            {/* ###################################### */}
            {/* ########## OPEN MODAL ############# */}
            {/* ###################################### */}
            {
                contractContext?.contract?.actions.includes("REVIEW") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>

                        <Dialog open={contractContext?.modalState.reviewFeedback} onOpenChange={(state) => contractContext?.setModalState({ ...contractContext?.modalState, reviewFeedback: state })}>
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=' min-w-20 bg-red-500 hover:bg-red-700 hover:text-white text-white border-0 outline-none w-full'
                                    onClick={() => contractContext?.reviewFeedback(Number(contractContext?.contract?.id))}
                                    disabled={contractContext?.loading.reviewFeedback}
                                >
                                    {
                                        contractContext?.loading.reviewFeedback
                                            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                            : <span className='px-1 text-lg'>review feedback </span>
                                    }
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-brand text-white border-2 border-white">
                                <DialogHeader>
                                    <DialogTitle className=" text-xl md:text-2xl text-center font-semibold text-white px-2">review transaction feedback</DialogTitle>
                                </DialogHeader>
                                <ReviewFeedback />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("SUBMIT") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>

                        <Dialog open={contractContext.modalState.submitDeliverables} onOpenChange={(state) => contractContext.setModalState({ ...contractContext.modalState, submitDeliverables: state })}>
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none  w-full'
                                >
                                    {
                                        contractContext.loading.submitDeliverables
                                            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                            : <span className='px-1 text-lg'>submit deliverable </span>
                                    }
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-brand text-white border-2 border-white">
                                <DialogHeader>
                                    <DialogTitle className=" text-xl md:text-2xl text-center font-semibold text-white px-2">submit deliverables</DialogTitle>
                                    {/* <DialogDescription className="text-base text-brand/50 px-2">
                                        Additional attachments uploaded while creation the contract.
                                    </DialogDescription> */}
                                </DialogHeader>
                                <SubmitDeliverable />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("RESUBMIT") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>
                        <Dialog open={contractContext.modalState.resubmitDeliverables} onOpenChange={(state) => contractContext.setModalState({ ...contractContext.modalState, resubmitDeliverables: state })}>
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=' min-w-20 bg-green-500 hover:bg-green-700 hover:text-white text-white border-0 outline-none w-full'
                                >
                                    {
                                        contractContext.loading.resubmitDeliverables
                                            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                            : <span className='px-1 text-lg'>resubmit deliverable </span>
                                    }
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-brand text-white border-2 border-white">
                                <DialogHeader>
                                    <DialogTitle className=" text-xl md:text-2xl text-center font-semibold text-white px-2">re-submit transaction details</DialogTitle>
                                </DialogHeader>
                                <ResubmitDeliverable />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("VIEW") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>
                        <Dialog open={contractContext?.modalState.viewDeliverables} onOpenChange={(state) => contractContext?.setModalState({ ...contractContext?.modalState, viewDeliverables: state })}>
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=' min-w-20 border hover:text-white w-full'
                                >
                                    {
                                        contractContext?.loading.viewDeliverables
                                            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                            : <span className='px-1 text-lg'>view deliverable </span>
                                    }
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-brand text-white border-2 border-white">
                                <DialogHeader>
                                    <DialogTitle className=" text-xl md:text-2xl text-center font-semibold text-white px-2">view deliverable</DialogTitle>
                                </DialogHeader>
                                <ViewDeliverable />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
            {
                contractContext?.contract?.actions.includes("EDIT") && (
                    <div>
                        <Label htmlFor="phone" className='text-brand cursor-default'>.</Label>

                        <Dialog open={contractContext?.modalState.editDeliverable} onOpenChange={(state) => contractContext?.setModalState({ ...contractContext?.modalState, editDeliverable: state })}>
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=' min-w-20 border hover:text-white w-full'
                                >
                                    {
                                        contractContext?.loading.editDeliverable
                                            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                                            : <span className='px-1 text-lg'>edit deliverable </span>
                                    }
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-brand text-white border-2 border-white">
                                <DialogHeader>
                                    <DialogTitle className=" text-xl md:text-2xl text-center font-semibold text-white px-2">edit deliverable</DialogTitle>
                                </DialogHeader>
                                <EditDeliverable />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }

        </>
    )
}

export default Action