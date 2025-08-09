"use server";

import { createClient } from "@/lib/supabase/server";

// import { revalidatePath } from "next/cache";

// 一覧取得
export async function getMasterPlaces() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("master_places")
        .select("*");
    if (error) {
        throw new Error("場所マスタ一覧の取得に失敗しました");
    }
    return data;
}
