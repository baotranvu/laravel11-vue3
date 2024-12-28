<template>
    <div class="main-container">
        <login-page v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
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
import { ref, onMounted } from 'vue'
import LoginPage from './LoginPage.vue'
import TaskPage from './TaskPage.vue'
import { useAuth } from '../composables/useAuth'

const { checkAuth } = useAuth()
const isLoggedIn = ref(false)

onMounted(() => {
    checkAuth()
})

const handleLoginSuccess = (isAuthenticated:boolean) => {
    isLoggedIn.value = isAuthenticated
}
</script>