import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/appwrite/user.actions";
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

    return (
        <main className="flex h-screen bg-white">
            <div>
                <Sidebar fullName={user?.fullName} fileSize={"100"} />
            </div>
            <section className="flex h-full flex-1 flex-col">
                <div>
                    <Header />
                </div>
                <div className="bg-gray-50 shadow m-4 h-full rounded-2xl">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default MainLayout;
