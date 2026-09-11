import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getFiles } from "@/lib/appwrite/file.actions";
import { getCurrentUser } from "@/lib/appwrite/user.actions";
import { getTotalFileSize, getTotalFileSizeInBytes } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: "StackCloud",
    description: "Store Like A Pro",
};

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth");
    }

    const files = await getFiles({ types: [], query: "" });
    const totalSize = getTotalFileSize(files?.rows);

    return (
        <main className="flex h-screen overflow-hidden bg-white">
            <Sidebar
                fullName={user.name}
                fileSize={getTotalFileSizeInBytes(files?.rows)}
            />

            <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <Header ownerId={user.$id} accountId={user.accountId} />

                <div className="m-4 flex min-h-0 flex-1 overflow-hidden rounded-2xl bg-gray-50 shadow">
                    {children}
                </div>
            </section>

            <Toaster />
        </main>
    );
};

export default MainLayout;
