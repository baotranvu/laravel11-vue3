<template>
  <v-app>
    <!-- Heder -->
    <AppNavbar v-if="$vuetify.display.mdAndUp && isAuthenticated" />

     <!-- <drawer /> -->
     <AppMenu v-if="isAuthenticated" />

    <!-- Content -->
    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <AppFooter v-if="$vuetify.display.mdAndUp" />
  </v-app>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu.vue';
import AppNavbar from './AppNavbar.vue';
import AppFooter from './AppFooter.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
</script>