import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "100MB",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "png.pngtree.com",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
            },
            {
                protocol: "https",
                hostname: "fra.cloud.appwrite.io",
                pathname: "/v1/storage/**",
            },
        ],
    },
};

export default nextConfig;
