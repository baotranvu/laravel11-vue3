<template>
  <AppLayout>
    <template v-slot:default>
      <div class="d-flex flex-column align-items-center justify-content-center p-4">
        <h1>About Us</h1>
        <p>
          We are a team of developers who are passionate about creating
          innovative and user-friendly applications.
        </p>
      </div>
    </template>
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue';
</script>