import Image from "next/image";
import { FileCardProps } from "@/types";
import { getFileSizeByType } from "@/lib/utils";

export const FileCard = ({
    id,
    bgColor,
    imgSrc,
    title,
    allFiles,
}: FileCardProps) => {
    const size = getFileSizeByType(allFiles, id)?.size;
    const createdAt = getFileSizeByType(allFiles, id)?.created;

    return (
        <div className="w-full rounded-2xl bg-white p-5">
            <div className="flex items-center justify-between">
                <div className={`${bgColor} shrink-0 rounded-full p-3`}>
                    <Image
                        width={25}
                        height={25}
                        src={imgSrc}
                        alt="icon"
                        className="invert"
                    />
                </div>

                <h2 className="whitespace-nowrap text-sm font-medium">
                    {size}
                </h2>
            </div>

            <p className="mt-4 text-lg font-semibold text-black">{title}</p>

            <p className="mt-3 text-sm text-gray-400">{createdAt}</p>
        </div>
    );
};
