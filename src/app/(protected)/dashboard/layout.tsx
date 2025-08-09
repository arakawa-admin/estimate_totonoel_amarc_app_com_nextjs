"use client";

import { Toolbar, Container, Box } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { profile } = useAuth();

    if (!profile) { return <LoadingScreen />; }

    return (
        <Box
            sx={{
                backgroundColor: "#fafafa",
                // backgroundColor: "#E2EDF5",
            }}
            >
            <Toolbar
                sx={{
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    minHeight: "48px!important",
                }}
                className="bg-gradient-to-r from-primary-dark via-primary-main to-primary-light"
                >
                ダッシュボード
            </Toolbar>
            <Container
                sx={{ p: 3 }}
                maxWidth="xl"
                >
                {children}
            </Container>
        </Box>
    );
}
