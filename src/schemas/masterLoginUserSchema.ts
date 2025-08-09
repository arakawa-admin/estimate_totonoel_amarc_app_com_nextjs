import { z } from "zod";

// fetch(GET)用
export const masterLoginUserFromDbSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "ユーザー名は必須です"),
    email: z
        .email("正しいメールアドレス形式を入力してください" )
        .min(1, "メールアドレスは必須です")
        .refine(val => val.endsWith("@amarc.co.jp"), {
            message: "メールアドレスは @amarc.co.jp ドメインである必要があります",
        }),
    is_admin: z.boolean(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
});

// POST（新規作成）用
export const masterLoginUserCreateSchema = z.object({
    name: z.string().min(1, "ユーザー名は必須です"),
    email: z
        .email("正しいメールアドレス形式を入力してください")
        .min(1, "メールアドレスは必須です")
        .refine(val => val.endsWith("@amarc.co.jp"), {
            message: "メールアドレスは @amarc.co.jp ドメインである必要があります",
        }),
    is_admin: z.boolean(),
    valid_at: z.string().optional(),
    invalid_at: z.string().optional(),
});

// PUT（更新）用
export const masterLoginUserUpdateSchema = z.object(masterLoginUserCreateSchema.shape).partial();


export type MasterLoginUserType = z.infer<typeof masterLoginUserFromDbSchema>;
export type MasterLoginUserCreateInput = z.infer<typeof masterLoginUserCreateSchema>;
export type MasterLoginUserUpdateInput = z.infer<typeof masterLoginUserUpdateSchema>;
