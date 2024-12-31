import { AuthState } from "./state";
import { User } from "@/types/Auth";

export const getters = {
    isAuthenticated: (state: AuthState): boolean => !!state.user && !!state.token,
    getUser: (state: AuthState): User | null => state.user,
    getUserName: (state: AuthState): string | null => state.user?.name || null,
    getToken: (state: AuthState): string | null => state.token || null
};