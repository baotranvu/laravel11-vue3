export type User = {
    id: number;
    name: string;
    email: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}