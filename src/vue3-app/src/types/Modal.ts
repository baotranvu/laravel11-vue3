export interface Modal {
    id: string;
    title: string;
    message: string;
    customData?: any;
    onConfirm?: (params?: any) => void;
    onCancel?: (params?: any) => void;
}