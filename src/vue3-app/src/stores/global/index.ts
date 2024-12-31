import { defineStore } from 'pinia';
import { initialState } from './state';
import { actions } from './actions';
import { getters } from './getters';

export const useGlobalStore = defineStore('global', {
    state: () => ({ ...initialState }),
    getters,
    actions,
});