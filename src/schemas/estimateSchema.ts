import { z } from "zod";

import { estimateDetailCreateSchema } from "./estimateDetailSchema";

// fetch(GET)用
export const estimateFromDbSchema = z.object({
    id: z.uuid(),
    author_id: z.uuid("有効なUUID形式を入力してください").min(1, "投稿者IDは必須です"),
    staff_id: z.uuid("有効なUUID形式を入力してください").min(1, "担当者IDは必須です"),
    estimate_at: z.date(),

    customer_name: z.string().min(1, "顧客名は必須です").max(200, "200文字以内で入力してください"),
    title: z.string().min(1, "タイトルは必須です").max(200, "200文字以内で入力してください"),
    place: z.string().min(1, "場所は必須です").max(200, "200文字以内で入力してください"),
    remarks: z.string().nullable().optional(),
    deleted_at: z.date(),
    created_at: z.date(),
    updated_at: z.date(),
});

// POST（新規作成）用
export const estimateCreateSchema = z.object({
    author_id: z.uuid("有効なUUID形式を入力してください").min(1, "投稿者IDは必須です"),
    staff_id: z.uuid("有効なUUID形式を入力してください").min(1, "担当者IDは必須です"),
    estimate_at: z.date(),

    customer_name: z.string().min(1, "顧客名は必須です").max(200, "200文字以内で入力してください"),
    title: z.string().min(1, "タイトルは必須です").max(200, "200文字以内で入力してください"),
    place: z.string().min(1, "場所は必須です").max(200, "200文字以内で入力してください"),
    remarks: z.string().nullable().optional(),
});

export const estimateCreateWithDetailsSchema = estimateCreateSchema.extend({
    details: z.array(estimateDetailCreateSchema).min(1, "少なくとも1行は必要です"),
});

// UPDATE（更新）用
export const estimateUpdateSchema = z.object(estimateCreateSchema.shape).partial();


export type EstimateType = z.infer<typeof estimateFromDbSchema>;
export type EstimateCreateInput = z.infer<typeof estimateCreateSchema>;
export type EstimateCreateWithDetailsInput = z.infer<typeof estimateCreateWithDetailsSchema>;
export type EstimateUpdateInput = z.infer<typeof estimateUpdateSchema>;
