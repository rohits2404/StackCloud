import React from "react";

const Page = async ({
    searchParams,
    params,
}: {
    searchParams: Promise<{ query: string; filter: string }>;
    params: Promise<{ type: string }>;
}) => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    console.log("params", resolvedParams);
    console.log("searchParams", resolvedSearchParams);

    const type = (resolvedParams?.type as string) || "";

    return <div>{type}</div>;
};

export default Page;
