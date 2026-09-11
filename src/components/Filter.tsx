"use client";

import { FILTER_TYPES } from "@/lib/constants";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { usePathname, useRouter } from "next/navigation";

export const Filter = () => {
    const pathname = usePathname();

    const router = useRouter();

    const handleSort = (value: string) => {
        router.push(`${pathname}?filter=${value}`);
    };

    return (
        <Select onValueChange={handleSort} defaultValue={FILTER_TYPES[0].value}>
            <SelectTrigger className="w-45">
                <SelectValue placeholder={FILTER_TYPES[0].value} />
            </SelectTrigger>

            <SelectContent position="popper">
                <SelectGroup>
                    {FILTER_TYPES.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
