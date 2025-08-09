"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    Divider,
    useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

import NewCreateButton from "@/components/NewCreateButton";
import LogoutButton from "@/components/LogoutButton";
// import AdminButton from "@/components/AdminButton";
// import HelpButton from "@/components/HelpButton";

export default function Header() {
    const { user, profile } = useAuth();
    const isMobile = useMediaQuery("(max-width:768px)");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    if (!user || !profile) return null;

    return (
        <AppBar component="div" position="sticky">
            <Toolbar className="bg-stone-100 text-gray-700">
                <Box sx={{ flexGrow: 1 }} className="flex items-center min-w-[25%]">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo_landscape.svg"
                            alt="Logo"
                            width={60}
                            height={0}
                            className="mr-2"
                            style={{ height: "auto" }}
                        />
                        <Typography sx={{ fontSize: "1.1rem" }}>
                            見積管理システム
                        </Typography>
                    </Link>
                </Box>

                {!isMobile ? (
                    <Box className="flex items-center justify-end gap-1" sx={{ flexGrow: 1 }}>
                        <Box>
                            <Typography
                                className="mr-2 whitespace-nowrap"
                                variant="subtitle2"
                                component={"span"}
                                >
                                ログイン中: {profile?.name}
                            </Typography>
                        </Box>
                        <NewCreateButton />
                        {/* <SummaryButton /> */}
                        {/* <HelpButton /> */}
                        {/* <AdminButton /> */}
                        <LogoutButton />
                    </Box>
                ) : (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={toggleDrawer(true)}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <Box
                                sx={{ width: 250, p: 2 }}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    <PersonIcon fontSize="small" className="mr-1" />
                                    {profile?.name} <br />
                                    <Typography variant="caption">{user?.email}</Typography>
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                <List>
                                    <ListItem disablePadding>
                                        <NewCreateButton />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <LogoutButton />
                                    </ListItem>
                                </List>
                            </Box>
                        </Drawer>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
