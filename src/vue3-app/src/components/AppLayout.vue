<template>
  <v-app>
    <!-- Heder -->
    <AppNavbar />

     <!-- <drawer /> -->
     <AppMenu v-if="isShowMenu" />

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
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
const globalStore = useGlobalStore()
const { isShowMenu } = storeToRefs(globalStore)
</script>