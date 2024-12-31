import { defineStore } from "pinia";
import { initialState } from "./state";
import { actions } from "./actions";
import { getters } from "./getters";

export const useTaskStore = defineStore("task", {
    state: () => ({ ...initialState }),
    actions,
    getters,
});