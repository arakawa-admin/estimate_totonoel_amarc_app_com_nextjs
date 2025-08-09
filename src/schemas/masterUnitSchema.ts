import { z } from "zod";

// fetch(GET)用
export const masterUnitFromDbSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "単位名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
});


const masterUnitCreateSchema = z.object({
    name: z.string().min(1, "単位名は必須です"),
    sequence: z.number(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
});

// PUT（更新）用（partial）
export const masterUnitUpdateSchema = masterUnitCreateSchema.partial();

export type MasterUnitType = z.infer<typeof masterUnitFromDbSchema>;
export type MasterUnitCreateInput = z.infer<typeof masterUnitCreateSchema>;
export type MasterUnitUpdateInput = z.infer<typeof masterUnitUpdateSchema>;
