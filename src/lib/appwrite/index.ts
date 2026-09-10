"use server";

import { Account, Avatars, Client, TablesDB, Storage } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
    const { account } = await createAdminClient();

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("appwrite-session");
    const userId = cookieStore.get("appwrite-user-id");

    if (!sessionId?.value || !userId?.value) {
        throw new Error("No Session");
    }

    try {
        const sessions = await account.listSessions();
        if (!sessions.total) {
            throw new Error("Invalid Session");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Session Validation Failed");
    }
};

export const createAdminClient = async () => {
    const client = new Client();
    client.setEndpoint(appwriteConfig.endpointUrl);
    client.setProject(appwriteConfig.projectId);
    client.setKey(appwriteConfig.secretKey);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new TablesDB(client);
        },
        get storage() {
            return new Storage(client);
        },
        get avatars() {
            return new Avatars(client);
        },
    };
};
