<template>
  <v-layout class="d-flex flex-column" width="100%">
    <AppNavbar/>
    <AppMenu>
      <template v-slot:content>
        <v-main class="main-bg d-flex align-center justify-center" :min-height="'calc(100vh - 64px - 100px)'" :min-width="'300px'">
          <slot></slot>
        </v-main>
      </template>
    </AppMenu>
    <AppFooter/>
  </v-layout>
</template>

<script setup lang="ts">
import AppNavbar from './AppNavbar.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';
</script>
