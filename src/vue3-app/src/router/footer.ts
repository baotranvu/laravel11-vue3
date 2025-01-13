import { RouteRecordRaw } from 'vue-router'

export const footerRoutes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/Footer/AboutPage.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/Footer/ContactPage.vue'),
        meta: {
            requiresAuth: false,
        },
    },
]