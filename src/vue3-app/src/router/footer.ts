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
    {
        path: '/terms',
        name: 'terms-of-service',
        component: () => import('@/pages/Footer/TermsPage.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/faq',
        name: 'faq',
        component: () => import('@/pages/Footer/FaqPage.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/policy',
        name: 'privacy-policy',
        component: () => import('@/pages/Footer/PolicyPage.vue'),
        meta: {
            requiresAuth: false,
        },
    },
]