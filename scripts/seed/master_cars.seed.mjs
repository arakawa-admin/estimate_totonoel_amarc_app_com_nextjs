import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export async function seedMasterCars() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
    // 既存データ削除（全部）
    {
        const { error } = await supabase
            .from("master_cars")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (error) {
            console.error("Delete error:", error);
            throw error;
        }
    }

    const cars = [
        {
            name: "軽トラック",
            no: 9568,
            unit_price: 3500,
        },
        {
            name: "軽バン",
            no: 150,
            unit_price: 3500,
        },
        {
            name: "2t車",
            no: 5132,
            unit_price: 4500,
        },
        {
            name: "4t車",
            no: 1234,
            unit_price: 5000,
        },
        {
            name: "6tアームロール車",
            no: 705,
            unit_price: 5500,
        },
        {
            name: "10t車",
            no: 523,
            unit_price: 6500,
        },
    ];

    for (const car of cars) {
        const loginPayload = {
            id: uuidv4(),
            name: car.name,
            no: car.no,
            unit_price: car.unit_price,
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        };

        const { error: userErr } = await supabase
            .from("master_cars")
            .insert([loginPayload]);
        if (userErr) {
            console.error("Insert login_user error:", userErr);
            throw userErr;
        }
    }

    console.log("master_cars seeded successfully!");
}
