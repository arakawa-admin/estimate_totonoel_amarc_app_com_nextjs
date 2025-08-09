import { z } from "zod";

import { masterLoginUserFromDbSchema } from "./masterLoginUserSchema";

// fetch(GET)用
export const masterStaffFromDbSchema = z.object({
    id: z.uuid(),
    login_user_id: z.uuid(),
    login_user: masterLoginUserFromDbSchema,
    name: z.string().min(1, "スタッフ名は必須です"),
    kana: z.string().min(1, "カナは必須です"),
    is_editor: z.boolean(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
});


// ✅ ベーススキーマ（共通定義）
const masterStaffCreateSchema = z.object({
    login_user_id: z.uuid(),
    name: z.string().min(1, "スタッフ名は必須です"),
    kana: z.string().min(1, "カナは必須です"),
    is_editor: z.boolean(),
    remarks: z.string().nullable().optional(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
});

// PUT（更新）用（partial）
export const masterStaffUpdateSchema = masterStaffCreateSchema.partial();

export type MasterStaffType = z.infer<typeof masterStaffFromDbSchema>;
export type MasterStaffCreateInput = z.infer<typeof masterStaffCreateSchema>;
export type MasterStaffUpdateInput = z.infer<typeof masterStaffUpdateSchema>;
