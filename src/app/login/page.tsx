"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

    // iOS判定関数
    const isIOS = () => {
        return /iPhone|iPad/.test(navigator.userAgent) &&
                /Safari/.test(navigator.userAgent) &&
                !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
    };

    const handleLogin = async () => {
        try {
            sessionStorage.removeItem("selectedStaffId");
            const supabase = createClient();

            const redirectUrl = process.env.NODE_ENV === "development"
                                    ? "http://localhost:3000/auth/callback"
                                    : "https://estimate.totonoel.amarc-app.com/auth/callback"

            // iOSの場合は特別な処理
            if (isIOS()) {
                // iOS Safari対応：より確実なリダイレクト
                await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: redirectUrl,
                        queryParams: {
                            prompt: 'select_account',
                        },
                        // iOS Safari固有の設定
                        skipBrowserRedirect: false,
                        scopes: 'openid email profile',
                    },
                });
            } else {
                // PC/Android用の通常処理
                await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: redirectUrl,
                        queryParams: {
                            prompt: 'select_account',
                        },
                    },
                });
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    useEffect(() => {
        // 自動ログインではなく、ユーザーのクリックで実行
        handleLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null
}
