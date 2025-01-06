import { RouteRecordRaw } from 'vue-router'

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
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/LoginPage.vue'),
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: () => import('@/pages/TaskPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/ErrorPage.vue'),
    },
];