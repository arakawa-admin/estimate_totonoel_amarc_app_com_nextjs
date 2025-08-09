"use client";

import {
    Box,
    Button,
    Container,
    Stack,
} from "@mui/material";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { EstimateCreateWithDetailsInput, estimateCreateWithDetailsSchema } from "@/schemas/estimateSchema";

import { createEstimateWithRelations } from "@/services/estimateService";

import { toast } from "react-toastify";

import DialogConfirm from "@/components/DialogConfirm";

import PlaceSelectField from "@/components/form/PlaceSelectField";
import StaffSelectField from "@/components/form/StaffSelectField";
import SelectDateField from "@/components/form/SelectDateField";
import TextInputField from "@/components/form/TextInputField";
import LinesTable from "@/components/form/LinesTable";

export default function EstimateForm({
    onSuccess,
}: {
    onSuccess?: () => void;
}) {
    const router = useRouter();
    const { profile } = useAuth();

    const methods = useForm<EstimateCreateWithDetailsInput>({
        resolver: zodResolver(estimateCreateWithDetailsSchema),
        defaultValues: {
            author_id: profile?.id || "",
            staff_id: profile?.id || "",   // 初期値があるならより自然に制御されます
            estimate_at: new Date(),
            title: "",
            customer_name: "",
            place: "",
            remarks: "",
            details: [{
                norm: "",
                abstract: "",
                unit: "",
                quantity: 0,
                unit_price: 0,
            }],
        },
        mode: "onBlur",
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formData, setFormData] = useState<EstimateCreateWithDetailsInput | null>(null);
    const handleConfirmSubmit = (data: EstimateCreateWithDetailsInput) => {
        setFormData(data);
        setConfirmOpen(true);
    };
    const handleConfirmedSubmit = async () => {
        if (!formData) return;
        await onSubmit(formData);
        setConfirmOpen(false);
    };

    const [isPosting, setIsPosting] = useState(false);
    const onSubmit = async (data: EstimateCreateWithDetailsInput) => {
        try {
            setIsPosting(true);
            const fd = new FormData();

            fd.append("author_id", data.author_id);
            fd.append("staff_id", data.staff_id);
            fd.append("estimate_at", format(data.estimate_at, "yyyy-MM-dd", { locale: ja }));
            fd.append("customer_name", data.customer_name);
            fd.append("title", data.title);
            fd.append("place", data.place);
            fd.append("details", JSON.stringify(data.details));
            if(data.remarks) fd.append("remarks", data.remarks);

            const created = await createEstimateWithRelations(fd);
            if(!created) {
                throw new Error("作成に失敗しました")
            }

            methods.reset(); // フォームリセット

            onSuccess?.();

    //         // TODO 本番は戻す メール送信
    //         // await sendEmail(created);

            router.replace(`/estimate/${created.id}`);

            toast.success("見積を作成しました")
        } catch (err) {
            console.error(err);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <Container maxWidth="xl">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleConfirmSubmit)}>
                    <Stack spacing={3}>
                        <SelectDateField
                            name="estimate_at"
                            label="見積日"
                            />

                        <StaffSelectField />

                        <TextInputField
                            name="title"
                            label="タイトル"
                            />

                        <TextInputField
                            name="customer_name"
                            label="顧客名"
                            />

                        <PlaceSelectField
                            name="place"
                            />

                        <LinesTable />

                        <TextInputField
                            name="remarks"
                            label="備考"
                            />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 4,
                            }}
                            >
                            {/* <Button
                                variant="outlined"
                                color="warning"
                                fullWidth
                                size="large"
                                disabled={isSubmitting}
                                sx={{ mr: 1 }}
                                >
                                下書き保存
                            </Button> */}
                            <Button
                                type="submit"
                                variant="contained"
                                className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-light"
                                fullWidth
                                size="large"
                                disabled={methods.formState.isSubmitting}
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1.4em",
                                    py: 2
                                }}
                                loading={isPosting}
                                loadingPosition="start"
                                >
                                作成する
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </FormProvider>

            <DialogConfirm
                isOpen={confirmOpen}
                onDone={handleConfirmedSubmit}
                onCancel={() => setConfirmOpen(false)}
                title="見積完成の確認"
                okText="作成する"
                />
        </Container>
    );
}
