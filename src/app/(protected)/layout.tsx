import { createClient } from "@/lib/supabase/server";

import { AuthProvider } from "@/contexts/AuthContext";
import ClientLayout from "./ClientLayout";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    let user = null;
    let profile = null;

    if (session?.user?.email?.endsWith("@amarc.co.jp")) {
        const { data: loginUser } = await supabase
            .from("master_login_users")
            .select(
                `*,
                staffs:master_staffs (*)
                `
            )
            .eq("email", session.user.email)
            .maybeSingle();

        user = loginUser;

        const staffList = loginUser?.staffs ?? [];

        if (staffList.length === 1) {
            profile = staffList[0];
        }
    }

    return (
        <AuthProvider
            initialUser={user}
            initialProfile={profile}
        >
            <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
    );
}
