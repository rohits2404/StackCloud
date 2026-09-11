"use client";

import { FileCard } from "@/components/FileCard";
import { getFiles } from "@/lib/appwrite/file.actions";
import { FILE_CARDS } from "@/lib/constants";
import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [allFiles, setAllFiles] = useState([]);

    const handleFetchFiles = async () => {
        const allFiles = await getFiles({
            types: [],
            query: "",
        });

        setAllFiles(allFiles.rows);
    };

    useEffect(() => {
        handleFetchFiles();
    }, []);

    return (
        <div className="w-full p-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {FILE_CARDS.map((card) => (
                    <FileCard
                        key={card.id}
                        id={card.id}
                        bgColor={card.bgColor}
                        imgSrc={card.imgSrc}
                        title={card.title}
                        allFiles={allFiles}
                    />
                ))}
            </div>
        </div>
    );
};
