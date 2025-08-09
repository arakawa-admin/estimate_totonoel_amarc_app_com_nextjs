"use client";

import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

import {
    IconButton,
    Tooltip,
    Zoom,
} from "@mui/material";

import SettingsIcon from '@mui/icons-material/Settings';

export default function AdminButton() {
    const { user } = useAuth();
    if(!user?.is_admin) return null;

    return (
        <Link
            href={`/admin`}
            passHref
            >
            <Tooltip
                title="管理者ページ"
                arrow
                slots={{
                    transition: Zoom,
                }}
                >
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
        </Link>
    );
}
