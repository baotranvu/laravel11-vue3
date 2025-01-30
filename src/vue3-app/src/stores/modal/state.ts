import type { Modal } from "@/types/Modal";

export interface ModalState {
    modals: Array<Modal>;
}
export const initialState: { modals: Array<Modal> } = {
    modals: [],
};