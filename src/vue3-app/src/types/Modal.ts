export interface Modal<T = unknown> {
    id: string;
    title: string;
    message: string;
    customData?: T;
    onConfirm?: (params?: T) => void;
    onCancel?: (params?: T) => void;
}