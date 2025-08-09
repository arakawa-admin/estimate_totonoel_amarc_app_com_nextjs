import { z } from "zod";

// fetch(GET)用
export const masterPlaceFromDbSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "場所名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
});


// ✅ ベーススキーマ（共通定義）
const masterPlaceCreateSchema = z.object({
    name: z.string().min(1, "場所名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
});

// PUT（更新）用（partial）
export const masterPlaceUpdateSchema = masterPlaceCreateSchema.partial();

export type MasterPlaceType = z.infer<typeof masterPlaceFromDbSchema>;
export type MasterPlaceCreateInput = z.infer<typeof masterPlaceCreateSchema>;
export type MasterPlaceUpdateInput = z.infer<typeof masterPlaceUpdateSchema>;
