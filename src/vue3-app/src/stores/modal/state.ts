import type { Modal } from "@/types/Modal";

export interface ModalState {
    closeModal(id: string): unknown;
    modals: Array<Modal>;
}
export const initialState: { modals: Array<Modal> } = {
    modals: [],
};