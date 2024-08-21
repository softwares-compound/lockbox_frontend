import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/authContext';
import ChangePassword from './components/changePassword';

const ProfilePage: React.FC = () => {
    const authContext = useAuth();
    const [activeTab, setActiveTab] = useState<number | null>(null);
    return (
        <div className='w-full text-start text-brand pb-10'>
            <div className="px-4 space-y-6 md:px-6">
                <header className="space-y-1.5 flex justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <h1 className="text-2xl font-bold">Account settings</h1>
                        <img
                            src="https://via.placeholder.com/96x96"
                            alt="Avatar"
                            width="96"
                            height="96"
                            className="border rounded-full"
                            style={{ aspectRatio: "96/96", objectFit: "cover" }}
                        />
                        <div className="space-y-1.5">

                            <p className="font-semibold">{authContext?.userData?.company}</p>
                        </div>
                        {/* <div className='text-center min-w-[300px]'>
                            <Label htmlFor="email" className=''>Email</Label>
                            <Input className="placeholder:text-brand/40 border border-brand" id="email" placeholder="Enter your email" type="email" value={authContext?.userData?.email} />
                        </div> */}
                    </div>
                </header>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-brand px-2">Personal Information</h2>
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
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-brand px-2">Manage</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <Button variant="outline" className='w-full border border-brand text-brand' onClick={() => setActiveTab(1)}>Change password</Button>
                            </div>
                            <div>
                                <Button variant="outline" className='w-full border border-brand text-brand' onClick={() => setActiveTab(2)}>Manage payment methods</Button>
                            </div>
                            <div>
                                <Button variant="outline" className='w-full border border-brand text-brand' onClick={() => setActiveTab(3)}>Manage subscription</Button>
                            </div>
                        </div>
                        {/* <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-brand">Change Password</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input className="placeholder:text-brand/40 border border-brand" id="current-password" placeholder="Enter your current password" type="password" />
                                </div>
                                <div>
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input className="placeholder:text-brand/40 border border-brand" id="new-password" placeholder="Enter your new password" type="password" />
                                </div>
                                <div>
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input className="placeholder:text-brand/40 border border-brand" id="confirm-password" placeholder="Confirm your new password" type="password" />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div>
                    {
                        activeTab === 1 ? <ChangePassword />
                            : activeTab === 2 ? <div className='text-center'>coming soon</div>
                                : activeTab === 3 ? <div className='text-center'>coming soon</div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;