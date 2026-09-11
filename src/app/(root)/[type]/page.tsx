import { Card } from "@/components/Card";
import { getFiles } from "@/lib/appwrite/file.actions";
import { getCurrentUser } from "@/lib/appwrite/user.actions";
import { getFileTypeParams } from "@/lib/utils";
import { Models } from "node-appwrite";
import React from "react";

const Page = async ({
    searchParams,
    params,
}: {
    searchParams: Promise<{ query: string; filter: string }>;
    params: Promise<{ type: string }>;
}) => {
    const type = ((await params)?.type as string) || "";
    const query = ((await searchParams)?.query as string) || "";
    const filter = ((await searchParams)?.filter as string) || "";

    const currentUser = await getCurrentUser();
    const fileType = getFileTypeParams(type);

    const files = await getFiles({ types: fileType, query, filter });

    return (
        <div className="flex h-full min-h-0 flex-col gap-4 px-4 py-4">
            <div className="flex justify-between">
                <span className="font-semibold text-2xl capitalize">
                    {type}
                </span>

                <span>Filter</span>
            </div>

            <span>Total</span>

            <div className="flex flex-1 flex-wrap content-start gap-4 overflow-y-auto no-scrollbar">
                {files?.rows?.map((file: Models.DefaultRow) => (
                    <Card key={file.$id} file={file} />
                ))}
            </div>
        </div>
    );
};

export default Page;
