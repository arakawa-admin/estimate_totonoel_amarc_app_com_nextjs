import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export async function seedMasterAbstracts() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
    // 既存データ削除（全部）
    {
        const { error } = await supabase
            .from("master_abstracts")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (error) {
            console.error("Delete error:", error);
            throw error;
        }
    }

    const abstracts = [
        {
            name: "産業廃棄物処分料",
            sequence: 10,
        },
        {
            name: "廃家電リサイクル料",
            sequence: 20,
        },
        {
            name: "買取",
            sequence: 30,
        },
        {
            name: "処分費",
            sequence: 40,
        },
        {
            name: "回収作業運搬費",
            sequence: 50,
        },
    ];

    for (const abstract of abstracts) {
        const loginPayload = {
            id: uuidv4(),
            name: abstract.name,
            sequence: abstract.sequence,
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        };

        const { error: userErr } = await supabase
            .from("master_abstracts")
            .insert([loginPayload]);
        if (userErr) {
            console.error("Insert login_user error:", userErr);
            throw userErr;
        }
    }

    console.log("master_abstracts seeded successfully!");
}
