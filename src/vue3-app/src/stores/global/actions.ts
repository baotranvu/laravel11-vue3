import { GlobalState } from "./state";
import { ErrorType } from "@/types/ErrorType";

export const actions = {
    setLoading(this: GlobalState, loading: boolean): void {
        this.loading = loading;
    },

    setError(this: GlobalState, error: ErrorType | null): void {
        this.error = error;
    },

    toggleMenu(this: GlobalState): void {
        this.isShowMenu = !this.isShowMenu;
    },

    reset(this: GlobalState): void {
        this.loading = false;
        this.error = null;
    },
} as const;