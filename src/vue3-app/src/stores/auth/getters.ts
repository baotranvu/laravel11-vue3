import { AuthState } from "./state";
import { User } from "@/types/Auth";

export const getters = {
    isAuthenticated: (state: AuthState): boolean => !!state.user && !!state.token,
    user: (state: AuthState): User | null => state.user,
    userName: (state: AuthState): string | null => state.user?.name || null,
    token: (state: AuthState): string | null => state.token || null,
};