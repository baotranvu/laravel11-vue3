import { RouteRecordRaw } from 'vue-router'

export const footerRoutes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/Footer/AboutPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/Footer/ContactPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/terms',
        name: 'terms-of-service',
        component: () => import('@/pages/Footer/TermsPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/faq',
        name: 'faq',
        component: () => import('@/pages/Footer/FaqPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/policy',
        name: 'privacy-policy',
        component: () => import('@/pages/Footer/PolicyPage.vue'),
        meta: {
            requiresAuth: true,
        },
    },
]