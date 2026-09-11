export { cn } from "cn";

export const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
};

export const parseObj = (obj: unknown) => {
    return JSON.parse(JSON.stringify(obj));
};
