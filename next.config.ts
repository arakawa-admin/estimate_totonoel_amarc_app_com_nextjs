import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* for react-draft-wysiwyg */
    reactStrictMode: false,

    /* form pdf.js */
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                canvas: false,
            };
        }
        return config;
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: "https",
    //             // hostname: "storage-improve.amarc-app.com", // for production
    //             hostname: "pub-d7ba9a18d79b4447b145fb032d572324.r2.dev", // TODO デプロイ時には独自ドメインに変える
    //             pathname: "/**", // 全てのパス
    //         },
    //     ],
    // },
    env: {
        NEXT_PUBLIC_RESEND_API_KEY: process.env.NEXT_PUBLIC_RESEND_API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    // iOS Safari対応のための設定
    async headers() {
        return [
            {
                source: '/auth/callback',
                headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-cache, no-store, must-revalidate',
                },
                {
                    key: 'Pragma',
                    value: 'no-cache',
                },
                {
                    key: 'Expires',
                    value: '0',
                },
                {
                    key: 'Content-Type',
                    value: 'text/html; charset=utf-8',
                },
                ],
            },
        ];
    },
    // serverActions: {
    //     bodySizeLimit: '10mb', // ← ここで制限を増やす（例: 10MB）
    // },
};

export default nextConfig;
