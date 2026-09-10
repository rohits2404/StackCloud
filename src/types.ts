export type CustomInputProps = {
    Icon: React.ComponentType;
    labelTitle: string;
    labelHtmlFor: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputName: string;
    className?: string;
};

export type IButtonLoadingProps = {
    loading: boolean;
    onClick: () => void;
    label?: string;
    className?: string;
};
