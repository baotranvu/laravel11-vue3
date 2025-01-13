<template>
  <AppLayout>
    <template v-slot:default>
      <v-container class="d-flex flex-column align-items-center">
        <v-row>
          <v-col>
            <h1>Welcome to Your Todo List App!</h1>
            <p>Your mission to stay organized starts here.</p>
            <v-btn color="primary" @click="startTask">Get Started</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Current Date and Time</h2>
            <v-card>
              <v-card-title>
                <v-icon left>mdi-calendar</v-icon>
                {{ currentDate }} - {{ currentTime }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import { useRouter } from 'vue-router';

const currentTime = ref('');
const currentDate = ref('');
const router = useRouter();
let intervalId: ReturnType<typeof setInterval>;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  currentDate.value = now.toLocaleDateString(); // Update the date
};

const startTask = async () => {
  try {
    await router.push({ name: 'tasks' });
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000); // Update time every second
});

onUnmounted(() => {
  clearInterval(intervalId); // Clear the interval when the component is unmounted
});
</script>
