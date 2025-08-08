import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export async function seedMasterUnits() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
    // 既存データ削除（全部）
    {
        const { error } = await supabase
            .from("master_units")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (error) {
            console.error("Delete error:", error);
            throw error;
        }
    }

    const units = [
        {
            name: "kg",
            sequence: 10,
        },
        {
            name: "台",
            sequence: 20,
        },
        {
            name: "枚",
            sequence: 30,
        },
        {
            name: "式",
            sequence: 40,
        },
        {
            name: "時間",
            sequence: 50,
        },
    ];

    for (const unit of units) {
        const loginPayload = {
            id: uuidv4(),
            name: unit.name,
            sequence: unit.sequence,
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        };

        const { error: userErr } = await supabase
            .from("master_units")
            .insert([loginPayload]);
        if (userErr) {
            console.error("Insert login_user error:", userErr);
            throw userErr;
        }
    }

    console.log("master_units seeded successfully!");
}
