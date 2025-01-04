<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <div class="logo"></div>
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <span>Toedoe</span>
                <strong>List</strong>
            </router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/tasks" class="nav-link">Tasks</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Summary</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a  
                            href="javascript:void(0)" 
                            class="btn btn-outline-secondary ms-2"
                            @click="logout"
                            >Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
const router = useRouter()
const auth = useAuth()
const logout = async () => {
    if( confirm('Are you sure you want to logout?')){
        await auth.logout()
        sessionStorage.clear()
        router.replace({ name: 'login' })
    }
}
</script>

<style scoped>
.logo {
    background-image: url('/favicon.ico');
    background-size: contain;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
}
</style>
