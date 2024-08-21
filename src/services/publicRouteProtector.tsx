import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

type Props = {
    children: ReactNode;
};

const PublicRouteProtector: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        console.log(accessToken);

        if (accessToken) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate, location]); // Dependency on location to trigger useEffect on route change

    return <>{children}</>;
};

export default PublicRouteProtector;