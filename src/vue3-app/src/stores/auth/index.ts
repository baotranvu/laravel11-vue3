import { defineStore } from 'pinia';
import { initialState } from './state';
import { actions } from './actions';
import { getters } from './getters';

export const useAuthStore = defineStore('auth', {
    state: () => ({ ...initialState }),
    actions,
    getters,
});