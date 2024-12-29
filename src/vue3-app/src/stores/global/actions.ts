import { GlobalState } from "./state";
import { ErrorType } from "@/types/ErrorType";

export default {
    setLoading(state: GlobalState, loading: boolean) {
        state.loading = loading;
    },
    setError(state: GlobalState, error: ErrorType | null) {
        state.error = error;
    },
    reset(state: GlobalState) {
        state.loading = false;
        state.error = null;
    },
    clearError(state: GlobalState) {
        state.error = null;
    },
}