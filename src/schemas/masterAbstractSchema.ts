import { z } from "zod";

// fetch(GET)用
export const masterAbstractFromDbSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "摘要名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
});


// ✅ ベーススキーマ（共通定義）
const masterAbstractCreateSchema = z.object({
    name: z.string().min(1, "摘要名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
});

// PUT（更新）用（partial）
export const masterAbstractUpdateSchema = masterAbstractCreateSchema.partial();

export type MasterAbstractType = z.infer<typeof masterAbstractFromDbSchema>;
export type MasterAbstractCreateInput = z.infer<typeof masterAbstractCreateSchema>;
export type MasterAbstractUpdateInput = z.infer<typeof masterAbstractUpdateSchema>;
