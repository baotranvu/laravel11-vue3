export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.todo-list.com:8080/api';

export const API_VERSION = 'v2';