import {ModalState} from "./state";
import {Modal} from "@/types/Modal";

export const getters = {
    getCurrentModals: (state: ModalState): Array<Modal> => state.modals
} as const;