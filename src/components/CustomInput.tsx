import { cn } from "@/lib/utils";
import { CustomInputProps } from "@/types";
import { Input } from "./ui/input";

export const CustomInput = ({
    Icon,
    labelTitle,
    labelHtmlFor,
    value,
    onChange,
    inputName,
    className,
}: CustomInputProps) => {
    return (
        <div
            className={cn(
                "flex items-center justify-start border rounded-xl px-8 py-2 gap-2",
                className,
            )}
        >
            <Icon />
            <div className="w-8 h-[0.5px] bg-gray-400 rotate-90" />
            <div className="flex flex-col mt-1.5 w-full">
                <label
                    htmlFor={labelHtmlFor}
                    className="text-sm font-medium text-gray-600"
                >
                    {labelTitle}
                </label>
                <Input
                    name={inputName}
                    type="text"
                    className="border-0 focus-visible:ring-0 -mt-2 font-medium shadow-none p-0 w-full"
                    autoComplete={"off"}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
