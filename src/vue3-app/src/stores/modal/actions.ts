import { ModalState } from "./state";
import { Modal } from "@/types/Modal";
export const actions = {
    openModal(this: ModalState, modal: Modal) {
        this.modals.push(modal);
    },
    closeModal(this: ModalState, id: string) {
        this.modals = this.modals.filter(modal => modal.id !== id);
    },
    clearModals(this: ModalState) {
        this.modals = [];
    },
    getModalById(this: ModalState, id: string): Modal | undefined {
        return this.modals.find(modal => modal.id === id);
    },
} as const;