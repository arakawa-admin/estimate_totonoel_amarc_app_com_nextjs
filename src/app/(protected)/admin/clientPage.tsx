"use client";

import Link from "next/link";

import {
    Container,
    Grid,
    Button,
} from "@mui/material";

export default function ClientPageForAdmin() {
    const masters = [
        {
            title: "ユーザー",
            route: "user",
        },
        {
            title: "部門",
            route: "department",
        },
    ]
    return (
        <Container
            sx={{ p: 3 }}
            maxWidth="xl"
            >
            <Grid container spacing={2}>
                {/* {children} */}
                {masters.map((master) => (
                    <>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Link
                            href={`/admin/master/${master.route}`}
                            passHref
                            >
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ fontWeight: 'bold', fontSize: '1.2em', p: 2 }}
                                >
                                {master.title} マスタ
                            </Button>
                        </Link>
                    </Grid>
                    </>
                ))}
            </Grid>
        </Container>
    );
}
