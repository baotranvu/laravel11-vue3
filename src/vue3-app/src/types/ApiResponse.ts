import { ErrorType } from './ErrorType';
export interface ApiResponse {
    data: any;
    status: number;
    message: string;
    success: boolean;
    errors: ErrorType | null;
}