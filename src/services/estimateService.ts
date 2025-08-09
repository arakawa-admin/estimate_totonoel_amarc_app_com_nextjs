import {
    // createEstimate,
    createEstimateWithDetails
} from "@/app/actions/estimate";
// import { createEstimateDetail } from "@/app/actions/estimateDetail";

import { z } from "zod";

import { estimateCreateSchema } from "@/schemas/estimateSchema";
import { estimateDetailCreateSchema } from "@/schemas/estimateDetailSchema";

export async function createEstimateWithRelations(fd: FormData) {
    try {
        const raw: unknown = {
            author_id: fd.get("author_id"),
            staff_id: fd.get("staff_id"),
            title: fd.get("title"),
            estimate_at: new Date(fd.get("estimate_at") as string),
            customer_name: fd.get("customer_name"),
            place: fd.get("place"),
            remarks: fd.get("remarks"),
        };
console.log(raw)
        // --- Zod でバリデーション ---
        const input = estimateCreateSchema.parse(raw);
        const {
            title,
            author_id,
            staff_id,
            estimate_at,
            customer_name,
            place,
            remarks,
        } = input;

        // 見積書を作成
        const estimateData = {
            title,
            author_id,
            staff_id,
            estimate_at,
            customer_name,
            place,
            remarks,
        };

        // const createdEstimate = await createEstimate(estimateData);

        // --- Zod でバリデーション ---
        // const detailBaseSchema = estimateDetailCreateSchema.omit({
        //     estimate_id: true,
        //     sequence: true,
        // });
        const detailsJson = fd.get("details");
        if (!detailsJson) throw new Error("details is missing");
        const detailsData = z.array(estimateDetailCreateSchema).parse(JSON.parse(detailsJson as string));

        // await Promise.all(
        //     details.map((d, i) =>
        //         // 見積書詳細を作成
        //         createEstimateDetail(
        //             estimateDetailCreateSchema.parse({
        //                 ...d,
        //                 estimate_id: createdEstimate.id,
        //                 sequence: i + 1,
        //             })
        //         )
        //     )
        // );
console.log(estimateData)
console.log(detailsData)

        const createdEstimate = await createEstimateWithDetails(
            estimateData,
            detailsData
        );

        return createdEstimate;
    } catch (err) {
        console.error(err);
    }
}
