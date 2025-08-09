"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import type { MasterLoginUserType } from "@/schemas/masterLoginUserSchema";
import type { MasterStaffType } from "@/schemas/masterStaffSchema";

interface LoginUserType extends MasterLoginUserType {
    staffs: MasterStaffType[];
}
type AuthCtx = {
    user: LoginUserType | null;
    profile: MasterStaffType | null;
    setProfile: (profile: MasterStaffType) => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthCtx>({
    user: null,
    profile: null,
    setProfile: () => { },
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
    children,
    initialUser,
    initialProfile,
}: {
    children: ReactNode;
    initialUser: LoginUserType | null;
    initialProfile: MasterStaffType | null;
}) {
    const router = useRouter();
    const supabase = createClient();

    const [user] = useState<LoginUserType | null>(initialUser);
    const [profile, setProfile] = useState<MasterStaffType | null>(initialProfile);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT" || !session?.user) {
            router.push("/login");
        } else {
            router.refresh(); // layout.tsx 再実行
        }
        });

        return () => authListener.subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const resolveProfile = async () => {
            if (user && user.staffs) {
                const staffList = user.staffs;
                const staffId = sessionStorage.getItem("selectedStaffId");

                if (staffId) {
                    const { data } = await supabase
                        .from("master_staffs")
                        .select(`*`)
                        .eq("id", staffId)
                        .single();

                    if (!data) {
                        sessionStorage.removeItem("selectedStaffId");
                        router.push("/login");
                        return;
                    }
                    setProfile(data);

                } else {
                    if (staffList.length === 1) {
                        setProfile(staffList[0]);
                        sessionStorage.setItem("selectedStaffId", staffList[0].id);
                    } else {
                        setIsLoading(false);
                        router.push("/staff/select");
                        return;
                    }
                }
            }
            setIsLoading(false); // 👈 認証 & プロファイル選択 完了
        };

        resolveProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <AuthContext.Provider
            value={{ user, profile, setProfile, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}
