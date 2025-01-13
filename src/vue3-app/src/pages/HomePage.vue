<template>
  <AppLayout>
    <template v-slot:default>
      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <h1>Welcome to the Home Page</h1>
        <p>The current local time is: {{ currentDateTime }}</p>
        <p v-if="currentLocation.latitude && currentLocation.longitude">
          Your current location is: {{ currentLocation.latitude }}, {{ currentLocation.longitude }}
        </p>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
// No additional components needed
import AppLayout from '@/components/AppLayout.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useGlobalStore } from '@/stores/global';
const globalStore = useGlobalStore();
const currentDateTime = ref<string | null>(new Date().toLocaleString());
let timeIntervalId: number = 0;
interface Location {
  latitude: number | null;
  longitude: number | null;
}
const currentLocation = ref<Location>({ latitude: null, longitude: null });

onMounted(() => {
  globalStore.setError(null);
  timeIntervalId = (setInterval(() => {
    currentDateTime.value = new Date().toLocaleString();
  }, 1000) as unknown) as number;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    (error) => {
      const errorMessage = error.message;
      globalStore.setError({ status: error.code || 500, message: errorMessage });
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    }
  );
});

onUnmounted(() => {
  if (timeIntervalId) {
    clearInterval(timeIntervalId);
  }
});
</script>
