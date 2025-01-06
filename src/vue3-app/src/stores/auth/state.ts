import { User } from '@/types/Auth';

export interface AuthState {
    user: User | null;
    token: string | null;
}

export const initialState: AuthState = {
    user: null,
    token: sessionStorage.getItem('api_token') || null,
};