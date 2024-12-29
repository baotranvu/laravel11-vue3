<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
      <div class="mb-6">
        <h1 class="text-6xl font-bold text-red-500 mb-4">{{ error.status }}</h1>
        <p class="text-xl text-gray-700 mb-2">{{ error.message }}</p>
        <p class="text-gray-500"></p>
      </div>
      <button 
        @click="goToHome" 
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mx-auto"
      >
        <span class="mr-2">←</span>
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ErrorType } from '@/types/ErrorType';

defineProps<{ error: ErrorType }>()
const emit = defineEmits(['clear-error']);
const goToHome = () => {
  emit('clear-error');
}
</script>
