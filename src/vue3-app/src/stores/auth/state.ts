import { User } from '@/types/Auth';


export interface AuthState {
    user: User | null;
    readonly isAuthenticated: boolean;
    token: string | null;
}

export const state = () : AuthState => ({
    user: null,
    get isAuthenticated() {
        return !!this.user && !!this.token;
    },
    token: null
});