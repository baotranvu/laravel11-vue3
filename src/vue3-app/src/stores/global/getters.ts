import { GlobalState } from "./state";

export const getters = {
    hasError: (state: GlobalState): boolean => state.error !== null,
    isLoading: (state: GlobalState): boolean => state.loading
} as const;