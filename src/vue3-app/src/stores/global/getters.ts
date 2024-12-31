import { GlobalState } from "./state";
import { ErrorType } from "@/types/ErrorType";

export const getters = {
    getError: (state: GlobalState): ErrorType | null => state.error,
    getLoading: (state: GlobalState): boolean => state.loading,
    hasError: (state: GlobalState): boolean => state.error !== null,
} as const;