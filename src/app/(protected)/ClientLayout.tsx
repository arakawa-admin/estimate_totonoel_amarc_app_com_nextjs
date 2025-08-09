"use client";

import LoadingScreen from "@/components/LoadingScreen";

import { useAuth } from "@/contexts/AuthContext";

import Header from "@/components/Header";

import { Box } from "@mui/material";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useAuth();
    if (isLoading) return <LoadingScreen />;

    return (
        <Box
            sx={{
                backgroundColor: "#fafafa",
            }}
            >
            <Header />
            {children}
        </Box>
    );
}
