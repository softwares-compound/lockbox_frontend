import React, { ReactNode } from 'react';
import image from '@/assets/logo_full.png';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()
    return (
        <div className='w-full text-start min-h-screen text-xl'>
            <nav className='flex items-center p-4 min-h-[9vh]'>
                <div className='flex items-center'>
                    <img
                        src={image} // Replace with your logo path
                        alt="Logo"
                        width={150} // Adjust size as needed
                        height={150} // Adjust size as needed
                        onClick={() => navigate('/sign-in')}
                    />
                </div>
            </nav>
            <div className="flex items-center text-start justify-center pb-20 align-middle min-h-[90vh]">
                {children}
            </div>
        </div>
    );
};

export default Layout;
