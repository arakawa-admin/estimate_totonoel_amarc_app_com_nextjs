import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function seedSystemSettings() {
    // 既存データ削除
    const { error: deleteError } = await supabase
        .from("system_settings")
        .delete()
        .gte("id", "00000000-0000-0000-0000-000000000000"); // uuidの最小値を指定

    if (deleteError) {
        console.error("Delete error:", deleteError.message);
        throw deleteError;
    }

    const datas = [
        {
            id: uuidv4(),
            key: "awared_month",
            value: "2025-06-01",
            description: "表彰済みの月",
        },
    ];

    const { error } = await supabase.from("system_settings").insert(datas);
    if (error) {
        console.error("Seed error:", error.message);
        throw error;
    }

    console.log("system_settings seeded successfully!");
}

if (require.main === module) {
    seedSystemSettings()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

module.exports = {
    seedSystemSettings,
};
