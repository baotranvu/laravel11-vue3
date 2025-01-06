import { GlobalState } from "./state";
import { ErrorType } from "@/types/ErrorType";

export const getters = {
    error: (state: GlobalState): ErrorType | null => state.error,
    hasError: (state: GlobalState): boolean => state.error !== null,
    isLoading: (state: GlobalState): boolean => state.loading
} as const;