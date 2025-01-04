
<script setup>
import AppFooter from "@/components/AppFooter.vue";
</script>
<template>
    <Navbar v-if="!['login', 'register'].includes($route.name)" />
    <div class="main-container">
        <router-view></router-view>
    </div>
    <AppFooter />
</template>
<style scoped>
    .main-container {
        width: 100%;
        min-height: 100vh;
        background-image: url('./assets/images/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>




