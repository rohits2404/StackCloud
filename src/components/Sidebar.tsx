"use client";

import { SIDEBAR_ITEMS, USER_ICON } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Progress } from "./Progress";

export const Sidebar = ({
    fullName,
    fileSize,
}: {
    fullName: string;
    fileSize: string;
}) => {
    const pathname = usePathname();

    return (
        <aside className="w-60 shrink-0 min-h-screen bg-white p-3 pt-7 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <Layers className="w-8 h-8 text-flory" />
                <span className="font-medium text-xl">StackCloud</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col mt-8 gap-2">
                {SIDEBAR_ITEMS.map((sidebar) => {
                    const { name, icon: Icon, url } = sidebar || {};
                    const isActive = pathname === url;

                    return (
                        <Link
                            key={url}
                            href={url}
                            className={cn(
                                "flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-lg",
                                isActive ? "bg-flory" : "bg-transparent",
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5",
                                    isActive ? "text-white" : "text-gray-700",
                                )}
                            />

                            <span
                                className={cn(
                                    "font-medium",
                                    isActive ? "text-white" : "text-gray-700",
                                )}
                            >
                                {name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="mt-auto flex flex-col gap-4 pt-8">
                {/* Storage */}
                <div className="bg-flory flex flex-col px-3.5 pt-2.5 pb-3.5 rounded-lg">
                    <span className="text-white font-medium">Storage</span>

                    <span className="text-sm text-white">
                        {fileSize} Of 6GB
                    </span>

                    <Progress percentage={90} />
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                    <Image
                        src={USER_ICON}
                        width={40}
                        height={40}
                        alt="user icon"
                        className="rounded-full"
                    />

                    <span className="font-medium text-gray-700">
                        {fullName}
                    </span>
                </div>
            </div>
        </aside>
    );
};
