"use server";

import { createClient } from "@/lib/supabase/server";

// import { revalidatePath } from "next/cache";
import {
    MasterLoginUserCreateInput,
    MasterLoginUserUpdateInput,
} from "@/schemas/masterLoginUserSchema";

// ユーザー認証・認可チェック
// async function getUserWithRole(
//     // allowedRoles: string[] = []
// ) {
//     const cookieStore = await cookies()
    // const supabase = await createClient(cookieStore);

//     const {
//         data: { user },
//         error,
//     } = await supabase.auth.getUser();

//     if (error || !user) {
//         throw new Error("Unauthorized: サインインしてください");
//     }

//     // TODO: ユーザーロールの取得方法を適切に実装
//     // console.log(allowedRoles);
//     // const userRole = user.user_metadata?.role;
//     // if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
//     //     throw new Error(
//     //         `Forbidden: 権限不足（必要ロール: ${allowedRoles.join(", ")})`
//     //     );
//     // }

//     return user;
// }

// 一覧取得（全員許可）
export async function getMasterLoginUsers() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_login_users")
        .select("*");
    if (error) {
        throw new Error("ログインユーザマスタ一覧の取得に失敗しました");
    }
    return data;
}

// 詳細取得（全員許可）
export async function getMasterLoginUser(id: string) {
    // await getUserWithRole();

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_login_users")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        throw new Error("ログインユーザマスタの詳細取得に失敗しました");
    }
    return data;
}

// 作成（認証＋ロールチェック）
export async function createMasterLoginUser(data: MasterLoginUserCreateInput) {
    // await getUserWithRole(["admin", "editor"]); // admin/editorのみ許可

    const supabase = await createClient();

    const { error } = await supabase.from("master_login_users").insert(data);
    if (error) throw new Error("ログインユーザマスタの作成に失敗しました");

    // revalidatePath("/"); // 必要なら一覧を再読み込み
}

// 更新（認証＋ロールチェック）
export async function updateMasterLoginUser(
    id: string,
    data: MasterLoginUserUpdateInput
) {
    // await getUserWithRole(["admin", "editor"]);

    const supabase = await createClient();

    const { error } = await supabase
        .from("master_login_users")
        .update(data)
        .eq("id", id);
    if (error) throw new Error("ログインユーザマスタの更新に失敗しました");

    // revalidatePath("/");
}

// 削除（認証＋ロールチェック）
export async function deleteMasterLoginUser(id: string) {
    // await getUserWithRole(["admin"]);

    const supabase = await createClient();

    const { error } = await supabase
        .from("master_login_users")
        .delete()
        .eq("id", id);
    if (error) throw new Error("ログインユーザマスタの削除に失敗しました");

    // revalidatePath("/");
}
