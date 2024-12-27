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

const isLoggedIn = ref(false)

const handleLoginSuccess = () => {
    isLoggedIn.value = true
}

const checkLoginStatus = () => {
    const token = localStorage.getItem('token')
    isLoggedIn.value = !!token
}

onMounted(() => {
    checkLoginStatus()
})
</script>