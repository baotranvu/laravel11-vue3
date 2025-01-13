import {defineStore} from "pinia";
import {initialState} from "./state";
import {actions} from "./actions";
export const useModalStore = defineStore('modal', {
    state: () => ({
        ...initialState
    }),
    actions,
})