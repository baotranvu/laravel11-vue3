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
    confirm<T = unknown>(this: ModalState, id: string, params?: T) {
        const modal = this.modals.find(modal => modal.id === id);
        modal?.onConfirm?.(params ?? modal?.customData);
        this.closeModal(id);
    },
    cancel<T = unknown>(this: ModalState, id: string, params?: T) {
        const modal = this.modals.find(modal => modal.id === id);
        modal?.onCancel?.(params ?? modal?.customData);
        this.closeModal(id);
    },
    getModalById(this: ModalState, id: string): Modal | undefined {
        return this.modals.find(modal => modal.id === id);
    },
} as const;