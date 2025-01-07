<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const router = useRouter();
const { checkAuth } = useAuth();
const { isAuthenticated } = storeToRefs(useAuthStore());
const currentRouteName = computed(() => String(router.currentRoute.value.name));
router.beforeEach(async (to, _from, next) => {
    if (to.meta.requiresAuth) {
        await checkAuth();
        if (isAuthenticated.value) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});
</script>
<template>
    <Navbar v-if="!['login', 'register'].includes(currentRouteName)" />
    <div class="main-container">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
    <AppFooter />
</template>
<style scoped>
@import './assets/main.css';
</style>
