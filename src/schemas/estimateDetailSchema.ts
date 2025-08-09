import { z } from "zod";

// fetch(GET)用
export const estimateDetailFromDbSchema = z.object({
    id: z.uuid(),
    estimate_id: z.uuid("有効なUUID形式を入力してください").min(1, "見積IDは必須です"),
    sequence: z.number(),
    norm: z.string().min(1, "規格は必須です").max(200, "200文字以内で入力してください"),
    abstract: z.string().min(1, "摘要は必須です").max(200, "200文字以内で入力してください"),
    unit: z.string().min(1, "単位は必須です").max(200, "200文字以内で入力してください"),
    quantity: z.number(),
    unit_price: z.number(),

    created_at: z.date(),
    updated_at: z.date(),
});

// POST（新規作成）用
export const estimateDetailCreateSchema = z.object({
    // estimate_id: z.uuid("有効なUUID形式を入力してください").min(1, "見積IDは必須です"),
    // sequence: z.number(),
    norm: z.string().min(1, "規格は必須です").max(200, "200文字以内で入力してください"),
    abstract: z.string().min(1, "摘要は必須です").max(200, "200文字以内で入力してください"),
    unit: z.string().min(1, "単位は必須です").max(200, "200文字以内で入力してください"),
    quantity: z.number(),
    unit_price: z.number(),
});

// UPDATE（更新）用
export const estimateDetailUpdateSchema = z.object(estimateDetailCreateSchema.shape).partial();


export type EstimateDetailType = z.infer<typeof estimateDetailFromDbSchema>;
export type EstimateDetailCreateInput = z.infer<typeof estimateDetailCreateSchema>;
export type EstimateDetailUpdateInput = z.infer<typeof estimateDetailUpdateSchema>;
