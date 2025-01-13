export interface Modal {
    id: string;
    activator?: string;
    show: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
}