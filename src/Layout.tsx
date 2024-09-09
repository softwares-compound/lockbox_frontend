import React, { ReactNode, useState } from 'react'
// import Sidebar from './components/Sidebar'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from './assets/logo_full.png'

type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // console.log(auth)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex flex-col md:flex-row h-screen'>
            {/* <div className={`fixed z-10 md:static top-0 left-0 w-64 bg-neutral-50 h-full transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0`}>
                <Sidebar />
            </div> */}
            <div className='flex-1 flex flex-col overflow-hidden'>
                <div className='md:hidden flex justify-between items-center p-4 bg-neutral-50'>
                    <Link className="flex items-center gap-2 text-neutral-600" to="#">
                        <img src={logo} style={{ width: '80px', height: 'auto' }} />
                    </Link>
                    <button onClick={toggleSidebar} className='text-neutral-600'>
                        {
                            isSidebarOpen ? <X /> : <Menu />
                        }
                    </button>
                </div>
                <div className='flex-1 h-full overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
