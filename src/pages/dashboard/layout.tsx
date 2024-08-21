/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CowzfwdSDEY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import image from '@/assets/logo_full.png';
import { AlignJustify } from "lucide-react"

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()
    return (
        <div>
            <nav className="flex items-center justify-between px-4 py-2 h-[7vh] bg-white dark:bg-gray-800">
                <a href="#" className="flex items-center gap-2" >
                    <img
                        src={image} // Replace with your logo path
                        alt="Logo"
                        width={120} // Adjust size as needed
                        height={120} // Adjust size as needed
                        onClick={() => navigate('/dashboard')}
                    />
                </a>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="link" size="icon" className="">
                            <AlignJustify className="h-10 w-10 text-primary" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="border-0 rounded-l-3xl">
                        <div className="grid w-full p-4 debug">
                            <a href="#" className="text-lg font-medium hover:underline underline-offset-4" >
                                Home
                            </a>
                            <a href="#" className="text-lg font-medium hover:underline underline-offset-4" >
                                About
                            </a>
                            <a href="#" className="text-lg font-medium hover:underline underline-offset-4" >
                                Services
                            </a>
                            <a href="#" className="text-lg font-medium hover:underline underline-offset-4" >
                                Portfolio
                            </a>
                            <a href="#" className="text-lg font-medium hover:underline underline-offset-4" >
                                Contact
                            </a>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
            <div className="min-h-[93vh]">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout

