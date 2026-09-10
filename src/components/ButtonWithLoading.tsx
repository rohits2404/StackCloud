import { cn } from "@/lib/utils";
import { IButtonLoadingProps } from "@/types";
import React from "react";
import { Spinner } from "./ui/spinner";

export const ButtonWithLoading = ({
    loading,
    onClick,
    label = "Continue",
    className,
}: IButtonLoadingProps) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center gap-2 bg-flory disabled:bg-flory/80 disabled:cursor-not-allowed font-medium text-white mt-6 cursor-pointer rounded-xl w-full h-14 text-lg hover:bg-oxford-blue/90",
                className,
            )}
            onClick={onClick}
            disabled={loading}
        >
            {label}
            {loading ? <Spinner className="w-6 h-6" /> : null}
        </button>
    );
};
