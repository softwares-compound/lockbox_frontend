import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { AXIOS_INSTANCE } from '@/config/axios';
import { SUBSCRIPTION_ENDPOINTS } from '@/config/api';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { SubscriptionListType } from '../type';
import toast from 'react-hot-toast';
// import { useAuth } from '@/context/authContext';


const ManageSubscription: React.FC = () => {
    // const authContext = useAuth();
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [isUpdateSubscriptionLoading, setIsUpdateSubscriptionLoading] = useState(false);
    const [planList, setPlanList] = useState<SubscriptionListType[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    const getSubscriptionList = async () => {
        try {
            setIsTableLoading(true)
            const res = await AXIOS_INSTANCE.get(`${SUBSCRIPTION_ENDPOINTS.SUBSCRIPTION_LIST}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            const data = await res.data.data;
            setPlanList(data)
            // Find the plan with active: true and set the selected plan to its id
            const activePlan = data.find((plan: { active: boolean }) => plan.active === true);
            if (activePlan) {
                setSelectedPlan(activePlan.id); // Assuming `id` is the plan identifier
            }
            console.log(data)
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        } finally {
            setIsTableLoading(false)
        }
    }

    useEffect(() => {
        void getSubscriptionList();
    }, []);

    const handleUpdateSubscription = async () => {
        try {
            setIsUpdateSubscriptionLoading(true)
            await AXIOS_INSTANCE.patch(`${SUBSCRIPTION_ENDPOINTS.SUBSCRIPTION_UPDATE}/${selectedPlan}`, {
                subscription: selectedPlan
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            toast.success("Subscription updated successfully")
            void getSubscriptionList()
        } catch (error: Error | any) {
            toast.error(error.response.data.message)
        } finally {
            setIsUpdateSubscriptionLoading(false)
            window.location.reload();
        }
    }
    console.log(selectedPlan)
    return (
        <div className="min-h-[30vh] flex justify-center items-center">
            {
                isTableLoading ? <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand" />
                    :
                    <Table className="w-full">
                        <TableCaption className="">
                            <Button
                                variant="default"
                                className='md:px-20 w-full md:w-auto'
                                onClick={() => handleUpdateSubscription()}
                                disabled={isUpdateSubscriptionLoading}
                            >
                                {isUpdateSubscriptionLoading ?
                                    <Loader2 className="mx-auto h-5 w-5 animate-spin text-white" /> :
                                    "Continue"}
                            </Button>
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left text-sm md:text-base">Tier</TableHead>
                                <TableHead className="text-sm md:text-base">Details</TableHead>
                                <TableHead className="text-right text-sm md:text-base">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {planList.map((plan) => (
                                <TableRow key={plan.id}>
                                    <TableCell className="font-medium text-sm md:text-base">{plan.tier}</TableCell>
                                    <TableCell>
                                        <div className="text-sm md:text-base">{plan.details}</div>
                                        <div className="text-green-600 text-xs md:text-sm">{plan.offer}</div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className='w-full'>
                                            <Button
                                                variant={String(selectedPlan) === String(plan.id) ? "default" : "outline"}
                                                className="w-full md:w-auto text-xs md:text-base"
                                                onClick={() => setSelectedPlan(String(plan.id))}
                                            >
                                                {plan.price}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


            }
        </div>
    )
}

export default ManageSubscription