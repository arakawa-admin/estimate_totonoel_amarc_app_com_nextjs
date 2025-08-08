import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export async function seedMasterNorms() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
    // 既存データ削除（全部）
    {
        const { error } = await supabase
            .from("master_norms")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (error) {
            console.error("Delete error:", error);
            throw error;
        }
    }

    const norms = [
        {
            name: "鉄くず",
            sequence: 10,
        },
        {
            name: "鉄くず(級外)",
            sequence: 20,
        },
        {
            name: "雑線",
            sequence: 30,
        },
        {
            name: "OA機器",
            sequence: 40,
        },
        {
            name: "骨董品・置物等",
            sequence: 50,
        },
        {
            name: "古紙",
            sequence: 60,
        },
        {
            name: "古布",
            sequence: 70,
        },
        {
            name: "一般可燃物",
            sequence: 80,
        },
        {
            name: "一般不燃物",
            sequence: 90,
        },
        {
            name: "廃木",
            sequence: 100,
        },
    ];

    for (const norm of norms) {
        const loginPayload = {
            id: uuidv4(),
            name: norm.name,
            sequence: norm.sequence,
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        };

        const { error: userErr } = await supabase
            .from("master_norms")
            .insert([loginPayload]);
        if (userErr) {
            console.error("Insert login_user error:", userErr);
            throw userErr;
        }
    }

    console.log("master_norms seeded successfully!");
}
