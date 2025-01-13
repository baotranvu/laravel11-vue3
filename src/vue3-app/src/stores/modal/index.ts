import {defineStore} from "pinia";
import {initialState} from "./state";
import {actions} from "./actions";
import {getters} from "./getters";

export const useModalStore = defineStore('modal', {
    state: () => ({ ...initialState }),
    actions: actions as any,
    getters: getters as any
})