import { RouteRecordRaw } from 'vue-router'
import { footerRoutes } from './footer';
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Auth/LoginPage.vue'),
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: () => import('@/pages/Task/TaskPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    ...footerRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/ErrorPage.vue'),
    },
];