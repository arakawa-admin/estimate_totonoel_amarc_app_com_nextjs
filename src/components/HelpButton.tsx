"use client";
import Link from "next/link";

import {
    IconButton,
    Tooltip,
    Zoom,
} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';

export default function HelpButton() {
    return (
        <Link
            href={`/help`}
            passHref
            >
            <Tooltip
                title="ヘルプ"
                arrow
                slots={{
                    transition: Zoom,
                }}
                >
                <IconButton>
                    <HelpIcon />
                </IconButton>
            </Tooltip>
        </Link>
    );
}
