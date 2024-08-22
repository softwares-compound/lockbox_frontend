// import { Button, Input } from '@headlessui/react';
// import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type ChangePasswordFormInputs = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangePassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ChangePasswordFormInputs>();

    const onSubmit = (data: ChangePasswordFormInputs) => {
        // Handle form submission
        console.log('Form data:', data);
    };

    const newPassword = watch("newPassword");
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false); // State for password visibility
    const [newPasswordVisible, setNewPasswordVisible] = useState(false); // State for password visibility

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-brand px-2">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <div className="relative">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                className="placeholder:text-brand/40 border border-brand"
                                id="currentPassword"
                                placeholder="Enter your current password"
                                type={currentPasswordVisible ? "text" : "password"}
                                {...register("currentPassword", {
                                    required: "Current Password is required",

                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-600"
                            >
                                {currentPasswordVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm px-4">{errors.currentPassword.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <div className="relative">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                className="placeholder:text-brand/40 border border-brand"
                                id="newPassword"
                                placeholder="Enter your new password"
                                type={newPasswordVisible ? "text" : "password"}
                                {...register("newPassword", {
                                    required: "New password is required", minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                                        message: "Password must contain at least one [a-z], [A-Z], [0-9], and one special character [@$!%*?#&]",
                                    },
                                })}
                            />

                            <button
                                type="button"
                                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-600"
                            >
                                {newPasswordVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm px-4">{errors.newPassword.message}</p>
                        )}

                    </div>
                    <div className="grid gap-2">
                        <div className="relative">
                            <div >
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input className="placeholder:text-brand/40 border border-brand"
                                    id="confirm-password"
                                    placeholder="Confirm your new password"
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your new password",
                                        validate: value =>
                                            value === newPassword || "Passwords do not match"
                                    })} />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm px-4">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="mt-8 flex justify-end">
                <Button variant="default">Save</Button>
            </div>
        </form>
    );
};

export default ChangePassword;
