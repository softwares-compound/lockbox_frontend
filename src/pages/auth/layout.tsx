import React, { ReactNode } from 'react'


type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className='w-full text-start'>
            <nav>hello world</nav>
            <div className="flex items-center text-start justify-center min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default Layout;
