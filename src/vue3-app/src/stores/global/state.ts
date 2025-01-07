import { ErrorType } from '@/types/ErrorType';

export interface GlobalState {
    loading: boolean;
    error: ErrorType | null;
    isShowMenu: boolean
}

export const initialState: GlobalState = {
    loading: false,
    error: null,
    isShowMenu: false
};