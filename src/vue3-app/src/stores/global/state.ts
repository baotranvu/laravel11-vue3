import { ErrorType } from '@/types/ErrorType';

export interface GlobalState {
    loading: boolean;
    error: ErrorType | null;
}

export const initialState: GlobalState = {
    loading: false,
    error: null,
};