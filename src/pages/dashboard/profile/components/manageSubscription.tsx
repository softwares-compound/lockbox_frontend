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
import { useAuth } from '@/context/authContext';


const ManageSubscription: React.FC = () => {
    const authContext = useAuth();
    const [updatedPlan, setUpdatedPlan] = useState(1);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [isUpdateSubscriptionLoading, setIsUpdateSubscriptionLoading] = useState(false);
    const [planList, setPlanList] = useState<SubscriptionListType[]>([]);

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
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsTableLoading(false)
        }
    }
    useEffect(() => {
        void getSubscriptionList()
    }, [])

    const handleUpdateSubscription = async () => {
        try {
            setIsUpdateSubscriptionLoading(true)
            await AXIOS_INSTANCE.patch(`${SUBSCRIPTION_ENDPOINTS.SUBSCRIPTION_UPDATE}/${updatedPlan}`, {
                subscription: updatedPlan
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
        }
    }
    return (
        <div className="min-h-[30vh] flex justify-center items-center">
            {
                isTableLoading ? <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand" />
                    :
                    <Table>
                        <TableCaption>
                            <Button variant="default" className='md:px-20' onClick={() => handleUpdateSubscription()} disabled={isUpdateSubscriptionLoading}>
                                {isUpdateSubscriptionLoading ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-white" /> : "Continue"}
                            </Button>
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Tier</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {planList.map((plan) => (
                                <TableRow key={plan.id}>
                                    <TableCell className="font-medium">{plan.tier}</TableCell>
                                    <TableCell>{plan.details}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='w-full'>
                                            <Button variant={updatedPlan === plan.id ? "default" : "outline"} onClick={() => setUpdatedPlan(plan.id)}>
                                                {plan.price}
                                            </Button>
                                            {authContext?.userData?.subscription === plan.id ? <p className='text-large text-brand/50'>Currency plan</p> : ""}
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