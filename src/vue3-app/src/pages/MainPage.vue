<template>
    <div class="main-container">
        <login-page v-if="!isAuthenticated"/>
        <task-page v-else />
    </div>
</template>


<style scoped>
.main-container {
    width: 100%;
    min-height: 100vh;
}
</style>
<script setup lang="ts">
import LoginPage from './LoginPage.vue'
import TaskPage from './TaskPage.vue'
import { useAuthStore } from '@/stores/auth'
import { useAuth } from '@/composables/useAuth'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const auth = useAuth()
const { isAuthenticated } = storeToRefs(authStore)
onMounted(() => {
    auth.checkAuth()
})
</script>