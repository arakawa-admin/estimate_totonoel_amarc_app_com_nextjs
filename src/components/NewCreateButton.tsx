"use client";

import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import EstimateForm from "./EstimateForm";

import DialogConfirm from "@/components/DialogConfirm";

export default function NewCreateButton() {
    const [formOpen, setFormOpen] = useState(false);

    const handleFormOpenDialog = () => {
        setFormOpen(true);
    };
    const handleFormCloseDialog = () => {
        setFormOpen(false);
    };

    const [confirmShut, setConfirmShut] = useState(false);

    return (
        <>
        <Button
            variant="contained"
            onClick={handleFormOpenDialog}
            color="primary"
            sx={{
                py: 2,
            }}
            className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-light"
            size="large"
            >
            新規作成
        </Button>

        <Dialog
            open={formOpen}
            onClose={(event, reason) => {
                if (reason === "backdropClick") return;
                setFormOpen(false);
            }}
            fullScreen
            >
            <Toolbar
                className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-light"
                >
                <DialogTitle
                    sx={{ color: 'white', fontWeight: 'bold', px: 1 }}
                    >
                    見積書 新規作成
                </DialogTitle>
                <IconButton onClick={() => setConfirmShut(true)} sx={{ ml: 'auto' }}>
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            </Toolbar>

            <DialogContent
                sx={{ paddingBottom: 0 }}
                >
                <EstimateForm
                    onSuccess={handleFormCloseDialog}
                    />
            </DialogContent>

            <DialogActions
                sx={{ borderTop: '1px solid #ccc', marginTop: '1em' }}
                >
                <Button
                    color="inherit"
                    onClick={() => setConfirmShut(true)}
                    sx={{ width: '100%',}}
                    >
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
        <DialogConfirm
            isOpen={confirmShut}
            onDone={handleFormCloseDialog}
            onCancel={() => setConfirmShut(false)}
            title="入力内容を破棄して閉じていいですか？"
            okText="OK"
            />
        </>
    );
}
