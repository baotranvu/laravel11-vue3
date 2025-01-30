import { RouteRecordRaw } from 'vue-router';

export const errorRoutes: Array<RouteRecordRaw> = [
    {
        // 403
        path: '/403',
        name: '403',
        component: () => import('@/pages/Error/ForbiddenPages.vue'),
        meta: {
            requiresAuth: false,
        }
    },
    {
        // 500
        path: '/500',
        name: '500',
        component: () => import('@/pages/Error/InternalServerErrorPage.vue'),
        meta: {
            requiresAuth: false,
        }
    },
];