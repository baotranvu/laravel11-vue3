import { AuthState } from "./state";

export const getters = {
    isAuthenticated: (state: AuthState): boolean => !!state.user && !!state.token,
    userName: (state: AuthState): string | null => state.user?.name || null,
};