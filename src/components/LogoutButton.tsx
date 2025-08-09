"use client";

import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

import {
    // Button,
    // Stack,
    Tooltip,
    // Typography,
    IconButton,
    Zoom
} from "@mui/material";

import LogoutIcon from '@mui/icons-material/Logout';

import DialogConfirm from "@/components/DialogConfirm";

export default function LogoutButton() {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();

        sessionStorage.removeItem("selectedStaffId");
        // sessionStorage.clear();
    };

    const { user } = useAuth();

    return (
        <>
            <Tooltip
                arrow
                title="ログアウト"
                slots={{
                    transition: Zoom,
                }}
                slotProps={{
                    tooltip: {
                        sx: {
                            fontWeight: '700',
                            bgcolor: "error.main",
                            '& .MuiTooltip-arrow': {
                                color: "error.main",
                            },
                        },
                    },
                }}
                >
                <IconButton
                    onClick={confirmOpen ? () => setConfirmOpen(false) : () => setConfirmOpen(true)}
                    // onClick={handleLogout}
                    color="error"
                    >
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
            <DialogConfirm
                isOpen={confirmOpen}
                onDone={handleLogout}
                title={`${user?.email} をログアウトしますか？`}
                color="error"
                okText="ログアウト"
                onCancel={() => setConfirmOpen(false)}
                />
        </>
        // <Button
        //     onClick={handleLogout}
        //     sx={{
        //         mx: 1,
        //         textTransform: "none",
        //     }}
        //     color="error"
        //     >
        //     <Stack>
        //         ログアウト
        //         <Typography
        //             variant="subtitle2"
        //             color="textDisabled"
        //             sx={{ fontSize: "0.8em" }}
        //             >
        //             {user?.email}
        //         </Typography>
        //     </Stack>
        // </Button>
    );
}
