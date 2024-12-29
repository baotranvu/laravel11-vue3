import { AuthState } from "./state";
import { User } from "@/types/Auth";

export default {
    getIsAuthenticated: (state: AuthState): boolean => state.isAuthenticated,
    getUser: (state: AuthState): User | null => state.user,
    getUserName: (state: AuthState): string | null => state.user?.name || null,
    getToken: (state: AuthState): string | null => state.token || null
};