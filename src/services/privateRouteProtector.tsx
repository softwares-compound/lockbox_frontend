import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AXIOS_INSTANCE } from '@/config/axios';
import { useAuth } from '@/context/authContext';
import { AUTH_ENDPOINTS } from '@/config/api';
import Cookies from 'js-cookie';
import BrandLoader from '@/components/brandLoader';

type Props = {
    children: ReactNode
}


const PrivateRouteProtector: React.FC<Props> = ({ children }) => {
    const auth = useAuth()
    const navigate = useNavigate()
    // const { tenant } = useParams<{ tenant: string }>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // fetch if the user's cookies are valid then skip signin
        async function checkStatus() {
            try {
                setIsLoading(true);
                const accessToken = Cookies.get('accessToken');
                const res = await AXIOS_INSTANCE.get("auth/v1/validation", {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });
                const data = await res.data.data;
                auth?.setIsAuthenticated(true);
                auth?.setUserData({ ...data });
                // const newPath = location.pathname.replace(`/${tenant}`, `/${localStorage.getItem("X-Request-ID")}`);
                // navigate(AUTH_ROUTES.SIGNIN, { replace: true });
            } catch (error) {
                auth?.setIsAuthenticated(false);
                auth?.setUserData(null);
                navigate(AUTH_ENDPOINTS.LOGIN, { replace: true });
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

            } finally {
                setIsLoading(false);
            }
        }
        checkStatus();
    }, []);

    if (isLoading) {
        return <BrandLoader />;
    }
    return (
        <>
            {auth?.isAuthenticated === true ? (
                children
            ) : null}
        </>
    );
}

export default PrivateRouteProtector