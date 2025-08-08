import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export async function seedMasterPlaces() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
    // 既存データ削除（全部）
    {
        const { error } = await supabase
            .from("master_places")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (error) {
            console.error("Delete error:", error);
            throw error;
        }
    }

    const places = [
        {
            name: "会津坂下町",
            sequence: 10,
        },
        {
            name: "喜多方市",
            sequence: 20,
        },
        {
            name: "会津若松市",
            sequence: 30,
        },
        {
            name: "柳津町",
            sequence: 40,
        },
        {
            name: "三島町",
            sequence: 50,
        },
        {
            name: "金山町",
            sequence: 60,
        },
        {
            name: "昭和村",
            sequence: 70,
        },
        {
            name: "北塩原村",
            sequence: 80,
        },
    ];

    for (const place of places) {
        const loginPayload = {
            id: uuidv4(),
            name: place.name,
            sequence: place.sequence,
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        };

        const { error: userErr } = await supabase
            .from("master_places")
            .insert([loginPayload]);
        if (userErr) {
            console.error("Insert login_user error:", userErr);
            throw userErr;
        }
    }

    console.log("master_places seeded successfully!");
}
