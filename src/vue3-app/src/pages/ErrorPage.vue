<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div class="mb-6">
          <h1 class="text-6xl font-bold text-red-500 mb-4">{{ statusCode }}</h1>
          <p class="text-xl text-gray-700 mb-2">{{ message }}</p>
          <p class="text-gray-500"></p>
        </div>
        <v-btn
          color="primary"
          variant="outlined"
          to="/" 
          class="mx-auto"
          size="large"
          prepend-icon="mdi-arrow-left"
        >
          Back to Home
        </v-btn>
      </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import { useGlobalStore } from '@/stores/global';

    const { error } = useGlobalStore();
    const statusCode  = ref(error?.status || 404);
    const message = ref(error?.message || 'Not Found');

    
</script>

<style scoped>
    .error-page {
        text-align: center;
        margin-top: 50px;
    }
</style>
