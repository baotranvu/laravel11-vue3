import { GlobalState } from "./state";
import { ErrorType } from "@/types/ErrorType";

export default {
    getError: (state: GlobalState): ErrorType | null => state.error,
    getLoading: (state: GlobalState): boolean => state.loading,
};