"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./index";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseObj } from "../utils";

export const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const result = await databases.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.usersCollectionId,
        queries: [Query.equal("email", [email])],
    });

    return result.total > 0 ? result.rows[0] : null;
};

export const sendEmailOTP = async (email: string) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken({
            userId: ID.unique(),
            email,
        });

        return session.userId;
    } catch (error) {
        console.log("Failed To Send Email OTP", error);
    }
};

export const createAccount = async ({
    fullName,
    email,
}: {
    fullName: string;
    email: string;
}) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP(email);

    if (!accountId) {
        return {
            accountId: null,
            message: "Failed To Send OTP",
        };
    }

    if (!existingUser) {
        const { databases } = await createAdminClient();

        await databases.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.usersCollectionId,
            rowId: ID.unique(),
            data: {
                fullName,
                email,
                avatar: "https://api.dicebear.com/10.x/bottts/svg?seed=John",
                accountId,
            },
        });
    }

    return {
        accountId,
        message: "User Created Successfully",
    };
};

export const signInUser = async (email: string) => {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            accountId: null,
            message: "Failed To Sign In, User Doesn't Exist",
        };
    }

    const accountId = await sendEmailOTP(email);

    return { accountId, message: "User Signed-In Successfully" };
};

export const verifySecret = async ({
    accountId,
    password,
}: {
    accountId: string;
    password: string;
}) => {
    try {
        const { account } = await createAdminClient();

        const session = await account.createSession({
            userId: accountId,
            secret: password,
        });

        const cookieStore = await cookies();

        cookieStore.set("appwrite-session", session.$id, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        cookieStore.set("appwrite-user-id", accountId, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return { sessionId: session.$id };
    } catch (error) {
        console.log("Failed To Verify OTP", error);
    }
};

export const signOutUser = async () => {
    const cookieStore = await cookies();

    try {
        const sessionId = cookieStore.get("appwrite-session");
        if (sessionId?.value) {
            const { account } = await createAdminClient();

            try {
                await account.deleteSession({ sessionId: sessionId.value });
            } catch (error) {
                console.log(
                    "Failed To Delete The Session From Appwrite",
                    error,
                );
            }
        }
    } catch (error) {
        console.log("Error During Logout", error);
    } finally {
        cookieStore.delete("appwrite-session");
        cookieStore.delete("appwrite-user-id");
    }

    redirect("/auth");
};

export const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("appwrite-user-id");

        if (!userId?.value) {
            return null;
        }

        const { databases } = await createAdminClient();

        const user = await databases.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.usersCollectionId,
            queries: [Query.equal("accountId", [userId.value])],
        });

        return user.total > 0 ? parseObj(user.rows[0]) : null;
    } catch (error) {
        console.log("Error While Fetching The Current User", error);
        return null;
    }
};
