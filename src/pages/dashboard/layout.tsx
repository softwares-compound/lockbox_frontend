import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
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
        <div className="text-sm md:text-xl lg:text-xl">
            <nav className="flex items-center justify-between px-2 md:px-4 py-2 h-[7vh] bg-white dark:bg-gray-800">
                <a href="#" className="flex items-center gap-2">
                    <img
                        src={image} // Replace with your logo path
                        alt="Logo"
                        // className="w-20 h-20 md:w-30 md:h-20" // Adjust size as needed
                        width={120} // Adjust size as needed
                        onClick={() => navigate('/dashboard')}
                    />
                </a>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="link" size="icon" className="">
                            <AlignJustify className="h-8 w-8 md:h-10 md:w-10 text-brand" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="border-0 rounded-l-3xl">
                        <div className="w-full flex flex-col gap-4 md:gap-6 mt-4">
                            <div
                                className="flex items-center gap-2 md:gap-4 text-brand hover:bg-brand/20 p-2 rounded-3xl cursor-pointer"
                                onClick={() => navigate('/dashboard/profile')}
                            >
                                <div className="rounded-full border-2 border-brand">
                                    <img src="https://via.placeholder.com/60" alt="" className="rounded-full" width={60} height={60} />
                                </div>
                                <div className="text-sm md:text-xl">
                                    <p className="font-medium">{authContext?.userData?.company}</p>
                                    <p className="text-xs md:text-sm">{authContext?.userData?.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2 md:gap-4 bg-brand text-white p-2 rounded-3xl">
                                <div>
                                    <p className="text-xl md:text-xl font-medium">${authContext?.userData?.balance ?? 76786}</p>
                                    <p className="text-sm md:text-xl">Current balance</p>
                                </div>
                                <div>
                                    <Button variant="link" className="bg-white text-xs md:text-sm" onClick={() => navigate('/dashboard/transactions')}>
                                        Manage
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4">
                                <a href="#" className="text-sm md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                    Complete transactions
                                </a>
                                <a href="#" className="text-sm md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                    Manage payment methods
                                </a>
                                <a href="#" className="text-sm md:text-xl font-medium p-2 text-brand hover:bg-brand/20 rounded-3xl">
                                    Manage subscription
                                </a>
                            </div>
                        </div>
                        <footer className="mt-[5vh] text-center text-xs md:text-sm">
                            <p>Not you? <span><a href="#" className="text-brand hover:underline">Logout</a></span></p>
                        </footer>
                    </SheetContent>
                </Sheet>
            </nav>
            <div className="min-h-[93vh]">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
