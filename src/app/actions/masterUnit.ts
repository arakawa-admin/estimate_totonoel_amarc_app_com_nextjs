"use server";

import { createClient } from "@/lib/supabase/server";

// import { revalidatePath } from "next/cache";

// 一覧取得
export async function getMasterUnits() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_units")
        .select("*");
    if (error) {
        throw new Error("単位マスタ一覧の取得に失敗しました");
    }
    return data;
}
