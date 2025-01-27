import { RouteRecordRaw } from 'vue-router'
import { footerRoutes } from './footer';
import { errorRoutes } from './errors';
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
    {
        path: '/task/:id',
        name: 'task',
        component: () => import('@/pages/Task/TaskDetailPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    ...footerRoutes,
    ...errorRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/Error/NotFoundPage.vue'),
    },
];