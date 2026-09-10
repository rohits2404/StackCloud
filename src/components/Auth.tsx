"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CustomInput } from "./CustomInput";
import { Mail, UserRoundPen } from "lucide-react";
import { ButtonWithLoading } from "./ButtonWithLoading";
import { isValidEmail } from "@/lib/utils";
import { createAccount } from "@/lib/appwrite/user.actions";

export const Auth = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        registerEmail: "",
    });
    const [email, setEmail] = useState("");
    const [tabValue, setTableValue] = useState("signIn");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState("");

    const handleTabValueChange = (value: string) => {
        setTableValue(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleContinueClick = async () => {
        const { fullName, registerEmail } = formData || {};

        if (!fullName && tabValue === "signUp") {
            setErrorMessage("Full Name Is Required");
            return;
        }

        if (!isValidEmail(registerEmail) && !isValidEmail(email)) {
            setErrorMessage("Invalid Email");
            return;
        }

        try {
            setLoading(true);

            const user = await createAccount({
                fullName,
                email: registerEmail,
            });
            if (user.accountId) {
                setAccountId(user.accountId);
            }
            setErrorMessage(user.message);
            setLoading(false);
        } catch (error) {
            setErrorMessage("Sign In Failed. Please Try Again");
            console.log("Sign In Failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-3xl">Welcome Back</span>
                <span className="text-gray-500 mt-1">
                    Welcome Back, Please Enter Your Details
                </span>
                <Tabs
                    defaultValue={tabValue}
                    className="mt-6"
                    onValueChange={handleTabValueChange}
                >
                    <TabsList className="w-100 min-h-12.5">
                        <TabsTrigger
                            value="signIn"
                            className="font-medium cursor-pointer"
                        >
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger
                            value="signUp"
                            className="font-medium cursor-pointer"
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="signIn">
                        <div className="flex flex-col gap-4 mt-6">
                            <CustomInput
                                Icon={Mail}
                                labelTitle="Email"
                                labelHtmlFor="email"
                                value={email}
                                onChange={handleEmailChange}
                                inputName="email"
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="signUp">
                        <div className="flex flex-col gap-4 mt-6">
                            <CustomInput
                                Icon={UserRoundPen}
                                labelTitle="Full Name"
                                labelHtmlFor="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                inputName="fullName"
                            />
                            <CustomInput
                                Icon={Mail}
                                labelTitle="Email"
                                labelHtmlFor="email"
                                value={formData.registerEmail}
                                onChange={handleChange}
                                inputName="registerEmail"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
                <ButtonWithLoading
                    loading={loading}
                    onClick={handleContinueClick}
                />
            </div>
        </div>
    );
};
