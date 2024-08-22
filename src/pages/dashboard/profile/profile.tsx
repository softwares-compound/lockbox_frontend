import React from 'react';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/authContext';
import ChangePassword from './components/changePassword';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ProfilePage: React.FC = () => {
    const authContext = useAuth();
    const navigate = useNavigate();
    return (
        <div className='w-full text-start text-brand pb-10'>
            <div className='mt-4 mb-5 md:-mb-10 flex justify-between px-4'>
                <button className='flex items-center gap-2 font-bold' onClick={() => navigate("/dashboard")}><MoveLeft className="h-5 w-5" /><p>Back</p></button>
                <div><Button variant="outline">Edit profile</Button></div>
            </div>
            <div className="px-4 space-y-6 md:px-6">
                <header className="space-y-1.5 flex justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <h1 className="text-3xl font-bold">Account settings</h1>
                        <img
                            src="https://via.placeholder.com/150x150"
                            alt="Avatar"
                            width="150"
                            height="150"
                            className="border rounded-full"
                            style={{ aspectRatio: "150/150", objectFit: "cover" }}
                        />
                        <div className="space-y-1.5">
                            <p className="font-semibold text-2xl">{authContext?.userData?.company}</p>
                        </div>
                        <br />
                        <div className='text-center w-full md:min-w-[320px]'>
                            <Label htmlFor="email" className='md:text-xl'>Email address</Label>
                            <p className="placeholder:text-brand/40 border text-lg md:text-xl border-brand p-1 rounded-3xl text-center">{authContext?.userData?.email} </p>
                        </div>
                    </div>
                </header>
                <div className="space-y-6">
                    {/* <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-brand px-2">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <Label htmlFor="name" className=''>Name</Label>
                                <Input className="placeholder:text-brand/40 border border-brand" id="name" placeholder="Enter your name" defaultValue="Catherine Grant" />
                            </div>
                            <div>
                                <Label htmlFor="email" className=''>Email</Label>
                                <Input className="placeholder:text-brand/40 border border-brand" id="email" placeholder="Enter your email" type="email" />
                            </div>
                            <div>
                                <Label htmlFor="phone" className=''>Phone</Label>
                                <Input className="placeholder:text-brand/40 border border-brand" id="phone" placeholder="Enter your phone" type="tel" />
                            </div>
                        </div>
                        <br />
                        <div className="mt-8 flex justify-end">
                            <Button variant="default">Save</Button>
                        </div>
                    </div> */}
                    <div className="space-y-2 mt-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className='w-full border border-brand text-brand'>Change password</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className=" text-2xl md:text-3xl font-semibold text-brand px-2">Change Password</DialogTitle>
                                            <DialogDescription className="text-base text-brand/50 px-2">
                                                Change your account password here.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-2">
                                            <ChangePassword />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div>
                                <Button disabled variant="outline" className='w-full border border-brand text-brand'>Manage payment methods</Button>
                            </div>
                            <div>
                                <Button variant="outline" className='w-full border border-brand text-brand'>Manage subscription</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;