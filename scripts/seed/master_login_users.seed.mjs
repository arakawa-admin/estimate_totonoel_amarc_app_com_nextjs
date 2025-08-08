import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export async function seedMasterLoginUsers() {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
    // 既存データ削除（全部）
    {
        const { error } = await supabase
            .from("master_login_users")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (error) {
            console.error("Delete error:", error);
            throw error;
        }
        const { error: e2 } = await supabase
            .from("master_staffs")
            .delete()
    		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定
        if (e2) {
            console.error("Delete staffs error:", e2);
            throw e2;
        }
    }

    const users = [
        {
            name: "若林 雅也",
            email: "wakabayashi",
            is_admin: true,
            staffs: [
                {
                    name: "若林 雅也",
                    kana: "ワカバヤシ マサヤ",
                    is_editor: true,
                },
            ],
        },
        {
            name: "坂下リサイクルサービス 共有",
            email: "brs",
            is_admin: true,
            staffs: [
                { name: "編集者", kana: "ヘンシュウシャ", is_editor: true },
                { name: "閲覧者", kana: "エツランシャ", is_editor: false },
            ],
        },
    ];

    for (const user of users) {
        const login_user_id = uuidv4();

        const loginPayload = {
            id: login_user_id,
            name: user.name,
            email: `${user.email}@amarc.co.jp`,
            is_admin: user.is_admin,
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        };

        const { error: userErr } = await supabase
            .from("master_login_users")
            .insert([loginPayload]);
        if (userErr) {
            console.error("Insert login_user error:", userErr);
            throw userErr;
        }

        const staffPayloads = user.staffs.map((s) => ({
            id: uuidv4(),
            login_user_id,
            name: s.name,
            kana: s.kana,
            is_editor: s.is_editor,
            remarks: "",
            valid_at: "2024-01-01T00:00:00Z",
            invalid_at: "2050-12-31T00:00:00Z",
        }));

        const { error: staffErr } = await supabase
            .from("master_staffs")
            .insert(staffPayloads);
        if (staffErr) {
            console.error("Insert staffs error:", staffErr);
            throw staffErr;
        }
    }

    console.log("master_login_users seeded successfully!");
}
