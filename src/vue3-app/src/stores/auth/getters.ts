import { AuthState } from "./state";

export const getters = {
    isAuthenticated: (state: AuthState): boolean => !!state.user && !!state.token,
    getUserName: (state: AuthState): string => state.user?.name || '',
};