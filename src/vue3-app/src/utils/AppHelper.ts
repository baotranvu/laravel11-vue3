import { Router } from "vue-router";
import { HTTP_STATUS_CODES } from "@/constants";
import { ErrorType } from "@/types/ErrorType";

export const redirectToErrorPage = (router: Router, error: ErrorType) => {
    switch (error.status) {
        case HTTP_STATUS_CODES.UNAUTHORIZED:
            router.push("/login");
            break;
        case HTTP_STATUS_CODES.FORBIDDEN:
            router.push("/403");
            break;
        default:
            break;
    }
};