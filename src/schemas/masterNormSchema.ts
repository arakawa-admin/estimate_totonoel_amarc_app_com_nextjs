import { z } from "zod";

// fetch(GET)用
export const masterNormFromDbSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "規格名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
});


const masterNormCreateSchema = z.object({
    name: z.string().min(1, "規格名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
});

// PUT（更新）用（partial）
export const masterNormUpdateSchema = masterNormCreateSchema.partial();

export type MasterNormType = z.infer<typeof masterNormFromDbSchema>;
export type MasterNormCreateInput = z.infer<typeof masterNormCreateSchema>;
export type MasterNormUpdateInput = z.infer<typeof masterNormUpdateSchema>;
