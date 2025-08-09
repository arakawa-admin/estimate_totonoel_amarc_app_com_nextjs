"use client";

import Link from "next/link";

import { Button } from "@mui/material";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="p-8 text-center">
            <h2 className="text-xl text-red-600">エラーが発生しました</h2>
            <p className="text-sm mt-2">{error.message}</p>
            <Link href="/">
                <Button
                    variant="contained"
                    sx={{ mt: 4 }}
                    className="bg-gradient-to-br from-error-dark via-error-main to-error-light"
                    >
                    ホームに戻る
                </Button>
            </Link>
        </div>
    );
}
