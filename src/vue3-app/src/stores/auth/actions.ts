import { AuthState } from "./state";
import { User } from "@/types/Auth";

export const actions = {
    setUser(this: AuthState, user: User | null) {
        this.user = user;
    },
    setToken(this: AuthState, token: string | null) {
        this.token = token;
        if (token) {
            sessionStorage.setItem('api_token', token);
        }
    },
    reset(this: AuthState) {
        this.user = null;
        this.token = null;
        sessionStorage.removeItem('api_token');
    },
    removeToken(this: AuthState) {
        this.token = null;
        sessionStorage.removeItem('api_token');
    }
} as const;