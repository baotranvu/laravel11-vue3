
<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const { checkAuth } = useAuth();
const { isAuthenticated } = storeToRefs(useAuthStore());
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
    <Navbar v-if="![ 'login', 'register' ].includes(currentRouteName)" />
    <div class="main-container">
        <router-view></router-view>
    </div>
    <AppFooter />
</template>
<style scoped>
    .main-container {
        width: 100%;
        min-height: 100vh;
        background-image: url('./assets/images/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>
