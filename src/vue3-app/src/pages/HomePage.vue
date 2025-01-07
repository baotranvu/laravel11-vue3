<template>
  <AppLayout>
    <div class="d-flex flex-column align-items-center justify-content-center w-100">
      <h1>Welcome to the Home Page</h1>
      <p>The current local time is: {{ currentDateTime }}</p>
      <p v-if="currentLocation.latitude && currentLocation.longitude">
        Your current location is: {{ currentLocation.latitude }}, {{ currentLocation.longitude }}
      </p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
// No additional components needed
import AppLayout from '@/components/AppLayout.vue';
import { onMounted, ref } from 'vue';
import { useGlobalStore } from '@/stores/global';
const globalStore = useGlobalStore();
const currentDateTime = ref<string | null>(new Date().toLocaleString());

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const currentLocation = ref<Location>({ latitude: null, longitude: null });

onMounted(() => {
  globalStore.setError(null);
  setInterval(() => {
    currentDateTime.value = new Date().toLocaleString();
  }, 1000);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    (error) => {
      console.error('Error getting location:', error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    }
  );
});
</script>
