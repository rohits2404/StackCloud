import { Mail } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ButtonWithLoading } from "./ButtonWithLoading";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifySecret } from "@/lib/appwrite/user.actions";

export const OTPModal = ({
    accountId,
    email,
}: {
    accountId: string;
    email: string;
}) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleVerifyEmail = async () => {
        setLoading(true);

        try {
            const session = await verifySecret({
                accountId,
                password,
            });

            if (session) {
                router.push("/");
            }
        } catch (error) {
            console.log("Failed To Verify OTP", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={true}>
            <DialogContent className="w-112.5">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-flory/10 rounded-full w-16 h-16 flex items-center justify-center">
                        <Mail className="text-flory w-8 h-8" />
                    </div>

                    <span className="text-2xl font-medium mt-6">
                        Check Your Email
                    </span>

                    <span className="text-center text-gray-600 font-light">
                        Enter The Verification Code Sent To{" "}
                        <strong className="font-medium text-black">
                            {email}
                        </strong>
                    </span>

                    <InputOTP
                        maxLength={6}
                        value={password}
                        onChange={setPassword}
                    >
                        <InputOTPGroup className="mt-8 flex gap-2">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="w-12 h-12 rounded-md border border-gray-300 text-xl"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <span className="mt-4 text-gray-600">
                        Didn&apos;t Get a Code ?{" "}
                        <strong className="text-black underline cursor-pointer font-medium">
                            Resend
                        </strong>
                    </span>

                    <ButtonWithLoading
                        loading={loading}
                        onClick={handleVerifyEmail}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
