import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CalendarClock, FileClock, LayoutGrid, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../assets/logo_full.png'
import { useAuth } from "@/context/authContext";

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
    const auth = useAuth();
    return (
        <div className={cn("pb-12 h-full relative", className)}>
            <div className="space-y-4 py-1">
                <Link className="flex items-center gap-2 px-4 py-2 text-neutral-600" to="#">
                    <img src={logo} width="150" />
                </Link>
                <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-sm text-start font-semibold tracking-tight flex items-center justify-start">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Dashboard
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="w-full justify-start"
                        >
                            <FileClock className="mr-4 h-4 w-4" />
                            Timesheet
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <CalendarClock className="mr-4 h-4 w-4" />
                            Calender
                        </Button>
                    </div>
                </div>
                {/* <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-sm text-start font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <ListMusic className="mr-2 h-4 w-4" />
                            Playlists
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Music2 className="mr-2 h-4 w-4" />
                            Songs
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Made for You
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Mic2 className="mr-2 h-4 w-4" />
                            Artists
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Library className="mr-2 h-4 w-4" />
                            Albums
                        </Button>
                    </div>
                </div> */}
                <Button
                    variant="link"
                    size="sm"
                    className=" justify-start absolute bottom-4 left-4 text-neutral-600 hover:text-red-600 hover:no-underline"
                    onClick={() => auth?.logout()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
};
export default Sidebar;