import { AuthState } from "./state";
import { User } from "@/types/Auth";

export default {
    setUser(state: AuthState, user: User | null) {
        state.user = user;
    },
    setToken(state: AuthState, token: string | null) {
        state.token = token;
    },
    reset(state: AuthState) {
        state.user = null;
        state.token = null;
    },
}