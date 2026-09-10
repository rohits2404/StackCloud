"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./index";
import { appwriteConfig } from "./config";

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
