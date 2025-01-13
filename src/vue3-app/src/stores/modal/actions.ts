import { ModalState } from "./state";
import { Modal } from "@/types/Modal";
export const actions = {
    openModal(this: ModalState, {id, title, message, customData, onConfirm, onCancel}: Modal) {
        this.modals.push({id, title, message, customData, onConfirm, onCancel});
    },
    closeModal(this: ModalState, id: string) {
        this.modals = this.modals.filter(modal => modal.id !== id);
    },
    clearModals(this: ModalState) {
        this.modals = [];
    },
    confirm(this: ModalState, id: string, params?: any) {
        const modal = this.modals.find(modal => modal.id === id);
        if (modal && modal.onConfirm) modal.onConfirm(params || modal.customData);
        this.closeModal(id);
    },
    cancel(this: ModalState, id: string, params?: any) {
        const modal = this.modals.find(modal => modal.id === id);
        if (modal && modal.onCancel) modal.onCancel(params || modal.customData);
        this.closeModal(id);
    },
} as const;