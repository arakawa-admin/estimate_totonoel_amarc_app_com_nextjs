"use server";

import { createClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache";

// 一覧取得（全員許可）
export async function getMasterTypes() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_types")
        .select("*");
    if (error) {
        throw new Error("提案種別マスタ一覧の取得に失敗しました");
    }
    return data;
}

// 詳細取得（全員許可）
export async function getMasterType(id: string) {
    // await getUserWithRole();

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_types")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        throw new Error("提案種別マスタの詳細取得に失敗しました");
    }
    return data;
}

// // 作成（認証＋ロールチェック）
// export async function createMasterType(data: MasterTypeCreateInput) {
//     // await getUserWithRole(["admin", "editor"]); // admin/editorのみ許可

//     const supabase = await createClient();

//     const { error } = await supabase.from("master_types").insert(data);
//     if (error) throw new Error("提案種別マスタの作成に失敗しました");

//     // revalidatePath("/"); // 必要なら一覧を再読み込み
// }

// // 更新（認証＋ロールチェック）
// export async function updateMasterType(
//     id: string,
//     data: MasterTypeUpdateInput
// ) {
//     // await getUserWithRole(["admin", "editor"]);

//     const supabase = await createClient();

//     const { error } = await supabase
//         .from("master_types")
//         .update(data)
//         .eq("id", id);
//     if (error) throw new Error("提案種別マスタの更新に失敗しました");

//     // revalidatePath("/");
// }

// // 削除（認証＋ロールチェック）
// export async function deleteMasterType(id: string) {
//     // await getUserWithRole(["admin"]);

//     const supabase = await createClient();

//     const { error } = await supabase
//         .from("master_types")
//         .delete()
//         .eq("id", id);
//     if (error) throw new Error("提案種別マスタの削除に失敗しました");

//     // revalidatePath("/");
// }
