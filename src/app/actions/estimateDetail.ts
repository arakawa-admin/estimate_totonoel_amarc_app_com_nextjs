"use server";

import { createClient } from "@/lib/supabase/server";
import {
    EstimateDetailCreateInput,
} from "@/schemas/estimateDetailSchema";

// import { revalidatePath } from "next/cache";

// 作成
export async function createEstimateDetail(data: EstimateDetailCreateInput) {
    const supabase = await createClient();

    const { error } = await supabase.from("proposal_details").insert(data);
    if (error) throw new Error("見積書詳細の作成に失敗しました");

    // revalidatePath("/"); // 必要なら一覧を再読み込み
}
