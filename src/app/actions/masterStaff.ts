"use server";

import { createClient } from "@/lib/supabase/server";

// import { revalidatePath } from "next/cache";

// 一覧取得
export async function getMasterStaffs() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_staffs")
        .select("*");
    if (error) {
        throw new Error("スタッフマスタ一覧の取得に失敗しました");
    }
    return data;
}
