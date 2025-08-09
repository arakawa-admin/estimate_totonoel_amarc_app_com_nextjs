"use server";

import { createClient } from "@/lib/supabase/server";

// import { revalidatePath } from "next/cache";
import {
    EstimateCreateInput,
    // EstimateCreateWithDetailsInput,
} from "@/schemas/estimateSchema";
import { EstimateDetailCreateInput } from "@/schemas/estimateDetailSchema";

// 一覧取得
export async function getEstimates() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("estimates")
        .select("*");
    if (error) {
        throw new Error("見積書一覧の取得に失敗しました");
    }
    return data;
}

// 作成 only estimate table
export async function createEstimate(data: EstimateCreateInput) {
    const supabase = await createClient();

    const { data: created, error } = await supabase
        .from("estimates")
        .insert(data)
        .select()
        .single();

    if (error || !created) {
        throw new Error(
            `見積書の作成に失敗しました: ${error?.message}`
        );
    }

    // revalidatePath("/"); // 必要なら一覧を再読み込み
    return created;
}

// 作成
export async function createEstimateWithDetails(
    estimateData: EstimateCreateInput,
    detailsData: EstimateDetailCreateInput[]
) {
    const supabase = await createClient();

    const { data: created, error } = await supabase.rpc("create_estimate_with_details", {
        p_estimate: estimateData,
        p_details: detailsData,
    });

    if (error) {
        console.error(error);
    } else {
        console.log("作成された見積書ID:", created.id);
        return created;
    }
}
