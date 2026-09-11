"use client";

import { signOutUser } from "@/lib/appwrite/user.actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { FileUploader } from "./FileUploader";
import { FileSearch } from "./FileSearch";

export const Header = ({
    ownerId,
    accountId,
}: {
    ownerId: string;
    accountId: string;
}) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOutUser();
            router.push("/auth");
        } catch (error) {
            console.log("Logout Failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-between px-7 mt-6">
            <FileSearch />
            <div className="flex gap-4">
                <FileUploader ownerId={ownerId} accountId={accountId} />
                <button
                    className="cursor-pointer h-11 w-11 flex items-center
            justify-center gap-2 bg-flory/10 rounded-full"
                    onClick={handleLogout}
                >
                    <LogOut className="text-flory h-5 w-5 rotate-180" />
                </button>
            </div>
        </div>
    );
};
