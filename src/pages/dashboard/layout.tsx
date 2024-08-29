import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import image from '@/assets/logo_full.png';
import { AlignJustify } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

type Props = {
    children: ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const authContext = useAuth();
    const navigate = useNavigate();

    return (
        <div className="text-base md:text-xl lg:text-xl">
            <nav className="flex items-center justify-between px-2 md:px-4 py-2 h-[10vh] bg-white dark:bg-gray-800">
                <a onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
                    <img
                        src={image} // Replace with your logo path
                        alt="Logo"
                        // className="w-20 h-20 md:w-30 md:h-20" // Adjust size as needed
                        width={150} // Adjust size as needed
                        onClick={() => navigate('/dashboard')}
                    />
                </a>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <Button variant="outline">Transaction drafts</Button>
                    </div>
                    <div className="hidden md:block">
                        <Button variant="default" onClick={() => navigate('/create-transaction')}>Create new transactions</Button>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="link" size="icon" className="">
                                <AlignJustify className="h- w- md:h-12 md:w-12 text-brand" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="border-0 rounded-l-3xl">
                            <div className="w-full flex flex-col gap-4 md:gap-6 mt-4">
                                <SheetClose
                                    className="flex items-center gap-2 md:gap-4 text-brand hover:bg-brand/20 p-2 rounded-3xl cursor-pointer"
                                    onClick={() => navigate('/profile')}
                                >
                                    <div className="rounded-full border-2 border-brand">
                                        <img src="https://via.placeholder.com/60" alt="" className="rounded-full" width={80} height={80} />
                                    </div>
                                    <div className="">
                                        <p className="font-medium  text-xl  md:text-2xl">{authContext?.userData?.company}</p>
                                        <p className="text-base md:text-lg">{authContext?.userData?.email}</p>
                                    </div>
                                </SheetClose>
                                <div className="flex justify-between items-center gap-2 md:gap-4 bg-brand text-white p-2 rounded-3xl">
                                    <div>
                                        <p className="text-xl md:text-3xl font-medium">${authContext?.userData?.balance ?? 76786}</p>
                                        <p className="text-base md:text-xl">Current balance</p>
                                    </div>
                                    <SheetClose>
                                        <Button variant="link" className="bg-white text-base md:text-xl" onClick={() => navigate('//transactions')}>
                                            Manage
                                        </Button>
                                    </SheetClose>
                                </div>
                                <div className="flex flex-col gap-2 md:gap-4">
                                    <SheetClose onClick={() => navigate('/create-transaction')} className="text-start text-base md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                        Complete transactions
                                    </SheetClose>
                                    {/* <button onClick={() => navigate('/create-transaction')} className="text-start text-base md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                        Manage payment methods
                                    </button> */}
                                    <SheetClose onClick={() => navigate('/profile')} className="text-start text-base md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                        Manage subscription
                                    </SheetClose>
                                    <SheetClose onClick={() => navigate('/dashboard')} className="text-start md:hidden text-base md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                        Transaction drafts
                                    </SheetClose>
                                    <SheetClose onClick={() => navigate('/create-transaction')} className="text-start md:hidden text-base md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                        Create new transactions
                                    </SheetClose>
                                </div>
                            </div>
                            <footer className="mt-[5vh] text-center text-base md:text-base">
                                <p>Not you? <span><button onClick={() => authContext?.logout()} className="text-brand hover:underline">Logout</button></span></p>
                            </footer>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
            <div className="min-h-[88vh] md:pl-5">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
