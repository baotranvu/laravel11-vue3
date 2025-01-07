<script setup lang="ts">

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
    <router-view class="w-100 h-100 d-flex align-center justify-center p-4" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
          <component :is="Component" />
      </transition>
    </router-view>
</template>
<style scoped>
.main-bg {
  background-image: url('@/assets/image/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
